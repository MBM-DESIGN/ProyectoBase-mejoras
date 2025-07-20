import { useState, useEffect, useContext } from 'react';
import { Layout } from "../components/Layout";
import { createProduct, getAllProducts, searchProductsByName } from '../services/products';
import { AuthContext } from '../context/AuthContext';

export const Dashboard = () => {
  const { user } = useContext(AuthContext);
  //Las pestañas(tabs) en un dashboard son herramientas de navegación que organizan y segmentan la información.
  //Estados para el tab activo.Un tab activo es la pestaña que está seleccionada en un momento dado, mostrando su contenido al usuario.
  const [activeTab, setActiveTab] = useState('view');
  
  //Estados para crear productos.
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("sin categoria");
  const [createError, setCreateError] = useState(null);
  const [createMessage, setCreateMessage] = useState(null);
  
  //Estados para visualizar productos.
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [viewError, setViewError] = useState(null);

  //Función para crear productos.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreateError(null);
    setCreateMessage(null);
    
    if (!name || !price || category === "sin categoria") {
      setCreateError("Debes seleccionar valores válidos.");
      return;
    }
    
    try {
      const response = await createProduct({ name, price, category });
      if (!response.ok) {
        setCreateError("Error al almacenar el producto.");
        return;
      }
      
      const serverRes = await response.json();
      setName("");
      setPrice(0);
      setCategory("sin categoria");
      setCreateMessage("Producto agregado con éxito ID: " + serverRes.data._id);
      
      //Refrescar la lista de productos si estamos en el tab de visualización.
      if (activeTab === 'view') {
        fetchProducts();
      }
    } catch (error) {
      console.log(error);
      setCreateError(error.message);
    }
  };

  //Función para obtener productos.
  const fetchProducts = async () => {
    if (!user?.token) {
      setLoading(false);
      setViewError("Necesitas iniciar sesión para ver los productos.");
      setProducts([]);
      return;
    }

    try {
      setLoading(true);
      setViewError(null);
      let productsData;
      
      if (searchTerm.trim() === '') {
        productsData = await getAllProducts(user.token);
      } else {
        productsData = await searchProductsByName(searchTerm, user.token);
      }
      
      setProducts(productsData);
    } catch (err) {
      setViewError(err.message || 'No se pudieron cargar los productos.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  //useEffect para búsqueda con debounce.Usamos un temporizador(debounce) para no llamar a la API en cada tecla presionada.
  useEffect(() => {
    if (activeTab === 'view') {
      const debounceTimer = setTimeout(() => {
        fetchProducts();
      }, 500);
      
      return () => clearTimeout(debounceTimer);
    }
  }, [searchTerm, user, activeTab]);

  //Cambiar entre tabs y limpiar mensajes.
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCreateError(null);
    setCreateMessage(null);
    setViewError(null);
  };

  return (
    <Layout>
      <div className="container mx-auto mt-10 p-4">
        <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
        
        {/*NAVEGACIÓN POR TABS*/}
        <div className="mb-6">
          <nav className="flex space-x-4">
            <button
              onClick={() => handleTabChange('view')}
              className={`px-4 py-2 font-medium rounded-md ${
                activeTab === 'view'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Ver Productos
            </button>
            <button
              onClick={() => handleTabChange('create')}
              className={`px-4 py-2 font-medium rounded-md ${
                activeTab === 'create'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Crear Producto
            </button>
          </nav>
        </div>

        {/*TAB PARA VER PRODUCTOS*/}
        {activeTab === 'view' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Lista de Productos</h2>
            
            {/* INPUT DE BÚSQUEDA */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Buscar productos por nombre..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={!user}
              />
            </div>

            {/*RENDERIZADO CONDICIONAL DE RESULTADOS*/}
            {loading && <p className="text-center">Cargando...</p>}
            {viewError && <p className="text-center text-red-500">{viewError}</p>}
            {!loading && !viewError && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length > 0 ? (
                  products.map((product) => (
                    <div key={product._id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                      <h3 className="text-xl font-semibold">{product.name}</h3>
                      <p className="text-gray-600 capitalize">{product.category}</p>
                      <p className="text-lg font-bold mt-2">${product.price}</p>
                    </div>
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-500">
                    {searchTerm ? 'No se encontraron productos con ese nombre.' : 'Aún no hay productos para mostrar.'}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/*TAB PARA CREAR PRODUCTOS*/}
        {activeTab === 'create' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Crear Nuevo Producto</h2>
            
            <form onSubmit={handleSubmit} className="max-w-md space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del producto:
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Precio del producto:
                </label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Selecciona una categoría de producto:
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="sin categoria">Sin categoría</option>
                  <option value="almacen">Almacén</option>
                  <option value="limpieza">Limpieza</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Agregar producto
              </button>

              {createError && (
                <p className="text-red-500 text-sm mt-2">{createError}</p>
              )}
              {createMessage && (
                <p className="text-green-500 text-sm mt-2">{createMessage}</p>
              )}
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
};