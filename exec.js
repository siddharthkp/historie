const execa = require('execa')
const chalk = require('chalk')
const ora = require('ora')

const spinner = ora()
spinner.color = 'yellow'

const print = ({ code, stdout, stderr }) => {
  let colors
  if (code === 1) {
    spinner.fail()
    colors = { out: chalk.red, err: chalk.red }
  } else {
    spinner.succeed()
    colors = { out: chalk.green, err: chalk.yellow }
  }

  console.log('\n' + colors.out(stdout))
  console.log('\n' + colors.err(stderr))
}

module.exports = command => {
  spinner.text = command
  spinner.start()

  execa
    .shell(command)
    .then(result => print(result))
    .catch(result => print(result))
}
