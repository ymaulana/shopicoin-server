var express = require("express");
var router = express.Router();
const {
  viewSignIn,
  actionSignIn,
  actionLogout,
  // viewEdit,
  // actionEdit,
  // actionDelete,
  // actionStatus,
} = require("./controller");

/* GET home page. */
router.get("/", viewSignIn);
router.post("/", actionSignIn);
router.get("/logout", actionLogout);
// router.get("/edit/:id", viewEdit);
// router.put("/edit/:id", actionEdit);
// router.delete("/delete/:id", actionDelete);
// router.put("/status/:id", actionStatus);

module.exports = router;
