const express = require('express');
require('dotenv').config()
// Express Middleware
const helmet = require('helmet') // tworzy nagłówki chroniące przed atakami (security)
const bodyParser = require('body-parser') // zamienia odpowiedź w użyteczny format
const cors = require('cors')  // allows/disallows cross-site communication
const morgan = require('morgan') // rejestruje żądania

var db = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'kim',
      password : 'sqLaura0320',
      database : 'kim'
    }
});
const main = require('./main');
const app = express();

const whitelist = ['http://localhost:3001']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else { callback(new Error('Niedozwolone przez CORS')) }
  }
}
app.use(helmet())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(morgan('combined')) // use 'tiny' or 'combined'

app.get('/', (req, res) => res.send('hello world'))
app.get('/crud', (req, res) => main.getTableData(req, res, db))
app.post('/crud', (req, res) => main.postTableData(req, res, db))
app.put('/crud', (req, res) => main.putTableData(req, res, db))
app.delete('/crud', (req, res) => main.deleteTableData(req, res, db))

app.listen(process.env.PORT || 3002, () => {
  console.log(`Premiere pgAPI uruchomione na port ${process.env.PORT || 3002}`)
})
