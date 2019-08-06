const config = require('../config/config');
const { apiLimiter } = require('../server/apiLimiter');
const indexRouter = require('../restapi/routes/index');

module.exports = function(app) {
  //app.use(config.app.mainRoute + '/', apiLimiter);
  app.use('/', indexRouter);
};
