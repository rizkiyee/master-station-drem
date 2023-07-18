const { urlencoded, json } = require("express");
const express = require("express");
const app = express();
const router = require("./src/router/index.route");
const cors = require("cors");
const port = 5000;
const bodyParser = require('body-parser');
const mqtt = require('mqtt');
const ruleController = require('./src/controller/rule.controller');
app.use(cors());
app.use(express.static("public"));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use("/api/v1/", router);
app.use(bodyParser.json());

app.get("*", (req, res) => {
  return res.send({
    status: 404,
    message: "not found",
  });
});

app.listen(port, (req, res) => {
  console.log(`backend successfully running on port ${port}`);
});


//defaultnya express js itu ga menerima semua jenis form.
// use() middleware urlencoded, json
//menerima application/x-www-form-urlencoded
//menerima json
const host = 'test.mosquitto.org'
const portMqtt = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const connectUrl = `mqtt://${host}:${portMqtt}`
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  // username: 'emqx',
  // password: 'public',
  reconnectPeriod: 1000,
})

client.on('connect', () => {
  console.log('Master Station Connected to MQTT broker');
  client.subscribe('trigger', () => {

  });
});

client.on('message', (topic, payload) => {
  if (topic === 'trigger') {
    const mqttMessage = payload.toString();
    console.log("Data yang diterima dari device trigger: ", mqttMessage);
    const requestData = JSON.parse(mqttMessage);
    ruleController.cekTrigger({ body: requestData }, {
      status: (statusCode) => {
        return {
          send: (response) => {
            // console.log('Response sent:', response);
          }
        };
      }
    });
  }
});