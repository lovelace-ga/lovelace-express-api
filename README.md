# Lovelace

[Lovelace](https://lovelace-ga.github.io/lovelace-client) is a full-stack
application created by [Sarah Adjorlolo](https://github.com/sadjorlolo), [Christa Cavallaro](https://github.com/cavallaroc9), and [Diana McNulty](https://github.com/dianamcnulty).
Both the [front-end repository](https://github.com/lovelace-ga/lovelace-client)
and the [back-end repository](https://github.com/lovelace-ga/lovelace-express-api)
are pinned to our collaborative GitHub account, [lovelace-ga](https://github.com/lovelace-ga).

This application can be found here: https://lovelace-ga.github.io/lovelace-client.

The back-end is deployed here: https://glacial-mountain-67409.herokuapp.com/.

## About the Application

The purpose of this application is to allow a user to sign in, create a blog
site with a name of their choosing, and create a series of blog posts and pages.
If the user is signed in, they have the ability to create, view, update, and
delete ONLY their own blog posts and pages. The ability for a user to delete
their own site, which will simultaneously delete all associated posts is also a capability of the application. A user is limited to having only one site at a
given time. Should the user delete their site, they will be able to create a
new one without issue. A user is authorized for these actions with a token upon
successful sign-in.

Posts and Pages created by a user are available to the public, but only the
user who owns the content is authorized to update or delete that content.

The application works through a series of back-end requests to a custom API.

### Lovelace-GA API Endpoints

| Verb   | URI Pattern            | Controller#Action   |
|:-------|:-----------------------|:--------------------|
| POST   | `/sign-up`             | `users#signup`      |
| POST   | `/sign-in`             | `users#signin`      |
| DELETE | `/sign-out/:id`        | `users#signout`     |
| PATCH  | `/change-password/:id` | `users#changepw`    |
| PATCH  | `/update-post`         | `sites#updatePost`  |
| PATCH  | `/deletepost`          | `sites#deletePost`  |
| POST   | `/create-post`         | `sites#createPost`  |
| PATCH  | `/update-page`         | `sites#updatePage`  |
| DELETE | `/delete-page`         | `sites#deletePage`  |
| POST   | `/create-page`         | `sites#createPage`  |
| POST   | `/sites`               | `sites#create`      |
| PATCH  | `/sites/:id`           | `sites#update`      |
| GET    | `/sites`               | `sites#index`       |
| GET    | `/sites/:id`           | `sites#show`        |
| DELETE | `/sites/:id`           | `sites#destroy`     |

## Development Process

The development process for this application began with designing the setup of
the back-end API. Originally, we planned to have three separate resources:
Sites, Posts, and Pages. Sites would have arrays of Posts and Pages available to
it by way of Object references. Ultimately, this approach did not allow us to
display or update the information as we had imagined. When a user deleted a post,
we could not delete the now-orphaned reference from the Object array. So instead,
we switched over to embedded documents using the original schemas created for
Posts and Pages.

No longer using the Posts and Pages resources, we changed the routes for the
CRUD actions to the Sites controller with custom names mentioned in the
endpoints table above. While the Sites CRUD actions were fairly straightforward,
the CRUD actions for pages and posts required us to find the Site based on
logged in user id to get the promise chain to work properly.

For testing and overall problem solving, we tested all actions through curl
requests to ensure Sites, Posts, and Pages could be added, viewed, updated, and
deleted from the database. We regularly used `mongo` and `nodemon` for testing
within the production environment.

The biggest struggle faced was updating an object located somewhere within the
Post or Pages embedded array. After getting the error `The #update method is not`
`available on EmbeddedDocument` a million times, a solution was found to not do
Site.find() to start the promise chain, but to run Site.findOneAndUpdate(),
which requires three arguments to work properly: a query for both the site and
the specific id of the post for update, a $set parameter which uses `$` as a placeholder for the position of the post within the array, and a callback
function for error handling.

## Technologies Used & Unsolved Problems

Technologies used for the back-end of the application include:
- MongoDB
- Express
- Mongoose
- Heroku for deployment

We do not have any unsolved problems related to the back-end for fixing in
future iterations.

## Entity Relationship Diagram

```
User : {
    id
    email
    password
}

Site : {
    id
    owner_id
    name
    blogposts: [{
        id
        owner_id
        title
        content
    }]
    pages: [{
        id
        owner_id
        title
        content
    }]
}
```
