import "dotenv/config"

export const config = {
    PORT: process.env.PORT || 8080,
    MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017/miDB",
    SECRET_KEY: process.env.SECRET_KEY,
}