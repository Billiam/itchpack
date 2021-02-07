# Changelog

##`1.2.5` 2021-02-07

* Workaround for CSS errors causing full page reload, and breaking autoreload until error fixed and page fully reloaded manually.

## `1.2.4` 2021-01-31

* Remove duplicated `-h` command from CLI

## `1.2.2` 2021-01-16

* Workaround for webpack chained loading error when pug templates fail, etc.
* Fix error when HTML doesn't include a nested template
* Fix template downloading for game jams and profile pages
* Enable hot module reload
* Fix hot reloading breaking HTML/template/data reloading

## `1.2.0` 2021-01-15

* Support pug templates via `<include src="file.pug"></include>`
* Feed data to pug templates via `data.yml` or `data.json` file with live reload on change.
* Fix incorrect file size limit for base64 assets duing `build` command.
* Display build errors (but not detailed errors) in overlay

## `1.1.0` 2021-01-13

* Add CLI flag (`--no-minify`) to disable minification during `build` command
* Do not try to launch browser if operating under windows WSL (https://github.com/sindresorhus/open/issues/198)

## `1.0.2` 2021-01-13

Initial release