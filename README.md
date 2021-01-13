# Itchpack

Itchpack is a CLI compiler and preprocessor for custom HTML and CSS for 
Itch.io game, profile, and game jam pages.

Fetch your page content and styles, develop offline with developer-friendly
features like live preview, scss, css vendor autoprefixing.

[![asciicast](https://asciinema.org/a/384341.svg)](https://asciinema.org/a/384341?speed=2&autoplay=1)

## Features

* Fetch current page design, content and CSS as a starting point
* Preview HTML and CSS changes with live update
* Split and organize assets with `@import` and `<include src="myfile.html"></include>`
* Automatically prepend HTML classes with `custom-`
* Style with SCSS
* CSS vendor autoprefixing
* Base64 encode small (<100kb) images and fonts in CSS
* Minify HTML and CSS

## Installation

Install node and yarn (or npm)

Install the command globally: 

```
yarn global add itchpack
```

## Usage

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

Download current styles, page content, and a template from your Itch.io game, profile, or gamejam
page for local editing.

Creates the following files in the current directory:

* `template.html` a wrapper for your content used for previewing
* `custom.scss` your current styles (if any)
* `custom.html` your game's html content

#### arguments

`<url>` Url of your Itch.io game, profile, or gamejam page.

---

### `itchpack serve`

Start a local preview server with live reload and launch the default browser

#### options

`--port, -p` [optional] Server port (`default: 1234`)

---

### `itchpack build`

Generate `custom.html` and `custom.css` files in `dist` directory.

These can be copied back to itch.io.