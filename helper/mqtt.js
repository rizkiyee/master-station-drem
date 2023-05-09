const mqtt = require('mqtt');
const ruleConnect = require('../src/controller/rule.controller');
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

// const ruleController = require('../src/controller/rule.controller');
// const ruleConnect = require('../src/controller/rule.controller');

// let topic;
// let rule;
// client.on('connect', () => {
//     ruleModel.get().then(result => {
//         console.log('Connected')
//         // console.log(result);
//         result.forEach(value => {
//             topic = value.t_dev_topic;
//             console.log(topic);
//             rule = value.t_dev_name + ' ' + value.t_dev_value + ' ' + value.s_dev_name + ' ' + value.s_dev_value;
//             client.subscribe(topic, () => {
//                 // console.log(`Subscribe to topic '${topic}'`);
//             })
//             client.publish(topic, 'rule: ' + rule, { qos: 0, retain: false }, (error) => {
//                 if (error) {
//                     console.error(error)
//                 }
//             })
//         })
//         client.on('message', (topic, payload) => {
//             console.log('Received Message:', topic, payload.toString())
//         })
//     })
// })

let triggerRule;
let serviceRule;
client.on('connect', () => {
    ruleModel.get().then(result => {
        console.log('Connected')
        // console.log(result);
        result.forEach(value => {
            // console.log(topic);
            triggerRule = 'trigger_id: ' + value.trigger_id + ' trigger_val : ' + value.trigger_val;
            serviceRule = 'service_id: ' + value.service_id + ' service_val : ' + value.service_val;
            rule = `{}`
            client.subscribe('trigger', () => {
                // console.log(`Subscribe to topic '${topic}'`);
            })
            client.subscribe('service', () => {

            })
            client.subscribe('rule', () => {

            })
            client.publish('trigger', 'rule: ' + triggerRule, { qos: 0, retain: false }, (error) => {
                if (error) {
                    console.error(error);
                }
            })
            client.publish('service', 'rule: ' + serviceRule, { qos: 0, retain: false }, (error) => {
                if (error) {
                    console.log(error);
                }
            })
            client.publish('rule', '')
        })
        client.on('message', (topic, payload) => {
            console.log('Received Message:', payload.toString())
        })
    })
})