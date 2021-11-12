const mongoose = require('mongoose')

const { Schema, model } = mongoose

const esgscore = new Schema({
  orgid: { type: Number, required: true },
  fisyear: { type: Number, required: true },
  cdflag: { type: Number, required: true },
  feeddate: { type: String, required: true },
  fyenddate: { type: String },
  cg_bd_bf: { type: Number, required: true },
  cg_bd_bs: { type: Number, required: true },
  cg_bd_cp: { type: Number, required: true },
  cg_in_vs: { type: Number, required: true },
  cg_sh_sr: { type: Number, required: true },
  ec_ma_pe: { type: Number, required: true },
  ec_pr_sl: { type: Number, required: true },
  ec_re_cl: { type: Number, required: true },
  en_en_er: { type: Number, required: true },
  en_en_pi: { type: Number, required: true },
  en_en_rr: { type: Number, required: true },
  so_cu_pr: { type: Number, required: true },
  so_so_co: { type: Number, required: true },
  so_so_hr: { type: Number, required: true },
  so_wo_do: { type: Number, required: true },
  so_wo_eq: { type: Number, required: true },
  so_wo_hs: { type: Number, required: true },
  so_wo_td: { type: Number, required: true },
  score: { type: Number },
  cscore: { type: Number },
  controversiesscore: { type: Number },
  resourceusescore: { type: Number },
  emissionsscore: { type: Number },
  innovationscore: { type: Number },
  workforcescore: { type: Number },
  humanrightsscore: { type: Number },
  communityscore: { type: Number },
  productrespscore: { type: Number },
  managementscore: { type: Number },
  shareholdersscore: { type: Number },
  csrstrategyscore: { type: Number },
})

module.exports = model('esg_score', esgscore)
