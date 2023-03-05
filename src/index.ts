import "dotenv/config"
import "reflect-metadata"
import cors from "cors"
import path from "path"
import morgan from "morgan"
import express from "express"
import bodyParser from "body-parser"
import { verify } from "jsonwebtoken"
import cookieParser from "cookie-parser"
import { buildSchema } from "type-graphql"
import hbs from "nodemailer-express-handlebars"
import { ApolloServer } from "apollo-server-express"

import { logger, createRefreshToken, sendRefreshToken, transporter } from "./utils"
import { ProductResolver, UserResolver } from "./resolvers"
import { morganMiddleware } from "./middlewares"
import { AppDataSource } from "./data-source"
import { JwtPayload } from "./MyContext"
import { User } from "./entity"

(async () => {
  const app = express()

  const hbsConfig = {
    viewEngine: {
      extName: '.hbs',
      partialsDir: path.join(process.cwd(), './views/'),
      layoutsDir: path.join(process.cwd(), '/views/'),
    },
    viewPath: path.join(process.cwd(), './views/'),
    extName: '.hbs',
  }

  transporter.use('compile', hbs(hbsConfig))
  app.use(express.static('public'))
  app.use(cors({
    origin: process.env.URL_SITE,
    credentials: true
  }))
  app.use(cookieParser())
  app.use(bodyParser.json());
  app.use(morgan(':graphql-query'))
  app.use(morganMiddleware)
  const PORT = process.env.PORT || 3000
  app.get('/', (_req, res) => res.send(":)"))
  app.post("/refresh", async (req, res) => {
    const token = req.cookies.jid
    if (!token) {
      return res.send({ ok: false, token: "" })
    }

    let payload: JwtPayload;

    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!) as JwtPayload
    } catch (error) {
      logger.error(error)
      return res.send({ ok: false, token: "" })
    }

    const user = await User.findOne({ where: { id: payload.userId } })

    if (!user || user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, token: "" })
    }

    sendRefreshToken(res, await createRefreshToken(user))

    return res.send({ ok: true, token: await createRefreshToken(user) })
  })

  await AppDataSource.initialize()

  const apolloServer = new ApolloServer({
    schema:  await buildSchema({
      resolvers: [UserResolver, ProductResolver]
    }),
    context: ({ req, res }) => ({ req, res })
  })

  await apolloServer.start()
  apolloServer.applyMiddleware({ app, cors: {
    origin: process.env.URL_SITE,
    credentials: true
  }})

  app.listen(PORT, () => logger.info("🐲 [Server] Initialized"))
})()
