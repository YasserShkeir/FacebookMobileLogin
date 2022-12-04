const express = require("express");
require("dotenv").config();
require("./config/db.config");
const app = express();
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

app.use(express.json());
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const authRoutes = require("./route/auth.routes");
app.use("/auth", authRoutes);

const userRoutes = require("./route/user.routes");
app.use("/user", userRoutes);

app.listen(process.env.PORT, (err) => {
  if (err) throw err;
  console.log(`Server is running in Port: ${process.env.PORT}`);
});
