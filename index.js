const R2Adv = require('./R2D2Adventure')
const r2Adv = new R2Adv(100, 100)

const chalkAnimation = require('chalk-animation')

const availCmds = `Available commands: LAND, MOVE x, LEFT, RIGHT, REPORT, EXIT.`

function query(text) {
  if (text)
    process.stdout.write(`${text}\n`)

  process.stdout.write(`\n>`)

  process.stdin.once('data', data => {
    const cmd = data.toString().trim()

    if (cmd === 'EXIT')
      process.exit()
    else
      query(processCmd(...cmd.split(' ')))
  })
}

function processCmd(cmd, ...args) {
  switch (cmd) {
    case 'LAND':
      if (!r2Adv.isLanded)
        return r2Adv.land().report()

      break

    case 'MOVE':
      r2Adv.move(Number(args[0]) || 0)

      if (r2Adv.isReached) {
        setTimeout(process.exit, 3000)

        chalkAnimation.rainbow('Victory will be ours!');

        return 'You have successfully delivered Death Star plans to Obi Wan Kenobi!'
      }

      break

    case 'LEFT':
      r2Adv.rotate('left')
      break

    case 'RIGHT':
      r2Adv.rotate('right')
      break

    case 'REPORT':
      return r2Adv.report()

    default:
      return `Command not recognized. ${availCmds}`
  }

  return ''
}

query(`The year is 1977, Star Wars: A New Hope has just been released. The true hero of the film, R2-D2 has acquired Death Star plans and needs to deliver them to Obi Wan Kenobi on the surface of Tatooine to help ensure victory for the rebellion. The problem is that upon landing R2-D2 has lost all autonomy and needs your to help guide him safely to Obi Wan Kenobi through manual commands. \n\n${availCmds} \n\nEnter a command:`)
