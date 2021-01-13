# Itch Custom Builder

Preview and preprocessor for Itch.io game custom HTML and CSS.

## Features

* Preview with live update
* Prepend HTML classes with `custom-` and minify
* Preprocess SCSS
* CSS vendor autoprefixing
* Base64 encode CSS images

## Usage

1. Install the command globally `npm i -g <this-package>`
2. In the directory where you'd like to manage your files, run: 
   `<this-package> setup https://yourname.itch.io/yourproject`
3. Run `<this-package> serve` to start the development server.
4. Edit your `custom.html` and `custom.scss` files. Preview will live-reload.
5. When done, run `<this-package> build`, and copy the compiled content of `output/custom.html` and `output/custom.css`
 to your itch.io game page.
