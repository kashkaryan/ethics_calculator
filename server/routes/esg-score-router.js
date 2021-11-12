const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()
const EsgScore = require('../models/esg-score')
const CompanyHasOrg = require('../models/company-has-org')
// const checkAuthenticated = require('../middlewares/isAuthenticated') do not remove

// get all the documents in the collection
router.get('/', async (_, res, next) => {
  try {
    const esgscores = await EsgScore.find()
    res.send(esgscores)
  } catch (err) {
    next(err)
  }
})

// get a document by id in the collection, check if the id is valid
router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.send('not valid esg score id')
  }
  try {
    const esgscore = await EsgScore.findById({ _id: id })
    res.send(esgscore)
  } catch (err) {
    next(err)
  }
})

// get a document by fisyear & ticker and return the score corresponding to fisyear & ticker in the collection
// i.e. get the 2020 scores for the ticker TSLA (need both the last collection and this one to do that)
router.get('/ticker/:tick/year/:fisyear', async (req, res, next) => {
  const { tick, fisyear } = req.params
  try {
    const { orgid } = await CompanyHasOrg.findOne({ tick })
    const { score } = await EsgScore.findOne({ orgid, fisyear })
    res.status(200).json({ score })
  } catch (err) {
    next(err)
  }
})

// get a document by ticker and return the average scores of 2020 & 2021 corresponding to the ticker given in the collections
// i.e. get the average scores for the ticker MSFT
router.get('/ticker/:tick', async (req, res, next) => {
  const { tick } = req.params
  try {
    const { orgid } = await CompanyHasOrg.findOne({ tick })
    const esg2020 = await EsgScore.findOne({ orgid, fisyear: 2020 })
    const esg2021 = await EsgScore.findOne({ orgid, fisyear: 2021 })

    // take the average
    if (esg2020.score && esg2021.score) {
      const average = (esg2020.score + esg2021.score) / 2
      res.status(200).json({ average_score: average })
    } else {
      res.status(400).json({ err: `can not take the average score for the given ticker ${tick}` })
    }
  } catch (err) {
    next(err)
  }
})

// insert a document into the collection
router.post('/', async (req, res, next) => {
  const {
    orgid,
    fisyear,
    cdflag,
    feeddate,
    fyenddate,
    cg_bd_bf,
    cg_bd_bs,
    cg_bd_cp,
    cg_in_vs,
    cg_sh_sr,
    ec_ma_pe,
    ec_pr_sl,
    ec_re_cl,
    en_en_er,
    en_en_pi,
    en_en_rr,
    so_cu_pr,
    so_so_co,
    so_so_hr,
    so_wo_do,
    so_wo_eq,
    so_wo_hs,
    so_wo_td,
    score,
    cscore,
    controversiesscore,
    resourceusescore,
    emissionsscore,
    innovationscore,
    workforcescore,
    humanrightsscore,
    communityscore,
    productrespscore,
    managementscore,
    shareholdersscore,
    csrstrategyscore,
  } = req.body

  try {
    await EsgScore.create({
      orgid,
      fisyear,
      cdflag,
      feeddate,
      fyenddate,
      cg_bd_bf,
      cg_bd_bs,
      cg_bd_cp,
      cg_in_vs,
      cg_sh_sr,
      ec_ma_pe,
      ec_pr_sl,
      ec_re_cl,
      en_en_er,
      en_en_pi,
      en_en_rr,
      so_cu_pr,
      so_so_co,
      so_so_hr,
      so_wo_do,
      so_wo_eq,
      so_wo_hs,
      so_wo_td,
      score,
      cscore,
      controversiesscore,
      resourceusescore,
      emissionsscore,
      innovationscore,
      workforcescore,
      humanrightsscore,
      communityscore,
      productrespscore,
      managementscore,
      shareholdersscore,
      csrstrategyscore,
    })
    res.send(`this esg score is created successfully for orgid: ${orgid}`)
  } catch (err) {
    next(err)
  }
})

module.exports = router
