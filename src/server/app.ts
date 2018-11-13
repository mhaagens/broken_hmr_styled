import express from "express";
import { createResponse, renderTemplate } from "@server/views/ssr";

const app = express();

app.get("/", async (req, res) => {
  const html = await createResponse(req, res);
  res.send(html);
});

export default app;
