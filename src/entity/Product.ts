import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm"
import { ObjectType, Field, Int } from "type-graphql"
import { User } from "./User"

@ObjectType()
@Entity("products")
export class Product extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column("text")
  name: string

  @Field()
  @Column("text")
  description: string

  @Field()
  @Column("text")
  price: string

  @Field()
  @Column("text")
  image: string

  // @Field()
  // @Column("array")
  // categories: string[]

  @Field()
  @Column("float")
  rating: number

  // @Field()
  // @Column("number")
  // reviews: number

  @Field()
  @Column("numeric")
  stock: number

  @Field()
  @Column("numeric")
  quantity: number

  @ManyToOne(() => User, (user) => user.products)
  user: User
}
