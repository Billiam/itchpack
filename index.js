#!/usr/bin/env node

const chalk = require('chalk')
const sywac = require('sywac')

const cli = sywac.command('setup', {
  desc: 'Create templates from an Itch.io project, profile, or jam URL',
  setup: sywac => {
    sywac.positional('<url>', { paramsDesc: 'Project, profile, or jam URL' })
      .check((argv, ctx) => {
        if (argv.url) {
          try {
            const URL = require("url").URL
            const url = new URL(argv.url)
            if (! (/(^|\.)itch\.io$/.test(url.host) && ['https:', 'http:'].includes(url.protocol))) {
              ctx.cliMessage(chalk`{red ${argv.url} is not a valid itch.io url}`)
            }
          } catch(err) {
            ctx.cliMessage(chalk`{red ${argv.url} is not a valid url}`)
          }
        }
      })
  },
  run (argv, context) {
    require('./lib/template')(argv.url)
  }
}).command('serve', {
  desc: 'Run local development server',
  setup: sywac => {
    sywac.string(chalk`{green --host} {blue <hostname>}`, { desc: 'Development server host', defaultValue: '127.0.0.1' })
      .number(chalk`{green -p, --port} {blue <number>}`, { desc: 'Development server port', defaultValue: 1234 })
  },
  run (argv, context) {
    require('./lib/proxy').serve(argv.host, argv.port)
  }
}).command('build', {
  desc: 'Compile custom html and scss',
  setup: sywac => {
    sywac.boolean('--no-minify', {
      desc: 'Disable CSS and HTML minification',
      defaultValue: false
    })
  },
  run (argv, context) {
    require('./lib/proxy').build({ minify: !argv['no-minify'] })
  }
}).help('-h, --help')
  .style({
    flags: s => chalk.green(s),
    desc: s => chalk.white(s),
    hints: s => chalk.dim(s)
  })
  .version('-v, --version')
  .showHelpByDefault()
  .outputSettings({ maxWidth: 75 })

module.exports = cli

async function main () {
  cli.parseAndExit()
}

if (require.main === module) main()
