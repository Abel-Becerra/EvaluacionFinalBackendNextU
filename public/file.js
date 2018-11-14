let express = require('express'),
    router = express.Router(),
    {promisify} = require('util'),
    fs = require('fs'),
    readFileAsync = promisify(fs.readFile)

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

    console.log(c)
    console.log(t)
    console.log(mi)
    console.log(ma)

    if (c == null & t == null && mi == null && ma == null){
      res.send(obj)
    }else {
      for(var y in obj) {
        let p = parseFloat(obj[y].Precio.replace(",", "").replace("$", ""))
        if (obj[y].Ciudad == c && obj[y].Tipo == t && p >= mi && p <= ma) {
          console.log("todos los filtros")
          bienes.push(obj[y])
        } else{
          if (obj[y].Ciudad == c && t == null && p >= mi && p <= ma) {
            console.log("filtros ciudad y precios")
            bienes.push(obj[y])
          } else {
            if (obj[y].Tipo == t && c == null && p >= mi && p <= ma) {
              console.log("filtros tipo y precios")
              bienes.push(obj[y])
            } else {//if (p >= mi && p <= ma) {
              console.log("filtros precios")
              bienes.push(obj[y])
            }
          }
        }
      }
      res.send(bienes)
    }
  })
  .catch(error => {
    res.sendStatus(500).json(error)
  })
})

module.exports = router
