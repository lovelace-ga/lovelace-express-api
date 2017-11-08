'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Post = models.post.Post
// const Site = models.site
// const siteController = require('./sites.js')

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

// const index = (req, res, next) => {
//   console.log('this is index')
//   Site.findOne({ _owner: req.user.id })
//     .then((site) => {
//       // console.log('site.blog is', site.blog)
//       return site.blog
//     })
//     .then(blogPosts => res.json({
//       blog: blogPosts.map((e) =>
//         e.toJSON({ user: req.user }))
//     }))
//     .catch(next)
// }
  // Post.find({ _owner: req.user.id })
  // // .then((posts) => {
  // //   console.log('posts are', posts)
  // //   return posts
  // // })
  //   .then(posts => res.json({
  //     posts: posts.map((e) =>
  //       e.toJSON({ user: req.user }))
  //   }))

// const show = (req, res) => {
//   console.log('show is running')
//   Site.findOne({ _owner: req.user.id })
//     .then((site) => {
//       // console.log('site.blog is', site.blog) // array of objects
//       return site.blog
//     })
//     .then((blogPosts) => {
//       const showPost = blogPosts.findIndex((posti) => (posti._id === '5a01f2ab65186d23ea5413a0'))
//       return blogPosts[showPost]
//     })
//     .then((showPost) => res.json({
//       post: showPost.toJSON({ user: req.user })
//     }))
//
//   // res.json({
//   //   post: req.post.toJSON({ user: req.user })
//   // })
// }

// const create = (req, res, next) => {
//   console.log('req.body is', req.body)
//   const post = Object.assign(req.body.post, {
//     _owner: req.user._id
//   })
//
//   const findSite = function () {
//     return Site.findOne({ _owner: req.user.id })
//   }
//
//   const createPost = function () {
//     return Post.create(post)
//   }
//
//   Promise.all([findSite(), createPost()])
//     .then((values) => {
//       values[0].blog.push(values[1].toJSON())
//       console.log('values is', values)
//       console.log('post is', values[1].toJSON())
//       values[0].save()
//       console.log('values[0]is ', values[0])
//       return values[1]
//     })
//     .then(post =>
//       res.status(201)
//         .json({
//           post: post.toJSON({ user: req.user })
//         }))
//     .catch(next)
// }

// const create = (req, res, next) => {
//   console.log('req.body is', req.body)
//   const post = Object.assign(req.body.post, {
//     _owner: req.user._id
//   })
//
//   Site.findOne({ _owner: req.user.id })
//     .then((site) => {
//       site.blog.push(post)
//       site.save()
//       return site
//     })
//     .then((returnVal) => {
//       console.log('returnVal is', returnVal)
//       return returnVal
//     })
//     .then(site =>
//       res.status(201)
//         .json({
//           site: site.toJSON({ user: req.user })
//         }))
//     .catch(next)
// }

// const update = (req, res, next) => {
//   delete req.body.post._owner  // disallow owner reassignment.
//   console.log('update req.body is', req.body)
//   Site.findOne({ _owner: req.user.id })
//     .then((site) => {
//       console.log('site.blog is', site.blog)
//       for (let i = 0; i < site.blog.length; i++) {
//         if (site.blog[i]._id === req.body.post._id) {
//           console.log('we found a blogpost at position:', i)
//         }
//       }
//     })
// }
    // const params = {
    //
    // }

  // req.example.update(req.body.example)
  //   .then(() => res.sendStatus(204))
  //   .catch(next)

// / ^^ THIS WORKS. DO NOT UPDATE ////
//
//   Site.findOne({ _owner: req.user.id })
//   .populate('blog')
//   .exec(function (err, site) {
//     if (err) {
//       throw err
//     }
  //   console.log('JSON for site is', site)
  // })
// }

// IGNORE ALL BELOW COMMENTED OUT. JUST TESTING FOR UPDATE.

  // const findSite = function () {
  //   return Site.find({
  //     _owner: req.user.id,
  //     'blog._id': req.post._id
  //   })
  // }
  //
  // findSite()
  //   .then((site) => {
  //     // let blogIndex = 0
  //     // for (let i = 0; i > site.length; i++) {
  //     //   if (site[i].id === req.post.id) {
  //     //     blogIndex = i
  //     //   }
  //     //   return blogIndex
  //     // }
  //     // const indexOfSpecificBlog = site.indexOf(req.post._id)
  //     // console.log('site index test is', site.blog[0])
  //     console.log('find site array index 0 returns', site[0])
  //     return site[0] // return object
  //   })
  //   .then((site) => {
  //     // let
  //     console.log('site.blog.length is', site.blog.length)
  //     for (let i = 0; i < site.blog.length; i++) {
  //       console.log('for loop site.blog[i]._id is', site.blog[i]._id)
  //       console.log('for loop site blog is', site.blog[i])
  //       console.log('req.post._id in for loop is', req.post.id)
  //       if (site.blog[i]._id.toString() === req.post._id.toString()) {
  //         console.log('we have a winner!', i)
  //         site.update({ 'blog._id': req.post._id }, { $set: { 'blog.content': req.body.post.content } })
  //
  //         // const blogIndex = i
  //         // console.log('matchging blogindex is', blogIndex)
  //         // return blogIndex
  //       }
  //     }
  //     // console.log('blogindex after forloop is', blogIndex)
  //     // console.log('blogIndex is', blogIndex)
  //     console.log('req.body.post is', req.body.post)
  //     console.log('req.body is', req.body)
  //     console.log('site.blog is', site.blog)
  //     // site.update({ 'blog._id': req.post._id }, { $set: { 'blog': req.body.post } })
  //     // site.save()
  //   })

  // const updateSiteBlog = function () {
  //
  // }
  //
  // findSite()
  //   .then(site => {
  //     site.update({ 'blog._id': req.post._id },
  //       { '$set': {
  //         'blog.$.title': req.body.title,
  //         'blog.$.content': req.body.content
  //       }
  //       })
  //     site.save()
  //     console.log('saved site is', site)
  //   })

  // const findSiteAndUpdate = function () {
  //   return Site.findOneAndUpdate({ 'blog._id': req.post._id },
  //     { '$set': {
  //       'blog.title': req.body.title,
  //       'blog.content': req.body.content
  //     }
  //     })
  // }
  //
  // findSiteAndUpdate()
  //   .exec(function (err, site) {
  //     if (err) {
  //       console.log(err)
  //       res.status(500).send(err)
  //     } else {
  //       res.status(200).send(site)
  //     }
  //   })

      // const getPost = site.blog.id(req.post._id)
      // getPost.update(req.body.post)
      // console.log('post for update is', getPost)
    // })
      // console.log('findSite.blog is', site.blog))

  // console.log(findSite())

// const destroy = (req, res, next) => {
//   Site.findOne({
//     _owner: req.user.id,
//     'blog._id': req.post._id
//   })
//     .then((site) => {
//       console.log('site in destroy is', site)
//       // site.update(
//       // { 'blog._id': req.post._id },
//       // { $pull: { blog: { $in: [ req.post._id ] } } })
//     })
//
//   req.post.remove()
//     .then(() => res.sendStatus(204))
//     .catch(next)
// }

module.exports = controller({
  // index,
  // show,
  // create
  // update
  // destroy
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  // { method: setModel(Site), only: ['create'] },
  { method: setModel(Post), only: ['show'] },
  { method: setModel(Post, { forUser: true }), only: ['update', 'destroy'] }
] })
