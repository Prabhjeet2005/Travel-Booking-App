const express = require("express");
const router = express.Router();
const { semanticSearch } = require("../controllers/ai.controller");

router.post("/search", semanticSearch);

module.exports = router;
