'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Site = models.site

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

// CRUD actions for SITES
const create = (req, res, next) => {
  const site = Object.assign(req.body.site, {
    _owner: req.user._id
  })
  Site.create(site)
    .then(site =>
      res.status(201)
        .json({
          site: site.toJSON({ user: req.user })
        }))
    .catch(next)
}

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

const update = (req, res, next) => {
  delete req.body.site._owner  // disallow owner reassignment.
  req.site.update(req.body.site)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.site.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

// Create, Update, Delete actions for POSTS within a SITE
const createPost = (req, res, next) => {
  const post = Object.assign(req.body.post, {
    _owner: req.user._id
  })

  Site.findOne({ _owner: req.user.id })
    .then((site) => {
      site.blog.push(post)
      site.save()
      return site
    })
    .then((returnVal) => {
      return returnVal
    })
    .then(site =>
      res.status(201)
        .json({
          site: site.toJSON({ user: req.user })
        }))
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
          throw err
        }
        return site
      }
    }

  )
  .then(() => res.sendStatus(204))
  .catch(next)
}

const deletePost = (req, res, next) => {
  const findSite = function () {
    return Site.findOne({ _owner: req.user.id })
  }
  findSite()
    .then((site) => {
      site.blog.id(req.body.site.postID).remove()
      site.save()
      return site
    })
    .then(() => res.sendStatus(204))
    .catch(next)
}

// Create, Update, and Delete actions for PAGES within a SITE
const createPage = (req, res, next) => {
  const page = Object.assign(req.body.page, {
    _owner: req.user._id
  })

  Site.findOne({ _owner: req.user.id })
    .then((site) => {
      site.pages.push(page)
      site.save()
      return site
    })
    .then((returnVal) => {
      return returnVal
    })
    .then(site =>
      res.status(201)
        .json({
          site: site.toJSON({ user: req.user })
        }))
    .catch(next)
}

const updatePage = (req, res, next) => {
  delete req.body.page._owner  // disallow owner reassignment.

  Site.findOneAndUpdate(
    { '_owner': req.user.id, 'pages._id': req.body.page._id },
    { $set: {
      'pages.$.title': req.body.page.title,
      'pages.$.content': req.body.page.content
    }
    },
    {
      function (err, site) {
        if (err) {
          throw err
        }
        return site
      }
    }

  )
  .then(() => res.sendStatus(204))
  .catch(next)
}

const deletePage = (req, res, next) => {
  const findSite = function () {
    return Site.findOne({ _owner: req.user.id })
  }
  findSite()
    .then((site) => {
      site.pages.id(req.body.site.pageID).remove()
      site.save()
      return site
    })
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
  createPost,
  updatePost,
  deletePost,
  createPage,
  updatePage,
  deletePage
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Site), only: ['show'] },
  { method: setModel(Site, { forUser: true }), only: ['update', 'destroy'] }
] })
