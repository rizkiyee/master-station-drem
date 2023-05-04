const express = require("express"); //import
const router = express();

//import route
const testRoute = require("./test.route");
const ruleRoute = require("./rule.route");
//end import route

router.get("/", (req, res) => {
  return res.send("a");
});

router.use("/test", testRoute);
router.use("/rule", ruleRoute);
// router.use('/userss', usersRoute)

module.exports = router; //export, biar bisa diakses oleh file lain melalui require