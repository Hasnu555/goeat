const express = require("express");
const mongoDB = require("./db")
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));

mongoDB();
const port = 5000;

app.use(express.json());
app.use("/user", require("./routes/userRoutes"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
