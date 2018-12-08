const db = require('../model');

exports.auth = ({email: authEmail, password: authPassword}) => {
    const { email, pass } = db.get('auth').value().admin;

    if ((authEmail.toUpperCase() === email.toUpperCase()) && (authPassword === pass)) {
        return true;
    }

    return false;
}