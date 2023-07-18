const db = require("../../helper/connection");

const ruleModel = {
    get: function (queryParams) {
        // console.log(queryParams);
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT id, trigger_id, trigger_val, service_id, service_val FROM rule`,
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
    cekTrigger: (trigger_id, trigger_val) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT service_id, service_val from rule WHERE trigger_id=
            '${trigger_id}' and trigger_val='${trigger_val}'`, (err, result) => {
                if (err) {
                    return reject(err.message);
                } else {
                    return resolve(result.rows[0]);
                }
            });
        });
    },
    // cekTrigger: (id) => {
    //     return new Promise((resolve, reject) => {
    //         db.query(`SELECT trigger_id, trigger_val, service_id, service_val from rule WHERE id=
    //         '${id}'`, (err, result) => {
    //             if (err) {
    //                 return reject(err.message);
    //             } else {
    //                 return resolve(result.rows[0]);
    //             }
    //         });
    //     });
    // },
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
    add: ({ id, trigger_id, trigger_val, service_id, service_val }) => {
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO rule (id,trigger_id, trigger_val, service_id, service_val) VALUES ('${id}','${t_dev_id}','${t_dev_name}', '${t_dev_value}', '${t_dev_mac}', '${s_dev_id}', '${s_dev_name}', '${s_dev_mac}', '${rule_topic}') RETURNING id`,
                (err, result) => {
                    if (err) {
                        return reject(err.message);
                    } else {
                        return resolve({ id, trigger_id, trigger_val, service_id, service_val });
                    }
                }
            );
        });
    },
    update: ({ id, trigger_id, trigger_val, service_id, service_val }) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM rule WHERE id='${id}'`, (err, result) => {
                if (err) {
                    return reject(err.message);
                } else {
                    db.query(
                        `UPDATE rule SET trigger_id='${trigger_id || result.rows[0].trigger_id}', trigger_val='${trigger_val || result.rows[0].trigger_val
                        }', service_id='${service_id || result.rows[0].service_id}, service_val='${service_val || result.rows[0].service_val
                        }`,
                        (err, result) => {
                            if (err) {
                                return reject(err.message);
                            } else {
                                return resolve({ trigger_id, trigger_val, service_id, service_val });
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