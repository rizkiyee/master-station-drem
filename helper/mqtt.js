const mqtt = require('mqtt');
const ruleController = require('../src/controller/rule.controller');
const ruleModel = require('../src/model/rule.model');

const host = 'test.mosquitto.org'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    // username: 'emqx',
    // password: 'public',
    reconnectPeriod: 1000,
})


let rule;

const getTime = () => {
    let date = new Date();
    let
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds(),
        milisecond = date.getMilliseconds();
    let timeString = hour + ':' + minute + ':' + second + ':' + milisecond + ' -->';
    return timeString;
}

let currentTime = getTime();
// console.log(getTimestampInSeconds());
client.on('connect', () => {
    ruleModel.get().then(result => {
        console.log('MQTT Connected')
        result.forEach(value => {
            rule = `{"trigger_id" : "${value.trigger_id}", "trigger_val" : "${value.trigger_val}", 
                    "service_id" : "${value.service_id}", "service_val" : "${value.service_val}"}`
            client.subscribe('rule', () => {

            })
            client.publish('rule', rule, { qos: 0, retain: false }, (error) => {
                if (error) {
                    console.log(error);
                }
            })
        })
        client.on('message', (topic, payload) => {
            console.log(currentTime, payload.toString())
        })
    })
})

module.exports = mqtt;