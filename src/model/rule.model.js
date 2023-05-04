const db = require("../../helper/connection");

const ruleModel = {
    get: function (queryParams) {
        console.log(queryParams);
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT id, t_dev_topic, t_dev_name, t_dev_value, s_dev_name, s_dev_value FROM rule`,
                (err, result) => {
                    if (err) {
                        return reject(err.message);
                    } else {
                        return resolve(result.rows);
                    }
                }
            );
        });
    },
    getDetail: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * from rule WHERE id='${id}'`, (err, result) => {
                if (err) {
                    return reject(err.message);
                } else {
                    return resolve(result.rows[0]);
                }
            });
        });
    },
    add: ({ id, t_dev_id, t_dev_name, t_dev_value, t_dev_mac, s_dev_id, s_dev_name, s_dev_mac, rule_topic }) => {
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO rule (id, t_dev_id, t_dev_name, t_dev_value, t_dev_mac, s_dev_id, s_dev_name, s_dev_mac, rule_topic) VALUES ('${id}','${t_dev_id}','${t_dev_name}', '${t_dev_value}', '${t_dev_mac}', '${s_dev_id}', '${s_dev_name}', '${s_dev_mac}', '${rule_topic}') RETURNING id`,
                (err, result) => {
                    if (err) {
                        return reject(err.message);
                    } else {
                        return resolve({ id, t_dev_id, t_dev_name, t_dev_value, t_dev_mac, s_dev_id, s_dev_name, s_dev_mac, rule_topic });
                    }
                }
            );
        });
    },
    update: ({ id, t_dev_id, t_dev_name, t_dev_value, t_dev_mac, s_dev_id, s_dev_name, s_dev_mac, rule_topic }) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM rule WHERE id='${id}'`, (err, result) => {
                if (err) {
                    return reject(err.message);
                } else {
                    db.query(
                        `UPDATE rule SET t_dev_id='${t_dev_id || result.rows[0].t_dev_id}', t_dev_name='${t_dev_name || result.rows[0].t_dev_name
                        }', t_dev_value='${t_dev_value || result.rows[0].t_dev_value}, t_dev_mac='${t_dev_mac || result.rows[0].t_dev_mac
                        }, s_dev_id='${s_dev_id || result.rows[0].s_dev_id}', s_dev_name='${s_dev_name || result.rows[0].s_dev_name
                        }, s_dev_mac='${s_dev_mac || result.rows[0].s_dev_mac}, rule_topic='${rule_topic || result.rows[0].rule_topic}`,
                        (err, result) => {
                            if (err) {
                                return reject(err.message);
                            } else {
                                return resolve({ id, t_dev_id, t_dev_name, t_dev_value, t_dev_mac, s_dev_id, s_dev_name, s_dev_mac, rule_topic });
                            }
                        }
                    );
                }
            });
        });
    },
    remove: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM rule WHERE id='${id}'`, (err, result) => {
                if (err) {
                    return reject(err.message);
                } else {
                    return resolve("success delete");
                }
            });
        });
    }
}

module.exports = ruleModel;