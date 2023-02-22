import express, { Router, Request, Response } from "express";
import cors from "cors";
import supertokens from "supertokens-node";
import { middleware, errorHandler } from "supertokens-node/framework/express";
import { SuperTokensConfig } from "./config";
import dotenv from "dotenv";
import roles from "./roles";
import user from "./user";
import db from "./db/knexfile";

dotenv.config();

supertokens.init(SuperTokensConfig);
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: process.env.ST_WEBSITE_DOMAIN,
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);

app.use(middleware());

app.get("/ping", async (req, res) => {
  //await db.migrate.up();
  res.send(true);
});


app.use(roles);
app.use(user);

app.all("*", function (req, res) {
  res.status(404).send({ status: "not found", message: "route not found" });
});

// In case of session related errors, this error handler
// returns 401 to the client.
app.use(errorHandler());

app.use((error: any, req: any, res: any, next: any) => {
  console.log(error);
  res.status(400).send({ status: "400", error: error.message });
});

app.listen(3001, () => console.log(`API Server listening on port 3001`));
