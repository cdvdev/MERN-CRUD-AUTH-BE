import app from "./app.js";
import { connectDB } from "./db.js";
import { config } from "./config.js";

const PORT = config.PORT
connectDB();
app.listen(PORT); 
console.log("Server running on PORT", PORT);