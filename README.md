# Itch Custom Builder

Preview and preprocessor for Itch.io game custom HTML and CSS.

## Features

* Preview with live update
* Prefix HTML classes with `custom-` and minify
* Preprocess SCSS

## Usage

1. Clone repository
2. Install dependencies with yarn: `yarn install`
3. [optional] Update `template_vars.json` with your game and user information.
4. Update the `--itchio_` css variables in `template.html` to match yours
5. Run `yarn dev` and visit `localhost:1234`
6. Make edits to `game.html` and `game.scss`
7. When finished, run `yarn build` and copy the output of
   `dist/game.html` and `dist/game.css` to your itch page.