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
  Site.create(site)
    .then(site =>
      res.status(201)
        .json({
          site: site.toJSON({ virtuals: true, user: req.user })
        }))
    .catch(next)
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

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Site), only: ['show'] },
  { method: setModel(Site, { forUser: true }), only: ['update', 'destroy'] }
] })
