require('dotenv').config()
const PORT = process.env.PORT || 3001
const ORIGIN = process.env.ORIGIN || 'http://localhost:5173'

module.exports = { PORT, ORIGIN }
