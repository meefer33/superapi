import express, { Router, Request, Response } from 'express'
import cors from 'cors'
import supertokens from 'supertokens-node'
import { verifySession } from 'supertokens-node/recipe/session/framework/express'
import {
  middleware,
  errorHandler,
  SessionRequest,
  wrapResponse,
} from 'supertokens-node/framework/express'
import { SuperTokensConfig } from './config'
import roles from './roles'
import Session from 'supertokens-node/recipe/session'
import { getUserById } from "supertokens-node/recipe/emailpassword";

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'db',
    port : 5432,
    user : 'superadmin',
    password : 'Meefer24133',
    database : 'shopapp'
  }
});

supertokens.init(SuperTokensConfig)

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(
  cors({
    origin: 'http://localhost:5174',
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials: true,
  }),
)

// This exposes all the APIs from SuperTokens to the client.
app.use(middleware())

app.get('/ping', async (req, res) => {
  res.send(true)
})

app.get('/logout', verifySession(), async (req: SessionRequest, res) => {
  let session = req.session
  await Session.revokeSession(session!.getHandle())
  res.send()
})

// An example API that requires session verification
app.get('/sessioninfo', verifySession(), async (req: SessionRequest, res: Response) => {
  let session = req.session
  let userId = session!.getUserId()
  let userInfo = await getUserById(userId);
  //let userInfo = await Session.getSessionInformation(session!.getHandle())
  res.send({
    user: userInfo,
    sessionHandle: session!.getHandle(),
    userId: session!.getUserId(),
    accessTokenPayload: session!.getAccessTokenPayload(),
  })
})

app.get('/updateUser', verifySession(), async (req: SessionRequest, res) => {
  let userId = req.session!.getUserId()
  let userInfo = await getUserById(userId);
  const user = {
    userId: userId,
    email: userInfo!.email,
  }
  res.send({user:"you"})
})

app.use(roles)

app.all('*', function (req, res) {
  res.status(404).send({ status: 'not found', message: 'route not found' })
})

// In case of session related errors, this error handler
// returns 401 to the client.
app.use(errorHandler())

app.use((error: any, req: any, res: any, next: any) => {
  console.log(error.stack)
  res.status(400).send({ status: '400', error: error.message })
})

app.listen(3001, () => console.log(`API Server listening on port 3001`))
