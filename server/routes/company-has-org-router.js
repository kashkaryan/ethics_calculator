const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()
const CompanyHasOrg = require('../models/company-has-org')
// const checkAuthenticated = require('../middlewares/isAuthenticated') do not remove

// get all the documents in the collection
router.get('/', async (_, res, next) => {
  try {
    const companyorgs = await CompanyHasOrg.find()
    res.send(companyorgs)
  } catch (err) {
    next(err)
  }
})

// get a document by id in the collection, check if the id is valid
router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.send('not valid company organization id')
  }
  try {
    const companyorg = await CompanyHasOrg.findById({ _id: id })
    res.send(companyorg)
  } catch (err) {
    next(err)
  }
})

// get a document by ticker in the collection (get one row with tick = 'MSFT')
router.get('/tick/:tick', async (req, res, next) => {
  const { tick } = req.params
  try {
    const companyorg = await CompanyHasOrg.findOne({ tick })
    res.send(companyorg)
  } catch (err) {
    next(err)
  }
})

// get a document by cusip and return the orgid corresponding to cusip in the collection (Get orgid of row with cusip of '46120210')
router.get('/cusip/:cusip', async (req, res, next) => {
  const { cusip } = req.params
  try {
    const { orgid } = await CompanyHasOrg.findOne({ cusip })
    res.status(200).json({ orgid })
  } catch (err) {
    next(err)
  }
})

// router.get('/cusip/:cusip', (req, res, next) => {
//   const { cusip } = req.params
//   CompanyHasOrg.findOne({ cusip }, (err, companyhasorg) => {
//     if (err) {
//       next(err)
//     } else {
//       const { orgid } = companyhasorg
//       res.status(200).json({ orgid })
//     }
//   })
// })

// get a document by orgname and return the ticker corressponding to orgname in the collection (Get tick of orgname = 'Deere & Company')
router.get('/orgname/:orgname', async (req, res, next) => {
  const { orgname } = req.params
  try {
    const { tick } = await CompanyHasOrg.findOne({ orgname })
    res.status(200).json({ tick })
  } catch (err) {
    next(err)
  }
})

// insert a document into the collection
router.post('/', async (req, res, next) => {
  const {
    orgid, orgname, tick, cusip,
  } = req.body

  try {
    await CompanyHasOrg.create({
      orgid, orgname, tick, cusip,
    })
    res.send(`this companyorg is created successfully with orgid: ${orgid} and company name ${orgname}`)
  } catch (err) {
    next(err)
  }
})

module.exports = router
