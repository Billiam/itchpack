# Itch Custom Builder

Preview and preprocessor for Itch.io game/profile/jam custom HTML and CSS.

## Features

* Fetch current page design, content and CSS as a starting point
* Preview HTML and CSS changes with live update
* Split and organize assets with `@import` and `<include src="myfile.html"></include>`
* Prepend HTML classes with `custom-`
* Preprocess SCSS
* CSS vendor autoprefixing
* Base64 encode small (<100kb) images and fonts in CSS
* Minify HTML and CSS

## Usage

1. Install the command globally `yarn global add itchpack`
2. In the directory where you'd like to manage your files, run: 
   `itchpack setup https://yourname.itch.io/yourproject`
3. Run `itchpack serve` to start the development server.
4. Edit your `custom.html` and `custom.scss` files. Preview will live-reload.
5. When done, run `itchpack build`, and copy the compiled content of `dist/custom.html` and `dist/custom.css`
 to your itch.io game page.
