# 📂 Project Structure

This project uses a structure inspired by [bullet-proof-react](https://github.com/alan2207/bulletproof-react/) by [Alan Alickovic ](https://github.com/alan2207).

Read the full detailed explanation [here](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md).

All of the codebase resides in the [`src`](src/) directory.

Some key sub-directories in src are:

```sh
src
├── components # Shared components with reusable functionality (eg. Button, Link)
├── features   # Specific functionality related to a feature (eg. Auth, Post, Comment)
├── routes     # Global routing for the app
├── config     # Environment variables and global configuration values are exported and accessible here.
├── lib        # Preconfigured libraries used by the application
└── stores     # Global client-state store managed by Redux
```

<br>

# 🌟 Features

There are 4 main features in this app.

- [`auth`](../src/features/auth/) - User authentication (Login & Register)
- [`posts`](../src/features/posts/) - Forum posts
- [`comments`](../src/features/comments/) - Forum comments
- [`users`](../src/features/users) - Forum users

Each feature follows a structure convention as follows:

- `api`: Handles any API calls made by the feature
- `components`: Contains any components used in this feature (Any non-specific or reusable components should go in [src/components/\*](../src/components/))
- `routes`: Handles any sub-routing within the feature
- `types`: Defines any custom types used in this feature
- `slice.ts`: Contains reducer logic and associated actions for any client-state of the feature.
- `index.ts`: Exports all required components or types that is used elsewhere (e.g. by other features)

Note that each subdirectory in this convention is optional and can be left out if not required by the feature (e.g. comments feature does not have a routes subdirectory as the feature has no subrouting within it)

<br>

# 🛣️ Routes

Routing in this project is managed by [`react-router-dom v6.4.5`](https://reactrouter.com/en/main).

Global routing is defined in [src/routes/index.tsx](../src/routes/index.tsx) which splits routes into two categories:

- Public: Freely accessible (includes pages to login and register)
- Protected: Requires user authentication to access

Only routing _to_ the feature is handled here. Further sub-routing _within_ the feature are handled by the respective feature itself in `src/$FEATURENAME/routes/index.tsx`.

e.g. [`src/auth/routes/index.tsx`](../src/features/auth/routes/index.tsx)

<br>

# 💾 State Management

- `client-state`

  Client-state in this project is managed using [`Redux`](https://redux.js.org/).

  Client-state in use are:

  - [`posts`](../src/features/posts/slice.ts):
    - current page number
    - current category filter
    - current sort option
    - current sort order (ascending / descending)
    - results per page
  - [`comments`](../src/features/comments/slice.ts):
    - current sort option
    - current sort order (ascending / descending)
    - results per page
  - [`notifications`](../src/components/Notifications/slice.ts)

- `server-state`

  Server-state in this project is managed using [`React Query v3`](https://react-query-v3.tanstack.com/).

  Server-state includes:

  - user authentication (further managed by [React Query Auth](https://github.com/alan2207/react-query-auth))
  - creating posts and comments (<ins>**C**</ins>RUD)
  - fetching posts and comments (C<ins>**R**</ins>UD)
  - updating posts and comments (CR<ins>**U**</ins>D)
  - deleting posts and comments (CRU<ins>**D**</ins>)

<br>
