const express = require("express");
const router = express.Router();

const {
  getAllCountries,
  getStates,
  getCities,
} = require("../controller/location");

router.get("/countries", getAllCountries);
router.get("/countries/:id", getStates);
router.get("/countries/state/:id", getCities);

module.exports = router;
