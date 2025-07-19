// averiguar como usar una variable de entorno en un proyecto de vite/react

// reemplazar por la variable de entorno con la misma data
//const BASE_API = "http://localhost:1234/api"

//Asumimos que la URL base se obtiene de las variables de entorno
const API_URL = `${import.meta.env.VITE_API_URL}/products`;

//FUNCIONES EXISTENTES
const getProducts = async () => {
  const response = await fetch(BASE_API + "/products")
  return response
}

const createProduct = async ({ name, price, category }) => {
  const response = await fetch(BASE_API + "/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price, category })
  })
  return response
}

const deleteProduct = async (id) => {
  const response = await fetch(`${BASE_API}/products/${id}`, {
    method: "DELETE"
  })
  return response
}

//NUEVA FUNCIÓN PARA BUSCAR PRODUCTOS
export const searchProductsByName = async (query, token) => {
  try {
    const response = await fetch(`${API_URL}/search/${query}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
        //Si la respuesta no es OK, maneja el error.
        //Si no se encuentran productos, el backend devuelve 404.
        if (response.status === 404) {
            return []; //Devuelve un array vacío para indicar que no hay resultados.
        }
        throw new Error('Error al buscar los productos');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error; //Propaga el error para que el componente pueda manejarlo.
  }
};

export { getProducts, createProduct, deleteProduct, searchProductsByName }