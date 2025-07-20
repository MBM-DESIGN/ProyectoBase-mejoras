🛍️ Sistema de Gestión de Productos - Funcionalidad de Búsqueda.

📋 Descripción del Proyecto.

Sistema CRUD completo para la gestión de productos con autenticación de usuarios y categorías. Nueva funcionalidad agregada: búsqueda avanzada de productos por nombre con resultados en tiempo real, búsqueda parcial e insensible a mayúsculas/minúsculas.

🆕 Funcionalidad de Búsqueda Implementada.

Búsqueda en tiempo real con debounce de 500ms.
Búsqueda parcial e insensible a mayúsculas/minúsculas.
Visualización dinámica de resultados.
Integración seamless con el dashboard existente.
Manejo de errores y estados de carga.

🛠️ Tecnologías Utilizadas.

Backend:

Node.js - Entorno de ejecución.
Express.js - Framework web.
MongoDB - Base de datos NoSQL.
Mongoose - ODM para MongoDB.
bcryptjs - Encriptación de contraseñas.
jsonwebtoken - Autenticación JWT.
cors - Manejo de CORS.
dotenv - Variables de entorno.

Frontend:

React 18 - Biblioteca de interfaz de usuario.
React Router DOM - Enrutamiento.
Context API - Manejo de estado global.
Tailwind CSS - Framework de estilos.
Vite - Build tool y dev server.
Base de Datos
MongoDB Compass o  MongoDB Atlas - Base de datos en la nube.
Mongoose - Modelado de datos.

🚀 Instrucciones de Ejecución.

Prerequisitos:

Node.js v16 o superior.
npm o yarn.
MongoDB local o MongoDB Atlas account.
Git.

1. Clonar el repositorio:
git clone <url-del-repositorio>

2. Configurar el Backend.
   
🛠️ En la terminal:

#Navegar a la carpeta del backend: cd BACKEND

#Instalar las dependencias: npm install

#Crear un archivo .env a partir del ejemplo: cp .env.example .env

#Configurar las variables de entorno en el archivo: .env

#Iniciar el servidor en modo de desarrollo: npm run dev

#Pasar a modo de producción: npm run build

3. Configurar el Frontend.

🛠️ En la terminal:

#Navegar a la carpeta del frontend desde la raíz del proyecto: cd FRONTEND

#Instalar las dependencias: npm install

#Crear un archivo .env.local

#Crear un archivo .env.example

#Editar .env.local con la URL del backend para asegurarse que VITE_API_URL en .env.local apunta al puerto del backend.

#Iniciar la aplicación en modo desarrollo: npm run dev

#Construir para producción: npm run build

El frontend estará disponible en http://localhost:5173

💡 Ejemplos de Uso - Funcionalidades de búsqueda.

1. Búsqueda básica.

Campo de búsqueda: "leche"
Resultado: muestra todos los productos que contengan "leche" en su nombre.

2. Búsqueda parcial.

Campo de búsqueda: "jab"
Resultado: muestra todos los productos que contengan parcialmente "jab" en su nombre. Por ejemplo: “jabón”.

3. Búsqueda insensible a mayúsculas y a minúsculas.

Campo de búsqueda: "COCA" o "coca" o "Coca".
Resultado: muestra todos los productos que lo contengan sin importar si lo han escrito con mayúsculas o minúsculas.

4. Búsqueda sin resultados.

Campo de búsqueda: "producto inexistente".
Resultado: "No se encontraron productos con ese nombre".

5. Campo vacío.

Campo de búsqueda: "" (vacío).
Resultado: muestra todos los productos disponibles.


📱 Flujo de Usuario.

Acceder al Dashboard: usuario autenticado accede a /dashboard.

Seleccionar "Ver Productos": click en el tab de visualización.

Escribir en el campo de búsqueda: el sistema espera 500ms después del último carácter.

Ver resultados: se muestran en tarjetas con nombre, categoría y precio.

Búsqueda en tiempo real: los resultados se actualizan automáticamente.


🔧 Variables de Entorno.

Backend (.env.example)

#Puerto del servidor
PORT=

#Conexión a MongoDB
URI_DB=

#JWT Secret para autenticación
JWT_SECRET=

#Entorno de ejecución
NODE_ENV=development

#CORS Origins permitidos
CORS_ORIGIN=http://localhost:5173

Frontend (.env.example)

#URL base de API
VITE_API_URL=

#URL base de API para desarrollo
VITE_DEV_API_URL=

#URL base de API para producción
VITE_PROD_API_URL=

Características del Frontend.

Debounce de 500ms: evita múltiples requests innecesarios.

Estado de carga: muestra "Cargando..." durante la búsqueda.

Manejo de errores: notifica cuando hay problemas de conexión.

UX optimizada: deshabilita el input si no hay usuario autenticado.

🤝 Autora: MBM-DESIGN.
