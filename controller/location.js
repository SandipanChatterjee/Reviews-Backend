let csc = require("country-state-city").default;

exports.getAllCountries = async (req, res, next) => {
  const countries = csc.getAllCountries();
  res.status(200).json({
    success: true,
    data: countries,
  });
};

exports.getStates = async (req, res, next) => {
  const states = csc.getStatesOfCountry(req.params.id);
  res.status(200).json({
    success: true,
    data: states,
  });
};

exports.getCities = async (req, res, next) => {
  const cities = csc.getCitiesOfState(req.params.id);
  res.status(200).json({
    success: true,
    data: cities,
  });
};
