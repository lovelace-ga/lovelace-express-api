'use strict'

const mongoose = require('mongoose')
const postModel = require('./post')
const pageModel = require('./page')

const siteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  blog: [postModel.postSchema],
  pages: [pageModel.pageSchema],
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, ret, options) {
      const userId = (options.user && options.user._id) || false
      ret.editable = userId && userId.equals(doc._owner)
      return ret
    }
  }
})

const Site = mongoose.model('Site', siteSchema)

module.exports = Site
