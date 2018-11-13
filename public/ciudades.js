let express = require('express'),
    router = express.Router(),
    {promisify} = require('util'),
    fs = require('fs'),
    readFileAsync = promisify(fs.readFile)

router.get('/', (req, res, next) => {
  readFileAsync('./public/data.json', {encoding: 'utf8'})
  .then(contents => {
    let obj = JSON.parse(contents)

    let ciudades = []

    for(var y in obj){
      if (ciudades.indexOf(obj[y].Ciudad) == -1){
        ciudades.push(obj[y].Ciudad)
      }
    }

    res.send(ciudades)
  })
  .catch(error => {
    res.sendStatus(500).json(error)
  })
})

module.exports = router
