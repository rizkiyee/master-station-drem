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
// router.put('/', testController.update)
// router.patch(
//   "/:id",
//   verifyToken,
//   formUpload.array("img"),
//   testController.update
// );
// router.delete("/:id", testController.remove);

// delete //remove

module.exports = router;