const mongoose = require('mongoose')

const { Schema, model } = mongoose

const companyhasorg = new Schema({
  orgid: { type: Number, required: true },
  orgname: { type: String, required: true },
  tick: { type: String, required: true },
  cusip: { type: String, required: true },
})

module.exports = model('company_has_org', companyhasorg)
