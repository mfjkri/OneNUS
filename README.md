# CVWO Assignment Project

# Table of Contents

- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Pre-Requistes](#pre-requistes)
  - [Installation](#installation)
- [Project Structure](#project-structure)

<br/>

# Demo

You can find the live version of this project [here](http://onenus.s3-website-ap-southeast-1.amazonaws.com/).

<br/>

# Technologies Used

- Frontend: [Typescript](https://www.typescriptlang.org/)
  - [ReactJS](https://reactjs.org/)
  - [React Query](https://react-query-v3.tanstack.com/) - Data synchronization
  - [React Query Auth](https://github.com/alan2207/react-query-auth) - User authentication
  - [Axios](https://axios-http.com/docs/intro) - HTTP Client
  - [TailwindCSS](https://tailwindcss.com/) - CSS Framework
  - [React Hook Form](https://react-hook-form.com/) - Form validation
  - [Zod](https://zod.dev/) - Schema validation
  -
- Backend: [Go](https://go.dev/)

  - [Gin](https://gin-gonic.com/) - Web Framework
  - [Gorm](https://gorm.io/) - ORM library

- Misc:
  - [Dicebear Avatars](https://avatars.dicebear.com/) - User avatars
  - [Heroicons](https://heroicons.com/) - UI icons

<br/>

# Getting Started

## Pre-Requistes

1. `NodeJS`

   Install [NodeJS](https://nodejs.org/en/download/) if you have not done so yet.

2. `yarn`

   This project uses [`yarn`](https://classic.yarnpkg.com/lang/en/docs/install/) as the package manager instead of `npm`. (Using npm will probably still work just fine but it isn't guaranteed)

<br/>

## Installation

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

   1. REACT_APP_API_URL: `string` = API_URL (This is the access link to the backend server)
   2. REACT_APP_API_MOCKING: `boolean` = true / false (Whether to use API_URL or localhost for testing purposes)

<br/>

# Project Structure

This project uses a structure inspired by [bullet-proof-react](https://github.com/alan2207/bulletproof-react/) by [Alan Alickovic ](https://github.com/alan2207).

Read the full detailed explanation [here](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md).

All of the codebase resides in the [`src`](src/) directory.

Some key sub-directories in src are:

- [`src/components/`](src/components/) - Shared components with reusable functionality (eg. Button, Link)
- [`src/features/`](src/features/) - Components with specific functionality (eg. Auth, Post, Comment)
- [`src/routes`](src/routes/) - Routing for the app (see [src/routes/index.tsx](src/routes/index.tsx) for more information)
- [`src/config/`](src/config/) - Environment variables and global configuration values are exported and accessible here.
