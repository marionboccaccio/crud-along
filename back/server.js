require("dotenv").config();
require("./config/dbConfig");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors("*"));

app.use("/album", require("./routes/album"));
app.use("/artist", require("./routes/artist"));

app.listen(process.env.PORT, () => {
  console.log("Server listening on port http://localhost:", process.env.PORT);
});
