let express = require('express'),
    router = express.Router(),
    {promisify} = require('util'),
    fs = require('fs'),
    readFileAsync = promisify(fs.readFile),
    Enumerable = require("linq-es2015")

router.get('/', (req, res, next) => {
  readFileAsync('./public/data.json', {encoding: 'utf8'})
  .then(contents => {
    let obj = JSON.parse(contents)

    let tipos = []

    tipos = Enumerable.from(obj)
    .Select(function (y) { return y.Tipo })
    .Distinct()
    .ToArray()

    res.send(tipos)
  })
  .catch(error => {
    res.sendStatus(500).json(error)
  })
})

module.exports = router
