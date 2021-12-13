const commander = require('commander')
const program = new commander.Command()
const fs = require("fs")
const parser = require('./controllers/parser.js')

program
  .option('-f, --file <path>', 'Provide file path')
  .action()

program
  .option('-s, --sort <sort>', 'Sort by date or description writing "date" or "desc" after the flag', null)
  .action()

  program
  .option('-p, --price_db <path>', 'Use the price_db of the commodity purchase for performing calculations.', null)
  .action()

program
  .command('register')
  .alias('r')
  .action(function () {
    ledgerFile(program.file, "register")
  })

program
  .command('balance')
  .alias('b')
  .action(function (arg) {
    ledgerFile(program.file, "balance")
  })

program
  .command('print')
  .alias('p')
  .action(function () {
    ledgerFile(program.file, "print")
  })

program
  .command('*')
  .action(function () {
    console.log('Error: Incorrect Command')
    console.log('Enter --help to get information about the available commands')
    process.exit()
  })

program
  .helpOption('-h, --help', 'Get CLI commands information')

try {
  program.parse(process.argv)
} catch (error) {
  console.log(error)
}



function fileValidator(path) {
  if (program.file !== undefined || path) {
    if (!fs.existsSync(path)) {
      console.log('Error: Incorrect file Path')
      process.exit()
    }
    if (path.split('.').pop() != 'ledger') {
      console.log('Please select a .ledger file')
      process.exit()
    }
  } else {
    console.log('\n Error: File path was not provided')
    console.log('Please enter the file path by using the flag "-f"')
    console.log('Example: <command> -f "folder/Bitcoin.ledger"')
    process.exit()
  }
}

function ledgerFile(path, cmd) {
  let sort = program.sort
  fileValidator(path)
  if (path && cmd) {
    fs.readFile(path, 'utf8', (error, cont) => {
      !cont && process.exit()
      let content = parser.parser(cont,sort)
      switch (cmd) {
        case "balance":
          const balanceCommand = require('./controllers/balance.js')
          balanceCommand.balance(content)
          break
        case "register":
          const registerCommand = require('./controllers/register.js')
          registerCommand.register(content)
          break
        case "print":
          const printCommand = require('./controllers/print.js')
          printCommand.print(content)
          break
      }
    })
    return path
  } else {
    return null
  }
}
