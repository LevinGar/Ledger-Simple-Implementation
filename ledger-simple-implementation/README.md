# A Breakable Toy Experiment

## Requisites
-node and npm installed

Node: https://nodejs.org/en/download/
npm: npm install -g npm

-install npm packages
npm install

## How to use

### Commands:  
  register | r  
  balance | b  
  print | p  

### Flags:  
  -f, --file <path>      Provide file path  
  -s, --sort <sort>      Sort by date or description writing "date" or "desc" after the flag (default: null)  
  -p, --price_db <path>  Use the price_db of the commodity purchase for performing calculations. (default: null)  
  -h, --help             Get CLI commands information  

The arguments should be introduced in this order:  
node . <command> <flag> --file "file path"  

### Examples:  
  >node . balance --sort date --file files/Bitcoin.ledger  
  >node . register --sort desc --file files/Income.ledger  
  >node . print -f files/Bitcoin.ledger  

  In order of getting help run:  
> node . --help

  The flag "--file" is mandatory