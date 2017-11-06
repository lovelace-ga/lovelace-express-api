'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Post = models.post
const Site = models.site

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  Post.find()
    .then(posts => res.json({
      posts: posts.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    post: req.post.toJSON({ virtuals: true, user: req.user })
  })
}

const create = (req, res, next) => {
  // const owner = req.user._id
  console.log('req.body is', req.body)
  const params = {
    title: req.body.post.title,
    content: req.body.post.content
  }
  console.log('params are', params)
  const post = Object.assign(req.body.post, {
    _owner: req.user._id
  })
  console.log('post is', post)
  // console.log('req is', req)
  // console.log('Site index is', Site.find('59ff7febc31a8322faa92ddc'))
  // const currentSite = Site.find({ _owner: req.user.id })
  // console.log('currentSite is ', currentSite)
  // currentSite.blog.push(params)
  Post.create(post)
    // Site.insert
    .then(post =>
      res.status(201)
        .json({
          post: post.toJSON({ user: req.user })
        }))
    .catch(next)
}

const update = (req, res, next) => {
  delete req.body.post._owner  // disallow owner reassignment.

  req.post.update(req.body.post)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.post.remove()
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
  { method: setModel(Post), only: ['show'] },
  { method: setModel(Post, { forUser: true }), only: ['update', 'destroy'] }
] })
