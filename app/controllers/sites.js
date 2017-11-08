'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Site = models.site

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  Site.find()
    .then(sites => res.json({
      sites: sites.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    site: req.site.toJSON({ virtuals: true, user: req.user })
  })
}

const create = (req, res, next) => {
  const site = Object.assign(req.body.site, {
    _owner: req.user._id
  })
  console.log('req', req)
  Site.create(site)
    .then(site =>
      res.status(201)
        .json({
          site: site.toJSON({ user: req.user })
        }))
    .catch(next)
}

const deletePost = (req, res, next) => {
  console.log('is this even running?')
  const findSite = function () {
    console.log('site is', Site.findOne({ _owner: req.user.id }))
    return Site.findOne({ _owner: req.user.id })
  }
  findSite()
    .then((site) => {
      console.log('site is', site)
      console.log('postID is', req.body.site.postID)
      site.blog.id(req.body.site.postID).remove()
      site.save()
      console.log('site after saving is', site)
      return site
    })
    .then(() => res.sendStatus(204))
    .catch(next)
}

const update = (req, res, next) => {
  delete req.body.site._owner  // disallow owner reassignment.
  console.log('req.site is', req.site)
  console.log('req.site.blog is', req.site.blog)
  console.log('req.site.blog[0] is', req.site.blog[0])
  console.log('req.site.blog[0].title is', req.site.blog[0].title)
  console.log('req.body is', req.body)
  req.site.update(req.body.site)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const updatePost = (req, res, next) => {
  delete req.body.post._owner  // disallow owner reassignment.

  Site.findOneAndUpdate(
    { '_owner': req.user.id, 'blog._id': req.body.post._id },
    { $set: {
      'blog.$.title': req.body.post.title,
      'blog.$.content': req.body.post.content
    }
    },
    {
      function (err, site) {
        if (err) {
          console.error(err)
        }
        console.log(site)
      }
    }

  )
  .then(() => res.sendStatus(204))
  .catch(next)
}

const destroy = (req, res, next) => {
  req.site.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
  deletePost,
  updatePost
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Site), only: ['show'] },
  { method: setModel(Site, { forUser: true }), only: ['update', 'destroy'] }
] })
