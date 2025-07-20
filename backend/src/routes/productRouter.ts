import { Router } from "express"
import { addNewProduct, getAllProducts, deleteProduct, updateProduct, searchProducts } from "../controllers/productController" //importamos la nueva función
import { protect } from "../middleware/auth"

//const productRouter = Router()
const productRouter = Router();

// manejar las peticiones para los productos
productRouter.get("/", protect, getAllProducts);
productRouter.get("/search/:query", protect, searchProducts); //lo colocamos antes de la ruta /:id para evitar conflictos de especificidad
productRouter.post("/", protect, addNewProduct);
productRouter.patch("/:id", protect, updateProduct);
productRouter.delete("/:id", protect, deleteProduct);

export { productRouter }