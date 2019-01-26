const router = require("express").Router();
const auth = require("../controllers/auth");
const apiCabinet = require("../controllers/cabinet");

router.route("/login").post(auth.login);
router.route("/registration").post(auth.registration);
router.route("/cabinet/create_group").post(apiCabinet.create_group);
router.route("/cabinet/get_groups").get(apiCabinet.get_all_groups);
router.route("/cabinet/addUser").post(apiCabinet.addUser);
router.route("/cabinet/remove_group").post(apiCabinet.removeGroup);


exports.routerApi = router;



