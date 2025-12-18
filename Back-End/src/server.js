import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import { start } from "repl";
import { serve } from "inngest/express";

const app = express();

const __dirname = path.resolve();

//middleware

app.use(express.json())
//credentials true means => server allows a browser to include cookies on request
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));

app.use("/api/inngest", serve({client:inngest, functions }));

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
if (ENV.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "../Front-End/dist")));

    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../Front-End", "dist", "index.html"));
    })
}


const startServer = async () => {
    try {
        await connectDB();
        app.listen(ENV.PORT, () => {
            console.log(`Server is running on port ${ENV.PORT}`);
        });
    } catch (err) {
        console.error("Error Starting the server");
    }
}

startServer();