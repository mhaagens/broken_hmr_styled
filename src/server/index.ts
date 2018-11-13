import { createServer } from "http";
import app from "@server/app";

const server = createServer(app);
let current = app;

server.listen(3000, () => console.log("Server listening on port 3000"));

if (module.hot) {
  module.hot.accept(["./app"], () => {
    server.removeListener("request", current);
    server.on("request", app);
    current = app;
  });
}
