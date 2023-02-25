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
app.use("/api/data", require("./routes/data"));
app.use("/api", require("./routes/collection"));
app.use(`/api/item`, require("./routes/item"));
app.use(`/api`, require("./routes/under"));
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/email", require("./routes/email"));
app.use("/api/basket", require("./routes/basket"));
app.use("/api/size", require("./routes/size"));
app.use("/api/wishlist", require("./routes/wishlist"));
app.use("/api/checkout", require("./routes/checkout"));
app.use("/api/payment_confirmation", require("./routes/confirmation"));

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
