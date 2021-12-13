const sprintf = require("sprintf-js").sprintf

function balance(content) {
    let desc = ""
    let ccy = ""
    let amt = 0.0
    let keys = []
    let grp = {}
    let balObj = {}

    content.map((x) => {
        let movs = x.accs
        movs.map((mov) => {
            amt = mov.amt
            desc = mov.desc
            ccy = mov.ccy
            balObj.hasOwnProperty(desc) ? balObj[desc][0] += amt
                : balObj[desc] = [amt, ccy]
        })
    })
    keys = Object.keys(balObj)
    for (let key in (keys)) {
        ccy = balObj[keys[key]][1]
        grp.hasOwnProperty(ccy) ? grp[ccy] += balObj[keys[key]][0]
            : grp[ccy] = balObj[keys[key]][0]
    }
    for (let key in keys) {
        console.log(sprintf("%20s %5s", balObj[keys[key]][1] + " " + balObj[keys[key]][0], keys[key]))
    }
    console.log('-----------------------------')
    for (let key in grp) {
        grp.hasOwnProperty(key) && console.log(sprintf("%20s %5s", key, grp[key]))
    }
}

module.exports = { balance }
