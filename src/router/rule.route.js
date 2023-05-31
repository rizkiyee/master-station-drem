const express = require("express");
const router = express();

//import controller
const ruleController = require("../controller/rule.controller");

router.get("/", ruleController.get);
router.get("/:id", ruleController.getDetail);
router.post("/cek", ruleController.cekTrigger);
router.post("/", ruleController.add);
router.patch("/", ruleController.update);
router.delete("/:id", ruleController.remove);


module.exports = router;