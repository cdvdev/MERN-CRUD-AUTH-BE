import { config } from "dotenv";


export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        console.log("error de schema");
        // console.log(error);
        // console.log("error.errors");
        // console.log(error.errors);
        // console.log("maps errors");
        console.log(error.errors.map(err => err.message));
        return res.status(400).json(
            error.errors.map(err => err.message)
        )
    }
};