# Itchpack

`itchpack` is a CLI compiler and preprocessor for custom HTML and CSS for 
Itch.io game, profile, and game jam pages.

Fetch your page content and styles, develop offline with developer-friendly
features like live preview, scss, css vendor autoprefixing, and data-driven templates.

[![asciicast](https://asciinema.org/a/384341.svg)](https://asciinema.org/a/384341?speed=2&autoplay=1)

## Features

* Fetch current page design, content and CSS directly from itch.io as your starting point
* Preview HTML and CSS changes in your browser with live update
* Split and organize assets with `@import` and `<include src="myfile.html"></include>`
* [optional] Generate your HTML with [pug](https://pugjs.org) templates, 
  populated from a data file (json or yaml). 
  Import them with `<include src="myfile.pug"></include>`
* Automatically prepend HTML classes with `custom-`, an itch requirement.
* Style with [SCSS](https://sass-lang.com/guide), allowing mixins, CSS variables, math operations etc.
* CSS vendor autoprefixing
* Base64 encode small (<100kb) images and fonts in CSS
* Minify HTML and CSS

## Installation

Install node and yarn (or npm).

Install the `itchpack` command globally: 

```
yarn global add itchpack
```

## Usage

`itchpack` is designed to create one css file and one html file in an output directory, which you can then copy to your
itch.io page.

It expects the following files in your working directory:

* `custom.html`: This is where you will add your page's HTML content. 
* `custom.scss`: This is where you will add your page's styles.
* `template.html`: The non-editable wrapper around your custom content. 
* (optional)`data.json` Or `data.yml`: Data in this file (one or the other) will be passed to your
pug templates, if any.

`template.html`, `custom.html`, and `custom.scss` will all be created for you automatically
by the [`setup`](#itchpack-setup) command, see below.

HTML files can include the directive `<include src="anotherfile.html"></include>` to import content from
another HTML file, or `<include src="anotherfile.pug"></include>` to import a pug template.

[Pug templates](https://pugjs.org) can use conditions and loops, can import other pug templates using 
their own syntax, and can render your data from a file (`data.yml` or `data.json` if available).

If you want to use pug templates exclusively, just add `<include src="myfile.pug"><include>` as the only 
content in `custom.html`.

This requirement may be removed in a future update.

## Command reference

```
$ itchpack [command] [options]
```

#### options

`--help, -h` Show help

`--version, -v`  Show current version

### Commands

### `itchpack setup`

```
$ itchpack setup <url>
```

Download current styles, page content, and a template from your Itch.io game, profile, or game jam
page for local editing.

Creates the following files in the current directory:

* `template.html` a wrapper for your content used for previewing
* `custom.scss` your current styles (may be empty)
* `custom.html` your page's html content

#### arguments

`<url>` Url of your Itch.io game, profile, or game jam page.

---

### `itchpack serve`

Start a local preview server with live reload and launch the default browser

#### options

`--port, -p` [optional] Server port (`default: 1234`)  
`--host, -h` [optional] Server host (`default: 127.0.0.1`)

---

### `itchpack build`

Generate `custom.html` and `custom.css` files in `dist` directory.

These can be copied back to itch.io.

#### options

`--no-minify` [optional] Disable minification of output HTML and CSS
