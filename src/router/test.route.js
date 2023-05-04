const express = require("express");
const router = express();

//import controller
const testController = require("../controller/test.controller");

router.get("/", testController.get);
router.post("/", testController.add);

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