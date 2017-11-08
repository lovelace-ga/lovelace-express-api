'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Page = models.page.Page
const Site = models.site
// const siteController = require('./sites.js')

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  console.log('this is index')
  Site.findOne({ _owner: req.user.id })
    .then((site) => {
      // console.log('site.pages is', site.pages)
      return site.pages
    })
    .then(pagesPages => res.json({
      pages: pagesPages.map((e) =>
        e.toJSON({ user: req.user }))
    }))

    .catch(next)
}

// const show = (req, res) => {
//   console.log('show is running')
//   Site.findOne({ _owner: req.user.id })
//     .then((site) => {
//       // console.log('site.pages is', site.pages) // array of objects
//       return site.pages
//     })
//     .then((pagesPages) => {
//       const showPage = pagesPages.findIndex((pagei) => (pagei._id === '5a01f2ab65186d23ea5413a0'))
//       return pagesPages[showPage]
//     })
//     .then((showPage) => res.json({
//       page: showPage.toJSON({ user: req.user })
//     }))
//
//   // res.json({
//   //   page: req.page.toJSON({ user: req.user })
//   // })
// }

// const create = (req, res, next) => {
//   console.log('req.body is', req.body)
//   const page = Object.assign(req.body.page, {
//     _owner: req.user._id
//   })
//
//   const findSite = function () {
//     return Site.findOne({ _owner: req.user.id })
//   }
//
//   const createPage = function () {
//     return Page.create(page)
//   }
//
//   Promise.all([findSite(), createPage()])
//     .then((values) => {
//       values[0].pages.push(values[1].toJSON())
//       console.log('values is', values)
//       console.log('page is', values[1].toJSON())
//       values[0].save()
//       console.log('values[0]is ', values[0])
//       return values[1]
//     })
//     .then(page =>
//       res.status(201)
//         .json({
//           page: page.toJSON({ user: req.user })
//         }))
//     .catch(next)
// }

const create = (req, res, next) => {
  console.log('req.body is', req.body)
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
      console.log('returnVal is', returnVal)
      return returnVal
    })
    .then(site =>
      res.status(201)
        .json({
          site: site.toJSON({ user: req.user })
        }))
    .catch(next)
}

// const update = (req, res, next) => {
//   delete req.body.page._owner  // disallow owner reassignment.
//
//   Site.findOne({ _owner: req.user.id })
//     .then((site) => {
//       console.log('site.pages is', site.pages)
//       site.pages.findIndex()
//       for (let i = 0; i < site.pages.length; i++) {
//         if (site.pages[i]._id === req.page._id) {
//           return 'hi'
//         }
//       }
//     })

//   req.page.update(req.body.page)
//     .then(() => res.sendStatus(204))
//     .catch(next)
// /// ^^ THIS WORKS. DO NOT UPDATE ////
//
//   Site.findOne({ _owner: req.user.id })
//   .populate('pages')
//   .exec(function (err, site) {
//     if (err) {
//       throw err
//     }
//     console.log('JSON for site is', site)
//   })
// }

// IGNORE ALL BELOW COMMENTED OUT. JUST TESTING FOR UPDATE.

  // const findSite = function () {
  //   return Site.find({
  //     _owner: req.user.id,
  //     'pages._id': req.page._id
  //   })
  // }
  //
  // findSite()
  //   .then((site) => {
  //     // let pagesIndex = 0
  //     // for (let i = 0; i > site.length; i++) {
  //     //   if (site[i].id === req.page.id) {
  //     //     pagesIndex = i
  //     //   }
  //     //   return pagesIndex
  //     // }
  //     // const indexOfSpecificBlog = site.indexOf(req.page._id)
  //     // console.log('site index test is', site.pages[0])
  //     console.log('find site array index 0 returns', site[0])
  //     return site[0] // return object
  //   })
  //   .then((site) => {
  //     // let
  //     console.log('site.pages.length is', site.pages.length)
  //     for (let i = 0; i < site.pages.length; i++) {
  //       console.log('for loop site.pages[i]._id is', site.pages[i]._id)
  //       console.log('for loop site pages is', site.pages[i])
  //       console.log('req.page._id in for loop is', req.page.id)
  //       if (site.pages[i]._id.toString() === req.page._id.toString()) {
  //         console.log('we have a winner!', i)
  //         site.update({ 'pages._id': req.page._id }, { $set: { 'pages.content': req.body.page.content } })
  //
  //         // const pagesIndex = i
  //         // console.log('matchging pagesindex is', pagesIndex)
  //         // return pagesIndex
  //       }
  //     }
  //     // console.log('pagesindex after forloop is', pagesIndex)
  //     // console.log('pagesIndex is', pagesIndex)
  //     console.log('req.body.page is', req.body.page)
  //     console.log('req.body is', req.body)
  //     console.log('site.pages is', site.pages)
  //     // site.update({ 'pages._id': req.page._id }, { $set: { 'pages': req.body.page } })
  //     // site.save()
  //   })

  // const updateSiteBlog = function () {
  //
  // }
  //
  // findSite()
  //   .then(site => {
  //     site.update({ 'pages._id': req.page._id },
  //       { '$set': {
  //         'pages.$.title': req.body.title,
  //         'pages.$.content': req.body.content
  //       }
  //       })
  //     site.save()
  //     console.log('saved site is', site)
  //   })

  // const findSiteAndUpdate = function () {
  //   return Site.findOneAndUpdate({ 'pages._id': req.page._id },
  //     { '$set': {
  //       'pages.title': req.body.title,
  //       'pages.content': req.body.content
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

      // const getPage = site.pages.id(req.page._id)
      // getPage.update(req.body.page)
      // console.log('page for update is', getPage)
    // })
      // console.log('findSite.pages is', site.pages))

  // console.log(findSite())

// const destroy = (req, res, next) => {
//   Site.findOne({
//     _owner: req.user.id,
//     'pages._id': req.page._id
//   })
//     .then((site) => {
//       console.log('site in destroy is', site)
//       // site.update(
//       // { 'pages._id': req.page._id },
//       // { $pull: { pages: { $in: [ req.page._id ] } } })
//     })
//
//   req.page.remove()
//     .then(() => res.sendStatus(204))
//     .catch(next)
// }

module.exports = controller({
  index,
  // show,
  create
  // update,
  // destroy
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  // { method: setModel(Site), only: ['create'] },
  { method: setModel(Page), only: ['show'] },
  { method: setModel(Page, { forUser: true }), only: ['update', 'destroy'] }
] })
