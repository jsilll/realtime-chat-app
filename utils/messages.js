const moment = require("moment");

function formatMessage(username, text, admin = false) {
  return {
    username,
    text,
    time: moment().format("h:mm a"),
    admin,
  };
}

module.exports = formatMessage;
