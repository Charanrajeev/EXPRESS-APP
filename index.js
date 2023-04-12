const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv").config();
app.use(cors({origin:"*"}))
connectDb();
app.use(express.json())
app.use("/api/contacts",require("./routes/contactRoutes"))
app.use("/api/users",require("./routes/userRoutes"))
app.use(errorHandler)

const port = process.env.PORT;
app.listen(port,()=>{
console.log(`Server is running on port ${port}`);
})