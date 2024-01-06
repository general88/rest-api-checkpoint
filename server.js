const express = require("express");
const { connectDB } = require("./config/dbConnect");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const userRoute = require("./route/userRoute");
//external middlewares
const morgan = require("morgan");

//routes imports

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());


app.use("/api/v1", userRoute)





const startApp = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server starting on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startApp();
