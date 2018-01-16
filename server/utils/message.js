var moment = require('moment');

var generateMessage = (from, text) => {
  return {
    from,
    text,
    timestamp:moment().valueOf()
  };
};

module.exports = {generateMessage};
