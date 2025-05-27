import Product from "../models/product.js";

export async function getAllProducts(req, res) {
   const { featured, name, company, sort, field, numericFilters } = req.query;
   const queryObj = {};

   if (name) {
      queryObj.name = { $regex: name, $options: "i" };
   }
   if (featured) {
      queryObj.featured = featured == "true" ? true : false;
   }
   if (company) {
      queryObj.company = company;
   }
   if (numericFilters) {
      const operatorMap = {
         ">": "$gt",
         ">=": "$gte",
         "=": "$eq",
         "<": "$lt",
         "<=": "$lte",
      };
      const regEx = /\b(<|>|>=|=|<|<=)\b/g;
      let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);
      const options = ["price", "rating"];
      filters = filters.split(",").forEach((item) => {
         const [field, operator, value] = item.split("-");
         if (options.includes(field)) {
            queryObj[field] = { [operator]: Number(value) };
         }
      });
   }

   let result = Product.find(queryObj);

   if (sort) {
      const sortList = sort.split(",").join(" ");
      result = result.sort(sortList);
   } else {
      result = result.sort("createdAt");
   }

   if (field) {
      const fieldList = field.split(",").join(" ");
      result = result.select(fieldList);
      console.log(fieldList);
   }
   const page = Number(req.query.page) || 1;
   const limit = Number(req.query.limit) || 10;

   const skip = (page - 1) * limit;
   result = result.skip(skip).limit(limit);

   const products = await result;
   res.status(200).json({ nbHits: products.length, products });
}

export async function getAllProductsStatic(req, res) {
   const products = await Product.find({}).sort("name price");
   res.status(200).json({ nbHits: products.length, products });
}
