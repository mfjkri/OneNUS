# OneNUS [22/23 CVWO Winter Assignment]

A webforum designed with simplicity in mind.

<br/>

# Project Status

This project is currently still in development.

- Starring of posts is not yet available
- Mobile support is still severely lacking

Last updated: 23/12/22

<br/>

# Demo

You can find the live version of this project [here](https://app.onenus.link).

## Backend

You can find the backend API that this project consumes [here](https://github.com/mfjkri/One-NUS-Backend).

## Screenshots

|                              |                                |
| :--------------------------: | :----------------------------: |
| ![Landing](docs/landing.jpg) |    ![Login](docs/login.jpg)    |
|   ![Posts](docs/posts.jpg)   | ![PostView](docs/postview.jpg) |

<br/>

# Building the project

## Prerequisites

1. `NodeJS`

   Install [NodeJS](https://nodejs.org/en/download/) if you have not done so yet.

2. `yarn`

   This project uses [`yarn`](https://classic.yarnpkg.com/lang/en/docs/install/) as the package manager instead of `npm`.

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
3. Install project dependencies.

   ```
   $ yarn install
   ```

4. Required config files.

   Create a dotenv file `.env` under the root directory with the following variables:

   ```python
   REACT_APP_API_URL: PRODUCTION_API_URL # Production API endpoint
   REACT_APP_LOCAL_API_URL: LOCAL_API_URL # Local testing API endpoint
   REACT_APP_API_MOCKING: false # Whether to use production or local API for local testing (in production mode it will use PRODUCTION_API_URL regardless)
   ```

5. Start test server.

   ```
   $ yarn start
   ```

6. All set!

   You can view the app at [localhost:3000](http://localhost:3000).

   _Note_: If there is already an application listening to the default port:3000, it will try and use another port. See your terminal for more info.

<br/>

# Table of Contents

- [OneNUS \[22/23 CVWO Winter Assignment\]](#onenus-2223-cvwo-winter-assignment)
- [Project Status](#project-status)
- [Demo](#demo)
  - [Backend](#backend)
  - [Screenshots](#screenshots)
- [Building the project](#building-the-project)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Table of Contents](#table-of-contents)
- [Technologies used](#technologies-used)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [State management](#state-management)
- [Features](#features)
- [Deployment](#deployment)
- [Reflection](#reflection)

<br/>

# Technologies used

- [ReactJS](https://reactjs.org/) with [Typescript](https://www.typescriptlang.org/)
- [Redux](https://redux.js.org/) - State management (`client-state`)
- [React Query](https://react-query-v3.tanstack.com/) - Data synchronization (`server-state`)
- [React Query Auth](https://github.com/alan2207/react-query-auth) - User authentication
- [Axios](https://axios-http.com/docs/intro) - HTTP Client
- [React Hook Form](https://react-hook-form.com/) - Form validation
- [Zod](https://zod.dev/) - Schema validation
- [TailwindCSS](https://tailwindcss.com/) - CSS Framework
- [Material Tailwind](https://www.material-tailwind.com/) - UI-Components library

- Misc:
  - [Dicebear Avatars](https://avatars.dicebear.com/) - User avatars
  - [Heroicons](https://heroicons.com/) - UI icons

<br/>

# Project Structure

This project uses a structure inspired by [bullet-proof-react](https://github.com/alan2207/bulletproof-react/) by [Alan Alickovic ](https://github.com/alan2207).

Read the full detailed explanation [here](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md).

All of the codebase resides in the [`src`](src/) directory.

Some key sub-directories in src are:

```sh
src
├── components # Shared components with reusable functionality (eg. Button, Link)
├── features   # Specific functionality related to a feature (eg. Auth, Post, Comment)
├── routes     # Global routing for the app (see Routes section for more information)
├── config     # Environment variables and global configuration values are exported and accessible here.
├── lib        # Preconfigured libraries used by the application
└── stores     # Global state store managed by Redux (see State management section for more information)
```

<br/>

# Routes

Routing in this project is managed by [`react-router-dom v6.4.5`](https://reactrouter.com/en/main).

Global routing is defined in [src/routes/index.tsx](src/routes/index.tsx) which splits routes into two categories:

- Public: Freely accessible (includes pages to login and register)
- Protected: Requires user authentication to access

Only routing _to_ the feature is handled here. Further sub-routing _within_ the feature are handled by the respective feature itself in `src/$FEATURENAME/routes/index.tsx`.

e.g. [`src/auth/routes/index.tsx`](src/features/auth/routes/index.tsx)

<br/>

# State management

- `client-state`

  Client-state in this project is managed using [`Redux`](https://redux.js.org/).

  Client-state in use are:

  - [`posts`](src/features/posts/slices/):
    - current page number
    - current sort option
    - current category filter
  - comments:
    - current page number
  - [`notifications`](src/components/Notifications/notificationSlices.ts)

- `server-state`

  Server-state in this project is managed using [`React Query v3`](https://react-query-v3.tanstack.com/).

  Server-state includes:

  - user authentication (further managed by [React Query Auth](https://github.com/alan2207/react-query-auth))
  - creating posts and comments (<ins>**C**</ins>RUD)
  - fetching posts and comments (C<ins>**R**</ins>UD)
  - updating posts and comments (CR<ins>**U**</ins>D)
  - deleting posts and comments (CRU<ins>**D**</ins>)

<br/>

# Features

There are 3 main features in this app.

- [`auth`](src/features/auth/) - User authentication (Login & Register)
- [`posts`](src/features/posts/) - Forum posts
- [`comments`](src/features/comments/) - Forum comments

Each feature follows the convention below:

- `api`: Handles any API calls made by the feature
- `components`: Contains any components used in this feature (Any non-specific or reusable components should go in [src/components/\*](src/components/))
- `routes`: Handles any sub-routing within the feature
- `slices`: Contains reducer logic and associated actions for any client-state of the feature.
- `types`: Defines any custom types used in this feature
- `index.ts`: Exports all required components or types that is used elsewhere (e.g. by other features)

Note that each subdirectory in this convention is optional and can be left out if not required by the feature (e.g. comments feature does not have a routes subdirectory as the feature has no subrouting within it)

<br/>

# Deployment

This app is deployed to an [AWS S3 bucket](https://aws.amazon.com/s3/) served using [Cloudfront](https://aws.amazon.com/cloudfront/) and [Route 53](https://aws.amazon.com/route53/).

Signed SSL certificates for the domain are provided by [AWS ACM](https://aws.amazon.com/certificate-manager/).

<br/>

# Reflection

...
