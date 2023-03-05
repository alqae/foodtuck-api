import { Factory, Seeder } from "typeorm-seeding"
import { Connection } from "typeorm"

import { User, Product } from "../entity"

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, _connection: Connection): Promise<void> {
    const users = await factory(User)().createMany(15)

    await factory(Product)()
      .map(async (product) => {
        product.user = users[Math.floor(Math.random() * users.length)]
        return product
      })
      .createMany(100)
  }
}