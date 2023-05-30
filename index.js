const { urlencoded, json } = require("express");
const express = require("express");
const app = express();
const router = require("./src/router/index.route");
const cors = require("cors");
const port = 5000;
app.use(cors());
app.use(express.static("public"));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use("/api/v1/", router);
// app.use(
//   cors({ 
//     origin: ["hinatazaka46.jp"],
//   })
// // );
// const ruleModel = require("../model/rule.model");
const mqtt = require('mqtt');
// const ruleController = require('../src/controller/rule.controller');
// // const ruleModel = require('../src/model/rule.model');

const host = 'test.mosquitto.org'
const port2 = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port2}`
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  // username: 'emqx',
  // password: 'public',
  reconnectPeriod: 1000,
})

app.get("*", (req, res) => {
  return res.send({
    status: 404,
    message: "not found",
  });
});

app.listen(port, (req, res) => {
  console.log(`backend successfully running on port ${port}`);
});

// Route to handle incoming data
app.post('/data', (req, res) => {
  const receivedData = req.body;
  console.log(receivedData);
  // Do something with the received data

  res.sendStatus(200);
});

//defaultnya express js itu ga menerima semua jenis form.
// use() middleware urlencoded, json
//menerima application/x-www-form-urlencoded
//menerima json