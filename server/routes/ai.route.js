const express = require("express");
const router = express.Router();
const { semanticSearch, createItinerary } = require("../controllers/ai.controller");

router.post("/search", semanticSearch);
router.post("/itinerary", createItinerary);

module.exports = router;
