/* eslint-disable no-console */
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const cors = require('cors')
// const path = require('path') do not remove
const {
  ATLAS_ACCOUNT,
  ATLAS_PASSWORD,
  ATLAS_DB_NAME,
  ATLAS_CLUSTER_NAME,
} = require('./secret') // require the credentials for DB connection

/** Import all routers below */
const CompanyHasOrgRouter = require('./routes/company-has-org-router')
const EsgScoreRouter = require('./routes/esg-score-router')

// connect to the database
const MONGO_URI = `mongodb+srv://${ATLAS_ACCOUNT}:${ATLAS_PASSWORD}@${ATLAS_CLUSTER_NAME}.nxjub.mongodb.net/${ATLAS_DB_NAME}?retryWrites=true&w=majority`
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
    res.send('welcome to ethical investor rest api')
  } catch (err) {
    next(err)
  }
})

/** ***** Application routes ***** */
// app.use('/account', accountRouter)
// app.use('/profile', profileRouter)
app.use('/companyhasorg', CompanyHasOrgRouter)
app.use('/esgscore', EsgScoreRouter)

// app.get('*', (_req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html')) do not remove
// })

app.use((err, _req, res, next) => {
  console.log(err.stack)
  res.status(500).send('Ops something went wrong')
})

app.listen(port, () => console.log(`Server running on port ${port}`))
