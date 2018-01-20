var moment = require('moment');


var createMessage = (from, text) => {
    return {
        from,
        text,
        timestamp:moment().valueOf()
    };
};

module.exports = {createMessage};