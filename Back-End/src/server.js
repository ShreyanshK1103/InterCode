import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";

const app = express();

const __dirname = path.resolve();

app.get("/health", (req, res) => {
    res.status(200).json({
        msg: "API is up and Running"
    })
})
app.get("/books", (req, res) => {
    res.status(200).json({
        msg: "This is the books end point"
    })
})

//Make tbe APP ready for Deployment
if(ENV.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "../Front-End/dist")));

    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../Front-End", "dist", "index.html"));
    })
}


app.listen(ENV.PORT, () => console.log(`Server is running on port ${ENV.PORT}`));