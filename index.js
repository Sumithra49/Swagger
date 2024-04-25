const express = require("express");
const { userRouter } = require("./routes/user.routes");
const { connection } = require("./config/db");
const cors = require("cors");
require("dotenv").config();
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
app.use(cors());
app.use(express.json());

const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Learning Swagger",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8080/",
      },
      {
        url: "http://www.example.com",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);
app.use("/apidocs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/users", userRouter);

const PORT = process.env.PORT || 3000; // Set a default port if PORT is not specified in .env

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
    console.log(`Server is running at port: ${PORT}`);
  } catch (err) {
    console.error("Error connecting to DB:", err);
  }
});
