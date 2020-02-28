const request = require('request')
const yaml    = require('js-yaml')
const express = require('express')
const  parser = require('body-parser');
const app     = express()
const port    = 3000

//------------------------------------------------------------------------------

app.use( parser.json() )                         // support json encoded bodies
app.use( parser.urlencoded({ extended: true }) ) // support encoded bodies
app.use( express.static('.') )                   // static files from root

server = app.listen(port, () => console.log(`VNF Manager listening on port ${port}!`))
server.timeout = 5000
