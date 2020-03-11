let interactions = function(req, res, next) {
  console.log(`Method ${req.method} on route: ${req.originalUrl}`);
  //   console.log(req.body.name);
  console.log(req.body);

  next();
};

module.exports = interactions;
