import express from "express";
import "dotenv/config";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";

import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);

connectToSocket(server);

app.set("port", process.env.PORT || 8000);

app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.get("/home", (req, res) => {
  res.json({ Hello: "world" });
});

app.use("/api/v1/users", userRoutes);

const start = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from .env");
    }

    const connectionDb = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB connected: ${connectionDb.connection.host}`);

    server.listen(app.get("port"), () => {
      console.log(`Listening on port: ${app.get("port")}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exitCode = 1;
  }
};

start();

/* import express from "express";
import "dotenv/config";
import { createServer } from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);

// http://localhost:8000/home
app.get("/home", (req, res) => {
  return res.json({ Hello: "world" });
});
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);
// app.use("/api/v2/users", newUserRoutes);

const start = async () => {
  const connectionDb = await mongoose.connect(process.env.MONGODB_URI);

  console.log(`MongoDB connected:: ${connectionDb.connection.host}`);

  server.listen(app.get("port"), () => {
    console.log(`Listening on port ${app.get("port")}`);
  });
};

start(); */

// https://cloud.mongodb.com/v2/6ad1f1024bfaf13b30cc0847#/explorer/6ad1f13d00abdb0e1e607177
