import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'

import { Product, User } from '../entity'
import { MyContext } from '../MyContext'

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  search(
    @Arg('name', { nullable: true }) name?: string,
    @Arg('minPrice', { nullable: true }) minPrice?: number,
    @Arg('maxPrice', { nullable: true }) maxPrice?: number,
    // @Arg('items', () => [String]) items: String[]
    @Arg('tags', () => [String], { nullable: true }) tags?: String[],
    @Arg('categories', () => [String], { nullable: true }) categories?: String[],
  ) {
    console.warn('name', name);
    console.warn('minPrice', minPrice);
    console.warn('maxPrice', maxPrice);
    console.warn('tags', tags);
    console.warn('categories', categories);
    return Product.find()
  }

  @Query(() => Product)
  async product(@Arg('id') id: number) {
    const product = await Product.findOne({ where: { id } })

    if (!product) {
      throw new Error('Product not found')
    }

    return product
  }

  @Mutation(() => Product)
  async createProduct(
    @Arg('name') name: string,
    @Arg('description') description: string,
    @Arg('price') price: string,
    @Arg('image') image: string,
    @Arg('rating') rating: number,
    @Arg('stock') stock: number,
    @Arg('quantity') quantity: number,
    @Ctx() ctx: MyContext
  ) {
    const user = await User.findOne({ where: { id: ctx.payload.userId } })

    if (!user) {
      throw new Error('User not found')
    }

    return await Product.create({
      name,
      description,
      price,
      image,
      rating,
      stock,
      quantity,
      user
    }).save()
  }
}
