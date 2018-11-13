let express = require('express'),
    router = express.Router(),
    {promisify} = require('util'),
    fs = require('fs'),
    readFileAsync = promisify(fs.readFile)

router.get('/', (req, res, next) => {
  readFileAsync('./public/data.json', {encoding: 'utf8'})
  .then(contents => {
    let obj = JSON.parse(contents)

    let tipos = []

    for(var y in obj){
      if (tipos.indexOf(obj[y].Tipo) == -1){
        tipos.push(obj[y].Tipo)
      }
    }

    res.send(tipos)
  })
  .catch(error => {
    res.sendStatus(500).json(error)
  })
})

module.exports = router
