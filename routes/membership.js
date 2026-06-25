const { Router } = require("express");
const {
  membershipFormGet,
  membershipFormPost,
} = require("../controllers/membershipController");

const membershipRouter = Router();

membershipRouter.get("/", membershipFormGet);
membershipRouter.post("/", membershipFormPost);

module.exports = membershipRouter;
