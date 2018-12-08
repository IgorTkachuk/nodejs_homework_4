const db = require('../model');

exports.getSkills = () => {
    return db.get('skills').value();
}

exports.setSkills = ({age, concerts, cities, years}) => {

    db.set('skills', {
        "age": {
            "number": age,
            "text": "Возраст начала занятий на скрипке"
          },
          "concerts": {
            "number": concerts,
            "text": "Концертов отыграл"
          },
          "cities": {
            "number": cities,
            "text": "Максимальное число городов в туре"
          },
          "years": {
            "number": years,
            "text": "Лет на сцене в качестве скрипача"
          }
    })
      .write();
}
