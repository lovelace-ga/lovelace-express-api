'use strict'

const mongoose = require('mongoose')
// const Post = require('./post')

const siteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  blog: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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
