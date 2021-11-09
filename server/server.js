/* eslint-disable no-console */
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const cors = require('cors')
// const path = require('path') do not remove

/** Import all routers below */
const CompanyHasOrgRouter = require('./routes/company-has-org-router')

// connect to the database
const MONGO_URI = 'mongodb+srv://ethicsteam:Sb6PHZm7tv7YDC5n@cluster0.nxjub.mongodb.net/ethics-app?retryWrites=true&w=majority'
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connnected to MongoDB Database successfully')).catch(e => {
  console.error(`Connection error to MongoDB Database ${e.message}`)
})

// make a server and port
const port = process.env.PORT || 8080
const app = express()

// app.use(express.static(path.join(__dirname, '../client/build'))) do not remove

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// app.use(
//   cookieSession({
//     name: 'local-session',
//     keys: ['jfdqqfdfrasqndfsdfpqazf'],
//     maxAge: 26 * 60 * 60 * 1000, // 24 hours
//   }),
// )

// test to see if localhost:8080 works
app.get('/', (_, res, next) => {
  try {
    res.send('hello world')
  } catch (err) {
    next(err)
  }
})

/** ***** Application routes ***** */
// app.use('/account', accountRouter)
// app.use('/profile', profileRouter)
app.use('/companyhasorg', CompanyHasOrgRouter)

// app.get('*', (_req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html')) do not remove
// })

app.use((err, _req, res, next) => {
  console.log(err.stack)
  res.status(500).send('Ops something went wrong')
})

app.listen(port, () => console.log(`Server running on port ${port}`))
