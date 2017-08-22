# Type-safe TODO list app in TypeScript + React + Redux 

A Type-safe TODO list application written in TypeScript following by the wonderful lessons of [egghead.io](https://egghead.io/).

## egghead.io Redux lessons

This repository is TypeScript version of the lessons bellow.

https://egghead.io/courses/getting-started-with-redux


## How to run

```sh
$ cd <this-repo>
$ npm install
$ npm start
```

Then, go to http://localhost:8080.

## How to build .html file and bundle.js

```sh
$ cd <this-repo>
$ npm install
$ npm run build
```

Then, you can open `./build/index.html` by your browser.


## Main technologies

* TypeScript
* React
* Redux
* webpack


## Type safety

`Filter`, for example, is seems to be just string.
But only `'SHOW_ALL'`, `'SHOW_ACTIVE'` and `'SHOW_COMPLETED''` are acceptable as `Filter` because `Filter` type is defined bellow. 

```ts
type Filter = 'SHOW_ALL' | 'SHOW_ACTIVE' | 'SHOW_COMPLETED';
```

Because of this feature, we can use string more relax without considering typo.

.tsx bellow is valid. 

```tsx
<FilterLink filter={'SHOW_ALL'}>All</FilterLink>
``` 

But, the mistake bellow will be detected at compile time. Good!

```tsx
<FilterLink filter={'SHO_ALL'}>All</FilterLink>
```

This is only just one example. Almost things are typed, and some human errors can be detected at compile time. 

