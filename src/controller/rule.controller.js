const ruleModel = require("../model/rule.model");
const mqtt = require('mqtt');
// const ruleController = require('../src/controller/rule.controller');
// // const ruleModel = require('../src/model/rule.model');

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

const ruleController = {
    get: (req, res) => {
        return ruleModel
            .get(req.query)
            .then((result) => {
                return res.status(200).send({ message: "success", data: result, status: 200 });
            })
            .catch((error) => {
                return res.status(500).send({ message: error });
            });
    },
    cekTrigger: (req, res) => {
        console.log(req.params);
        return ruleModel
            .cekTrigger(req.body.trigger_id, req.body.trigger_val)
            .then((result) => {
                if (result != null) {
                    //gaperlu client on
                    let serviceRule = 'service_id: ' + result.service_id + ' service_val : ' + result.service_val;
                    client.subscribe('service', () => {

                    })
                    console.log(result);
                    client.publish('service', 'service: ' + serviceRule, { qos: 0, retain: false }, (error) => {
                        if (error) {
                            console.log(error);
                        }
                    })
                    client.on('message', (topic, payload) => {
                        console.log('Received Message:', payload.toString())
                    })

                    res.status(200).send({ message: "success", data: result });
                } else {
                    return res.status(400).send({ message: "error" });
                }
            })
            .catch((error) => {
                return res.status(500).send({ message: error });
            });
    },
    getDetail: (req, res) => {
        return ruleModel
            .getDetail(req.params.id)
            .then((result) => {
                if (result != null) {
                    return res.status(200).send({ message: "success", data: result });
                } else {
                    return res.status(400).send({ message: "error" });
                }
            })
            .catch((error) => {
                return res.status(500).send({ message: error });
            });
    },
    add: (req, res) => {
        console.log(req.body);
        if (
            req.body.id
            // req.body.t_dev_id &&
            // req.body.t_dev_name &&
            // req.body.t_dev_value &&
            // req.body.t_dev_topic &&
            // req.body.t_dev_mac &&
            // req.body.s_dev_id &&
            // req.body.s_dev_name &&
            // req.body.s_dev_value &&
            // req.body.s_dev_mac &&
            // req.body.rule_topic
            // req.body.title
        ) {
            const request = {
                ...req.body,
                // file: req.files, //uncomment if multiple
                // img: req.file.filename, //uncomment if single
                //depend on product.route, formUpload.single or formUpload.array
            };
            //  console.log(req.files) //multiple
            //  console.log(req.file) //(single)
            //  console.log(req.body);
            return ruleModel
                .add(request)
                .then((result) => {
                    return res.status(201).send({ message: "succes", data: result });
                })
                .catch((error) => {
                    return res.status(500).send({ message: error });
                });
        } else {
            return res.status(400).send({ message: "Field cannot be empty!" });
        }
    },
    update: (req, res) => {
        const request = {
            ...req.body,
            id: req.params.id,
        };
        return ruleModel
            .update(request)
            .then((result) => {
                if (result != null) {
                    return res.status(200).send({ message: "success", data: result });
                } else {
                    return res.status(404).send({ message: "not found" });
                }
            })
            .catch((error) => {
                return res.status(500).send({ message: error });
            });
    },
    remove: (req, res) => {
        // console.log(req.params.id);
        return ruleModel
            .remove(req.params.id)
            .then((result) => {
                return res.status(200).send({ message: "success", data: result });
            })
            .catch((error) => {
                return res.status(500).send({ message: error });
            });
    },
}

module.exports = ruleController;