const { Router } = require("express");
const {
  membershipFormGet,
  membershipFormPost,
} = require("../controllers/membershipController");
const { isAuth } = require("./authMiddleware");

const membershipRouter = Router();

membershipRouter.get("/", isAuth, membershipFormGet);
membershipRouter.post("/", membershipFormPost);

module.exports = membershipRouter;
