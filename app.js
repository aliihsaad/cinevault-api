try {
  process.loadEnvFile();
} catch (error) {
  console.warn(".env file not found, using default values.");
}

const jsonServer = require("json-server");
const morgan = require("morgan");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const PORT = process.env.PORT || 5005;

server.use(middlewares);
server.use(morgan("dev"));

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

server.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "cinevault-api",
  });
});

server.use(router);

server.listen(PORT, "0.0.0.0", () => {
  console.log(`JSON Server is running at port ${PORT}`);
});