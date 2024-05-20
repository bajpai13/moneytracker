// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");


// require("dotenv").config();
// const Transaction = require("./models/transactions.js");
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/api/test", (req, res) => {
//   res.json({ body: "test ok33" });
// });

// app.post("/api/transaction", async (req, res) => {
//     await mongoose.connect(process.env.MONGO_URL);
//     const{name,description,datetime,price} = req.body;
//     const transaction = await Transaction.create({name,description,datetime,price});
//     res.json(transaction);
// });

// app.get("/api/transactions", async (req, res) => {
//     await mongoose.connect(process.env.MONGO_URL);
//     const transactions = await Transaction.find();
//     res.json(transactions);
// });

// app.listen(4040, () => {
//   console.log("Server is running on port 4040");
// });










const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const moment = require("moment"); // Import moment

require("dotenv").config();
const Transaction = require("./models/transactions.js");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ body: "test ok33" });
});

app.post("/api/transaction", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const { name, description, datetime, price } = req.body;
  const formattedDateTime = moment(datetime).toISOString(); // Ensure the datetime is in ISO format
  const transaction = await Transaction.create({
    name,
    description,
    datetime: formattedDateTime,
    price,
  });
  res.json(transaction);
});

app.get("/api/transactions", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const transactions = await Transaction.find();
  const formattedTransactions = transactions.map((transaction) => ({
    ...transaction._doc,
    datetime: moment(transaction.datetime).format("YYYY-MM-DD HH:mm:ss"), // Format datetime for display
  }));
  res.json(formattedTransactions);
});

app.listen(4040, () => {
  console.log("Server is running on port 4040");
});
