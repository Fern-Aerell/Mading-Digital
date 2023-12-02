const { socketNameSpace, httpServer, baseUrl, port, client_connection} = require("./core/server.js");
const { init, update } = require("./core/client.js");

setInterval(() => update(socketNameSpace), 5000);

socketNameSpace.on("connection", (socket) => {
  const socket_id = socket.id;
  console.log(`Client dengan socket.id ${socket_id} terhubung...`);
  client_connection.push(socket_id);
  init(socket);

  socket.on("disconnect", (reason) => {
    console.log(`Client dengan socket.id ${socket_id} disconnect karena ${reason}`);
    client_connection.splice(client_connection.findIndex((id) => id == socket_id), 1);
  });
});

httpServer.listen(port, () => {
  console.log(`Mading Digital berjalan pada ${baseUrl}:${port}`);
});