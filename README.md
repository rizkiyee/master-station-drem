# index.js
Data yang disubscribe dari MQTT pertama-tama masuk di index.js dan masuk ke dalam fungsi mqtt:
```javascript
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
```
Pada line ini, data yang telah diterima dari MQTT diteruskan ke api cekTrigger dengan bentuk JSON agar data diproses
```javascript
ruleController.cekTrigger({ body: requestData }
```

# mqtt.js 
File ini berfungsi untuk mempublish semua rule yang ada didalam database ke MQTT menggunakan loop
```javascript
 result.forEach(value => {
            rule = `{"trigger_id" : "${value.trigger_id}", "trigger_val" : "${value.trigger_val}", "service_id" : "${value.service_id}", "service_val" : "${value.service_val}"}`;
            client.publish('rule', rule, { qos: 0, retain: false }, (error) => {
                if (error) {
                    console.log(error);
                }
            })
        })
```
