//import { useState } from "react"
import { useState, useEffect, useContext } from 'react';
import { Layout } from "../components/Layout"
//import { createProduct } from "../services/products"
import { createProduct, getAllProducts, searchProductsByName } from '../services/products'; //Importamos searchProductsByName
import { AuthContext } from '../context/AuthContext';

export const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); //Estado para el término de búsqueda
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let productsData;
        //Lógica de búsqueda
        if (searchTerm.trim() === '') {
          //Si la búsqueda está vacía, obtener todos los productos
          productsData = await getAllProducts(user.token);
        } else {
          //Si hay un término de búsqueda, llamar a la función de búsqueda
          productsData = await searchProductsByName(searchTerm, user.token);
        }
        setProducts(productsData);
        setError(null);
      } catch (err) {
        setError('No se pudieron cargar los productos.');
        setProducts([]); //Limpiar productos en caso de error
      } finally {
        setLoading(false);
      }
    };

    //Usamos un temporizador (debounce) para no llamar a la API en cada tecla presionada
    const delayDebounceFn = setTimeout(() => {
      if (user?.token) {
        fetchProducts();
      }
    }, 500); //Espera 500ms después de que el usuario deja de escribir

    //Limpiamos el temporizador
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, user]); //El useEffect se ejecuta cuando cambia `searchTerm` o `user`

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Panel de Productos</h1>
      
      {/* INPUT DE BÚSQUEDA */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar productos por nombre..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* RENDERIZADO CONDICIONAL DE RESULTADOS */}
      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="border p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p>{product.description}</p>
                <p className="text-lg font-bold mt-2">${product.price}</p>
              </div>
            ))
          ) : (
            <p>No se encontraron productos.</p>
          )}
        </div>
      )}
    </div>
  );
};
 
  
/*const Dashboard = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [category, setCategory] = useState("sin categoria")
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setMessage(null)

    if (!name || !price || category === "sin categoria") {
      setError("Debes seleccionar valores validos.")
      return
    }

    try {
      const response = await createProduct({ name, price, category })

      if (!response.ok) {
        setError("Error al almacenar el producto.")
        return
      }

      const serverRes = await response.json()

      setName("")
      setPrice(0)
      setCategory("sin categoria")
      setMessage("Producto agregado con éxito ID: " + serverRes.data._id)
    } catch (error) {
      console.log(error)
      setError(error.message)
    }
  }

  return (
    <Layout>
      <h1>Panel de administración</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre del producto:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="price">Precio del producto:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <label htmlFor="category">Selecciona una categoria de producto:</label>
        <select
          id="category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="sin categoria">Sin categoria</option>
          <option value="almacen">Almacen</option>
          <option value="limpieza">Limpieza</option>
        </select>
        <button>Agregar producto</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}
      </form>
    </Layout>
  )
}

export { Dashboard }*/