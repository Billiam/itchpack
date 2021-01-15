# Changelog

## `1.2.0` 2020-01-15

* Support pug templates via `<include src="file.pug"></include>`
* Feed data to pug templates via `data.yml` or `data.json` file with live reload on change.
* Fix incorrect file size limit for base64 assets duing `build` command.
* Display build errors (but not detailed errors) in overlay

## `1.1.0` 2020-01-13

* Add CLI flag (`--no-minify`) to disable minification during `build` command
* Do not try to launch browser if operating under windows WSL (https://github.com/sindresorhus/open/issues/198)

## `1.0.2` 2020-01-13

Initial release