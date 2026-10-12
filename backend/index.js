import express from "express";
import { products } from "./data/products.js";

const app = express();
app.disable("x-powered-by");
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.get("/api/products", (_req, res) => res.json({ products, total: products.length }));
app.use((_req, res) => res.status(404).json({ message: "Không tìm thấy endpoint." }));

// server.js khởi động ứng dụng ở local và trên Render/Railway.
export default app;
