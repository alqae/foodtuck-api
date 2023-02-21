import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"
import { ObjectType, Field, Int } from "type-graphql"

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
}
