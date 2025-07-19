import { Router } from "express"
import { addNewProduct, getAllProducts, deleteProduct, updateProduct,searchProducts } from "../controllers/productController" //importamos la nueva función
import { protect } from "../middleware/auth";

//const productRouter = Router()
export const productRouter = Router();

// manejar las peticiones para los productos
productRouter.get("/", protect, getAllProducts)
productRouter.post("/", protect, addNewProduct)
productRouter.get("/search/:query", protect, searchProducts); //lo colocamos antes de la ruta /:id para evitar conflictos de especificidad
productRouter.patch("/:id", protect, updateProduct)
productRouter.delete("/:id", protect, deleteProduct)

//export { productRouter }