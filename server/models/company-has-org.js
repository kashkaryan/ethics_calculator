const mongoose = require('mongoose')

const { Schema, model } = mongoose

const companyhasorg = new Schema({
  // author: {
  //   type: Schema.Types.ObjectId, ref: 'User', required: true,
  // },
  // comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],

  orgid: { type: Number },
  orgname: { type: String },
  tick: { type: String },
  cusip: { type: String },
})

module.exports = model('company_has_org', companyhasorg)
