# react-responsive-nav

Styling the navbar fonts:

```css
nav {
  font-family: 'Open Sans', sans-serif;
}
nav h1 {
  font-family: 'Catamaran', sans-serif;
  font-weight: 800;
}
```

---

# Development

`npm install` to install dev deps

`npm link` to make a link so you can import the module for testing locally (need to rebuild after changes)

`npm build` to build and update the deployed module

Create a new example app with create-react-app, then run `npm link react-responsive-nav`, from there you can import it and use it like any other module `import { Navbar } from "react-responsive-nav"`.

Run `npm run start` to begin watching changes during development, then in the secondary project (created with CRA) you can also run `npm run start` there, when you make changes you'll have hot reloading for both.
