import { faker } from '@faker-js/faker';
import { define } from "typeorm-seeding"

import { Product } from "../entity";

define(Product, () => {
  const product = new Product()
  product.name = faker.commerce.productName()
  product.description = faker.commerce.productDescription()
  product.price = faker.commerce.price()
  product.image = faker.image.imageUrl()
  // product.categories = Array.from({ length: 4 }).map(() => faker.commerce.department())
  product.rating = faker.datatype.float({ min: 1, max: 5, precision: 0.1 })
  product.stock = faker.datatype.number()
  product.quantity = faker.datatype.number()
  return product
})
