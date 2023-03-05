import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, BeforeInsert } from "typeorm"
import { ObjectType, Field, Int } from "type-graphql"
import { Product } from "./Product"
import { genSalt, hash } from "bcryptjs"

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column("text")
  firstName: string

  @Field()
  @Column("text")
  lastName: string

  @Field()
  @Column("text", { unique: true })
  email: string

  @Field()
  @Column("boolean", { default: false })
  isActive: boolean

  @Column("text")
  password: string

  @Column("int", { default: 0 })
  tokenVersion: number

  @OneToMany(() => Product, (product) => product.user)
  products: Product[]

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await genSalt()
    this.password = await hash(password || this.password, salt)
  }
}
