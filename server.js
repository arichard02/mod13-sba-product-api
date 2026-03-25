import "dotenv/config";
import express from "express";
import connectDB from "./config/connection.js"
import productRoutes from "./routes/productRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

// root route
app.get("/", (req, res) => {
    res.send("App is running");
});

// product route
app.use("/api/product", productRoutes);

// connect to MongoDB and start server
 async function start() {
    try {
        await connectDB();
        console.log("MongoDB connected");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Database connection failed;", error.message);
    }
}

start()