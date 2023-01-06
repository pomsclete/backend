const express = require('express');

const userRoutes = require("./routes/user");

const saucesRoutes = require("./routes/sauces");

const path = require("path");

let  app = express();

// const mongoDb = require("./dbconfig");
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

mongoose
  .connect(
    "mongodb+srv://pomsclete:YFFzBj4bBwLXwUe7@cluster0.vpcj0.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  // mongoDb();
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });

  app.use(express.json())
  app.use(express.urlencoded({ extended: true}));
  
  app.post('/test-url', (req, res) => {
      console.log(req.body)
      return res.send("went well")
  })
app.use("/api/auth", userRoutes);
app.use("/api/sauces", saucesRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
