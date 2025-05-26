import Product from "../models/product.js";

export async function getAllProducts(req, res) {
   const { featured, name, company } = req.query;
   const queryObj = {};

   if (featured) {
      queryObj.featured = featured == "true" ? true : false;
   }
   if (name) {
      queryObj.name = name;
   }
   if (company) {
      queryObj.company = company;
   }

   console.log(queryObj);

   const products = await Product.find(queryObj);
   res.status(200).json({ nbHits: products.length, products });
}

export async function getAllProductsStatic(req, res) {
    const products = await Product.find({
        name:'accent chair'
    })
    res.status(200).json({nbHits: products.length, products})
}
