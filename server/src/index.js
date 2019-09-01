const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

mongoose.connect(
  "mongodb+srv://kenesu:0308jsjs@subtle-hmxr0.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

mongoose.connection.once("open", () => {
  console.log("conneted to database");
});

app.use(cors());

//This route will be used as an endpoint to interact with Graphql,
//All queries will go through this route.
app.use(
  "/graphql",
  graphqlHTTP({
    //directing express-graphql to use this schema to map out the graph
    schema,
    //directing express-graphql to use graphiql when goto '/graphql' address in the browser
    //which provides an interface to make GraphQl queries
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
