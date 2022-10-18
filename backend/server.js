require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 5000;
const contactRouter = require("./Routes/contactRoutes");
const userRouter = require("./Routes/userRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./db/db");

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/contacts", contactRouter);
app.use("/api/users", userRouter);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
