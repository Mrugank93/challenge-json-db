// Import packages
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const middleware = require('./middleware')
const api = require('./routes.js');

const PORT = process.env.PORT || 1337

// App
const app = express()
// Morgan
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true,
}));

// First route
app.get('/health', (req, res) => {
    res.json({ success: true })
})

app.use('/',api)

app.use(middleware.handleError)
app.use(middleware.notFound)

// Starting server
const server = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
)

if (require.main !== module) {
  module.exports = server
}
