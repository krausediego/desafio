import server from "./app.js";

const port = 3333;

server.listen(port, () => {
  console.log(`⚡ App listen on port ${port}`);
});
