'use strict'

module.exports = require('lib/wiring/routes')

// create routes

// what to run for `GET /`
.root('root#root')

// standards RESTful routes
.resources('examples')
.resources('sites')

// users of the app have special requirements
.patch('/update-post', 'sites#updatePost')
.patch('/deletepost', 'sites#deletePost')
.get('/get-posts', 'sites#getPosts')
.post('/create-post', 'sites#createPost')

.patch('/update-page', 'sites#updatePage')
.patch('/delete-page', 'sites#deletePage')
.post('/create-page', 'sites#createPage')

.post('/sign-up', 'users#signup')
.post('/sign-in', 'users#signin')
.delete('/sign-out/:id', 'users#signout')
.patch('/change-password/:id', 'users#changepw')
.resources('users', { only: ['index', 'show'] })

// all routes created
