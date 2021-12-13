const regexComments = new RegExp('[\#%|*].+')
const regexAccCurrency = new RegExp('[a-zA-z]{3}')
const regexMovType = new RegExp('\\-?\\$?\\d+\\.?\\d?.+')
const regexDate = new RegExp('\\d{4}\\/\\d{1,2}\\/\\d{1,2}')
const regexAccountDesc = new RegExp('[^\\-?\\$?\\d+\\.?\\d+$]+')
const regexTransDesc = new RegExp('[^\\d{4}\\/\\d{1,2}\\/\\d{1,2}]+')
const regexTransaction = new RegExp('/\\d{4}\\/\\d{1,2}\\/\\d{1,2} .+/')

function orderBy(parsed, sort) {
    //console.log(parsed[0])
    if (sort && (sort == 'desc' || sort == 'date') && parsed) {
        if (sort == 'date') {
            parsed.sort(function (a, b) {
                if (a.date > b.date)
                    return -1
                if (a.date < b.date)
                    return 1
                return 0;
            })
        } else {
            parsed.sort(function (a, b) {
                if (a.desc < b.desc)
                    return -1
                if (a.desc > b.desc)
                    return 1
                return 0;
            })
        }
    }
    return parsed
}

function parser(content, sort = null) {
    let lines = content.split('\n')
    let isTrans = false
    let parsed = []
    let trans = { accs: [] }
    let acc = {}
    let accumAmt = 0.0
    let mov = ""
    let amt = 0.0
    let ccy = ""
    lines.forEach((line, i) => {
        line = line.toString()
        if (!regexComments.test(line) && line !== '') {
            if (!regexTransaction.test(line) && !line.startsWith("!include")) {
                if (line.match(regexDate)) {
                    if (isTrans) {
                        parsed.push(trans)
                        trans = { accs: [] }
                        accumAmt = 0.0
                    }
                    isTrans = true
                    trans.date = regexDate.exec(line).toString()
                    trans.desc = regexTransDesc.exec(line).toString().trim()
                    return
                }
                if (isTrans) {
                    mov = line.match(regexMovType)
                    amt = mov ? mov.toString().replace('$', '') : null
                    mov && regexAccCurrency.test(mov) ?
                        ccy = regexAccCurrency.exec(mov).toString() : ccy = "USD"

                    acc.amt = amt ? parseFloat(amt) : - accumAmt
                    acc.desc = regexAccountDesc.exec(line).toString().trim()
                    acc.ccy = ccy
                    trans.accs.push(acc)
                    accumAmt += acc.amt
                    acc = {}
                }
                i === lines.length - 2 && parsed.push(trans)
            }
        }
    })
    return orderBy(parsed, sort)
}

module.exports = {
    parser
}
