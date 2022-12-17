# CVWO Assignment Project

## TODO:

### Frontend:

1. ~~Landing page~~
2. ~~Sign up / Login page~~
3. ~~Mock data~~
4. ~~View list of Posts~~
5. ~~New post~~
6. ~~View post~~
   1. ~~Edit post~~
   2. ~~Delete post~~
7. ~~View comment~~
   1. ~~New comment~~
   2. ~~Edit comment~~
   3. ~~Delete comment~~

### Backend:

1. ~~Set up database models~~
2. ~~Authentication~~
   - ~~Login~~
   - ~~Register~~
   - ~~GetUser~~
3. ~~Posts~~
   - ~~GetPosts~~
   - ~~GetPostByID~~
   - ~~CreatePost~~
   - ~~UpdatePost~~
   - ~~DeletePost~~
4. ~~Comments~~
   - ~~GetCommentsFromPostID~~
   - ~~CreateComment~~
   - ~~UpdateComment~~
   - ~~DeleteComment~~

<br/>

# Table of Contents

- [CVWO Assignment Project](#cvwo-assignment-project)
  - [TODO:](#todo)
    - [Frontend:](#frontend)
    - [Backend:](#backend)
- [Table of Contents](#table-of-contents)
- [Pre-Requistes](#pre-requistes)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)

<br/>

# Pre-Requistes

1. NodeJS

   Install [NodeJS](https://nodejs.org/en/download/) if you have not done so yet.

2. yarn

   This project uses `yarn` as the package manager instead of `npm`. (Using npm instead will probably still work just fine but this isn't guaranteed)

   To install yarn head over to the official website [here](https://classic.yarnpkg.com/lang/en/docs/install/)

<br/>

# Getting Started

1. Clone this repo.
   ```
   $ git clone https://github.com/mfjkri/One-NUS.git
   ```
2. Change into the repo directory.
   ```
   $ cd One-NUS
   ```
3. Install project dependencies

   ```
   $ yarn install
   ```

4. Start test server.

   ```
   $ yarn start
   ```

5. All set!

   You can view the app at [localhost:3000](http://localhost:3000).

   _Note_: If there is an application already running at port 3000, it will try and use another port. See your terminal for more info.

6. Additional notes.

   You may want to create a dotenv file `.env` under the root directory with the following variables:

   1. REACT_APP_API_URL: `string` = API_URL
   2. REACT_APP_API_MOCKING: `boolean` = true / false

<br/>

# Project Structure

This project uses a structure inspired by [bullet-proof-react](https://github.com/alan2207/bulletproof-react/) by [Alan Alickovic ](https://github.com/alan2207).

Read the full detailed explanation [here](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md).

All of the codebase resides under [`src`](src/)

Some key sub-directories:

- [`src/components/`](src/components/) - Shared components with reusable functionality (eg. Button, Link)
- [`src/features/`](src/features/) - Components with specific functionality (eg. Auth, Post, Comment)
- [`src/routes`](src/routes/) - Routing for the app (see [src/routes/index.tsx](src/routes/index.tsx) for more information)
- [`src/config/`](src/config/) - Environment variables and global configuration values are exported and accessible here.
