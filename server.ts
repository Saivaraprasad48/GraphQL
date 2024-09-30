import express, { Express } from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./graphql/schema";
import cors from "cors";

const app: Express = express(); 

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("server running on 4000");
});
