import { Request, Response } from "express"
import { Product } from "../models/productModel"
import { productModel } from "../models/productModel";

const getAllProducts = async (req: Request, res: Response): Promise<any> => {
  try {
    const products = await Product.find()
    res.json({
      success: true,
      message: "obteniendo los productos",
      data: products
    })
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

const addNewProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const body = req.body
    // VALIDACIONES DE INPUT - ZOD
    const newProduct = new Product(body)
    await newProduct.save()

    res.status(201).json({
      success: true,
      message: "producto creado con éxito",
      data: newProduct,
    })
  } catch (error) {
    const err = error as Error
    console.log(err)
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

const deleteProduct = async (req: Request, res: Response): Promise<any> => {
  const id = req.params.id
  try {
    const deletedProduct = await Product.findByIdAndDelete(id)
    if (!deletedProduct) return res.status(404).json({
      success: false,
      message: "producto no encontrado"
    })

    res.json({
      success: true,
      message: "producto borrado con éxito",
      data: deletedProduct
    })
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

const updateProduct = async (req: Request, res: Response): Promise<any> => {
  const id = req.params.id
  const body = req.body
  // VALIDACIONES DE INPUT - ZOD
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true })
    if (!updatedProduct) return res.status(404).json({
      success: false,
      message: "producto no encontrado"
    })
    res.json({
      success: true,
      message: "producto actualizado con éxito",
      data: updatedProduct
    })
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

//NUEVA FUNCIÓN PARA BUSCAR PRODUCTOS
export const searchProducts = async (req: Request, res: Response) => {
  try {
    const { query } = req.params;

    if (!query) {
      return res.status(400).json({
        message: "Se requiere un término de búsqueda.",
      });
    }

    const products = await productModel.find({
      name: { $regex: query, $options: "i" }, //Búsqueda parcial e insensible a mayúsculas/minúsculas
    });

    if (products.length === 0) {
      return res.status(404).json({
        message: "No se encontraron productos que coincidan con la búsqueda.",
      });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor al buscar productos.",
      error,
    });
  }
};

export { getAllProducts, addNewProduct, deleteProduct, updateProduct }