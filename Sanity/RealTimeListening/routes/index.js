const { createClient } = require("@sanity/client");
var express = require("express");
const axios = require("axios");

const EventSource = require("eventsource");
const { param } = require("./users");
var router = express.Router();
let text = "";
const url = "";
router.get("/listen", function (req, res, next) {
  console.log("listening streams ");
  const sseStream = "http://localhost:3000/sse"; // Replace with your SSE endpoint URL=
  axios({
    url: sseStream,
    method: "get",
    responseType: "stream",
    headers: {
      Accept: "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
    .then((response) => {
      const sseStream = response.data;
      sseStream.on("data", (data) => {
        const eventData = data.toString();
        const interval = setInterval(() => {
          res.write(`data: ${eventData}\n\n`);
          clearInterval(interval);
        }, 1000);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  req.on("close", (err) => {
    console.error("cloded");
    console.error(err);
    // Handle any necessary cleanup when the client disconnects
  });

  // sseStream.on("response", (response) => {
  //   // Set the appropriate headers on the Express response
  //   res.setHeader("Content-Type", "text/event-stream");
  //   res.setHeader("Cache-Control", "no-cache");
  //   res.setHeader("Connection", "keep-alive");
  //   res.setHeader("Access-Control-Allow-Origin", "*");
  //   console.log(res);
  //   // Pipe the SSE stream from the existing endpoint to the Express response
  //   response.pipe(res);
  // });

  // sseStream.on("error", (error) => {
  //   console.error("Error:", error);
  //   res.status(500).end();
  // });

  // res.send(`data from event ${text}`);
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/sse", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Send SSE events
  setInterval(() => {
    const eventData = "SSE Event Data"; // Replace with your event data
    res.write(`data: ${eventData + Math.random()}\n\n`);
  }, 1000);
});

const client = createClient({
  projectId: "",
  dataset: "",
  token: "",
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: "2023-05-03", // use current date (YYYY-MM-DD) to target the latest API version
  resultSourceMap: true,
});

router.get("/sanitytest", function (req, res, next) {
  try {
    const query = `*[_type == 'productHead' && _id== $id]{
      _id,
      internalName
    }`;
    const params = { id: "025a5011-d880-446b-a592-a1f6afb9113a" };

    const subscription = client.listen(query, params).subscribe((update) => {
      try {
        const comment = update.result;
        //console.log(update);
        const text = `Type: ${update?.type} \n Transition: ${update?.transition} \n ID: ${update?.documentId} \n`;
        console.info("New mutation coming");
        console.log(text);
        console.log(JSON.stringify(update?.mutations, null, 2));
        const interval = setInterval(() => {
          res.write(`data: ${comment}\n\n`);
          clearInterval(interval);
        }, 1000);
      } catch (error) {
        console.error(`Error happened: ${error}`);
      }
    });
  } catch (error) {
    console.error("error ", error);
  }
});

module.exports = router;
