const db = require('../model');
const fs = require('fs');
const path = require('path');
const httpError = require('../httpError');

exports.getProducts = () => {
    return db.get('products').value();
}

exports.newProduct = ({photo, name, price}) => {
    const { name: photoName, size, path: tempPath } = photo;
    const uploadDir = path.join('./public', 'upload');

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    if (!name || !price) {
        fs.unlinkSync(tempPath);
        console.log(httpError);
        throw new httpError('All fields are required!', 400);
    }

    if (!photoName || !size) {
        fs.unlinkSync(tempPath);
        throw new httpError('File not saved!', 409);
    }

    const uploadFile = path.join(uploadDir, photoName);
    fs.renameSync(tempPath, uploadFile);
    const src = uploadFile.substr(uploadFile.indexOf('\\'));

    if (!db.get('products').value()) {
        db.set('products', []).write();
    }

    db.get('products').push({src, name, price}).write();
}