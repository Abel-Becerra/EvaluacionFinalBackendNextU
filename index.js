let parser = require('body-parser'),
    http = require('http'),
    express = require('express'),
    _file_ = require('./public/file.js'),
    ciudad = require('./public/ciudades.js'),
    tipo = require('./public/tipos.js')

const PORT = 9234,
      app = express(),
      server = http.createServer(app)

app.use(parser.json())

app.use(parser.urlencoded({extended:true}))

app.use('/file', _file_)

app.use('/ciudad', ciudad)

app.use('/tipo', tipo)

app.use(express.static(__dirname + "/public"))

server.listen(PORT, () => console.log('Server is listening on port: ' + PORT) )
