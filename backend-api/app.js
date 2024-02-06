const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));

// read variables and save them as environment variables
dotenv.config({path: "./.env"});

// Init Middleware
app.use(express.json({extended: false}));

// data from req object is added to it(middleware)
app.use(express.json());

// Define Routes
app.use("/api/data", require("./src/routes/data"));
app.use(`/api/item`, require("./src/routes/item"));
app.use("/api/under", require("./src/routes/under"));
app.use("/api/users", require("./src/routes/users"));
app.use("/api/auth", require("./src/routes/auth"));
app.use("/api/email", require("./src/routes/email"));
app.use("/api/basket", require("./src/routes/basket"));
app.use("/api/size", require("./src/routes/size"));
app.use("/api/wishlist", require("./src/routes/wishlist"));
app.use("/api/checkout", require("./src/routes/checkout"));
app.use("/api/payment_confirmation", require("./src/routes/confirmation"));
app.use("/api", require("./src/routes/collection"));

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

console.log(process.env.MODE);

// Load React App in production

if (process.env.MODE === "production") {
  app.get("/*", (req, res) => res.sendFile(path.join(__dirname, "../client/build/index.html")));
}

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
