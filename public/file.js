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

    let bienes = []

    let c = req.query.ciudad, t = req.query.tipo, mi = req.query.minimo, ma = req.query.maximo

    c = c == undefined || c == "" ? null : c;
    t = t == undefined || t == "" ? null : t;
    mi = mi == undefined || mi == "" ? null : mi;
    ma = ma == undefined || ma == "" || ma == "undefined" ? null : ma;

    if (c == null & t == null && mi == null && ma == null){
      res.send(obj)
    }else {
      if (c != null && t != null) {
        bienes = Enumerable.from(obj).Where(function (x) {
          return x.Ciudad == c && x.Tipo == t &&
            parseFloat(x.Precio.replace(",", "").replace("$", "")) >= mi &&
            parseFloat(x.Precio.replace(",", "").replace("$", "")) <= ma
        })
        .Select(function (y) { return y })
        .ToArray()
      } else if (c != null && t == null) {
        bienes = Enumerable.from(obj).Where(function (x) {
          return x.Ciudad == c //&&
            parseFloat(x.Precio.replace(",", "").replace("$", "")) >= mi &&
            parseFloat(x.Precio.replace(",", "").replace("$", "")) <= ma
        })
        .Select(function (y) { return y })
        .ToArray()
      } else if (c == null && t != null) {
        bienes = Enumerable.from(obj).Where(function (x) {
          return x.Tipo == t &&
            parseFloat(x.Precio.replace(",", "").replace("$", "")) >= mi &&
            parseFloat(x.Precio.replace(",", "").replace("$", "")) <= ma
        })
        .Select(function (y) { return y })
        .ToArray()
      }  else {
        bienes = Enumerable.from(obj).Where(function (x) {
          return parseFloat(x.Precio.replace(",", "").replace("$", "")) >= mi &&
            parseFloat(x.Precio.replace(",", "").replace("$", "")) <= ma
        })
        .Select(function (y) { return y })
        .ToArray()
      }

      res.send(bienes)
    }
  })
  .catch(error => {
    res.sendStatus(500).json(error)
  })
})

module.exports = router
