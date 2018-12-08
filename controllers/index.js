const db = require('../model');

exports.newMsg = ({name, email, message}) => {
    db.get('messages')
      .push({name: name, email: email, message: message})
      .write();
}