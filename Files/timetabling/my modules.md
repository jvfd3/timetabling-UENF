# What do I use and why?

## Removed from default

- @testing-library/jest-dom
- @testing-library/react
- @testing-library/user-event
- web-vitals

```bash
npm uninstall @testing-library/jest-dom @testing-library/react @testing-library/user-event web-vitals
```

## My modules

- react
- react-dom
- react-router-dom
- react-select
- axios
- react-toastify
- react-icons
- mui
  - @mui/material
  - @emotion/react
  - @emotion/styled
- depcheck
  - Globally

```bash
npm i react react-dom react-router-dom react-select axios react-toastify react-icons @mui/material @emotion/react @emotion/styled
```

```bash
npm install --save-dev @babel/plugin-proposal-private-property-in-object
```

It was throwing an erro when building:

> One of your dependencies, babel-preset-react-app, is importing the "@babel/plugin-proposal-private-property-in-object" package without declaring it in its dependencies. This is currently working because "@babel/plugin-proposal-private-property-in-object" is already in your node_modules folder for unrelated reasons, but it may break at any time.
>
> babel-preset-react-app is part of the create-react-app project, which is not maintianed anymore. It is thus unlikely that this bug will ever be fixed. Add "@babel/plugin-proposal-private-property-in-object" to your devDependencies to work around this error. This will make this message go away.

## Why?

- react
  - I learned react some time ago, not sure why, but that's it.
- react-dom
  - I don't even know what this is, but I need it to use react.
- react-router-dom
  - I need this to travel between pages. NextJS does it better.
- react-select
  - I need this to use select components.
- axios
  - I need this to make requests to the AWS API.
- react-toastify
  - I need this to show toast messages. That are small message cards that appear on the screen.
- react-icons
  - I need this to use pretty icons.
- mui
  - I need this to use the Material UI components. That are pre-made components that look good.
  - The other stuff are nedded to use MUI.
- depcheck
  - I need this to check if I'm using any module that I don't need anymore.
  - depcheck is a tool that checks for unused dependencies.
