var express = require("express");
var router = express.Router();
var EventSource = require("eventsource");

function eventHandler(request, response, next) {
  const headers = {
    "Content-type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  let clients = [];
  let facts = [];

  response.writeHead(200, headers);
  const data = `data:${JSON.stringify(facts)}\n\n`;

  response.write(data);
  const clientId = Date.now();
  const newClient = {
    id: clientId,
    response,
  };
  clients.push(newClient);
  request.on("close", () => {
    console.log(`${clientfId} Connection closed`);
    clients = clients.filter((client) => client.id !== clientId);
  });
}

router.get("/events", eventHandler);

/* GET users listing. */
router.get("/", function (req, res, next) {
  let text = "";
  const url = "";
  const evtSource = new EventSource(url, {
    withCredentials: true,
  });
  evtSource.onmessage = (event) => {
    text = event.data;
    console.log("text : ", text);
  };
  res.send(`data from event ${text}`);
});

module.exports = router;
