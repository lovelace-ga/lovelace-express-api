'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Post = models.post.Post
const Site = models.site

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  Post.find({ _owner: req.user.id })
  // .then((posts) => {
  //   console.log('posts are', posts)
  //   return posts
  // })
    .then(posts => res.json({
      posts: posts.map((e) =>
        e.toJSON({ user: req.user }))
    }))

    .catch(next)
}

const show = (req, res) => {
  res.json({
    post: req.post.toJSON({ user: req.user })
  })
}

const create = (req, res, next) => {
  console.log('req.body is', req.body)
  const post = Object.assign(req.body.post, {
    _owner: req.user._id
  })
  const findSite = function () {
    return Site.findOne({ _owner: req.user.id })
  }
  const createPost = function () {
    return Post.create(post)
  }
  Promise.all([findSite(), createPost()])
    .then((values) => {
      values[0].blog.push(values[1].toJSON())
      console.log('values is', values)
      console.log('post is', values[1].toJSON())
      values[0].save()
      console.log('values[0]is ', values[0])
      return values[1]
    })
    .then(post =>
      res.status(201)
        .json({
          post: post.toJSON({ user: req.user })
        }))
    .catch(next)
}

// const update = (req, res, next) => {
//   const updatedPost = req.body.post
//   console.log('req.post is', req.post)
//   const findSite = function () {
//     return Site.find({ _owner: req.user.id })
//   }
//   findSite()
//     .then((site) => {
//       console.log('site is', site)
//       site.blog.update({$elemMatch: {id: req.post.id}}, {$set: {'$.title': req.body.post.title}})
//       // site.blog._id(req.post.id)
//
//       site.save()
//       console.log('site after saving is', site)
//       return site
//     })
//
//     .then(() => res.sendStatus(204))
//     .catch(next)
//   // const changePost = function () {
//   //   return Post.update(updatedPost)
//   // }
//   // Promise.all([findSite(), changePost()])
//   //   .then((values) => {
//   //     const currentPost = values[0].blog.id(req.post.id)
//   //     // values[0].blog.push(values[1].toJSON())
//   //     console.log('values[0]is ', values[0])
//   //     console.log('values[1]is', values[1])
//   //     values[0].save()
//   //     return values[1]
//   //   })
// }

// const update = (req, res, next) => {
//   delete req.body.post._owner  // disallow owner reassignment.
//   const findSite = function () {
//     console.log('findSite returns:', Site.findOne({ _owner: req.user.id }))
//     return Site.findOne({ _owner: req.user.id })
//   }
//   req.post.update(req.body.post)
//     .then((response) => {
//       const site = findSite()
//       site.save()
//       return response
//     })
//     .then(() => res.sendStatus(204))
//     .catch(next)
// }

const destroy = (req, res, next) => {
  const findSite = function () {
    // console.log('site is', Site.findOne({ _owner: req.user.id }))
    return Site.findOne({ _owner: req.user.id })
  }
  findSite()
    .then((site) => {
      console.log('site is', site)
      site.blog.id(req.post.id).remove()
      site.save()
      console.log('site after saving is', site)
      return site
    })
    .then(() => res.sendStatus(204))
    .catch(next)
  // req.post.remove()
  //   .then(() => res.sendStatus(204))
  //   .catch(next)
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
  // { method: setModel(Site), only: ['create'] },
  { method: setModel(Post), only: ['show'] },
  { method: setModel(Post, { forUser: true }), only: ['update', 'destroy'] }
] })
