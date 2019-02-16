/**
 * @providesModule AppConfig
 */
try {
  module.exports = require('../appconfig.js');
} catch (e) {
  module.exports = {
    WSOCKET: 'http://172.20.1.100:3030',
    GOOGLE_API_KEY: 'AIzaSyDuJ7e2ISzfl_Lp8A_ues6oa3gqulMsOo8'
  };
}
