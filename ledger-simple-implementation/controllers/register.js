const sprintf = require("sprintf-js").sprintf

function register(content, sort) {
    let grp = {}
    let amt = 0.0
    let desc = ""
    let date = ""
    let ccy = ""

    content.map((x) => {
        desc = x.desc
        date = x.date.replace('/', '-')
        date = date.replace('/', '-')
        console.log(date + " " + desc)
        let movs = x.accs
        movs.map((mov) => {
            desc = mov.desc
            ccy = mov.ccy
            amt = mov.amt
            grp.hasOwnProperty(ccy) ? grp.ccy += amt
                : grp.ccy = amt
            console.log(sprintf("%50s %10s %1.2f %20s %1.2f", desc, ccy, amt, ccy, grp.ccy))
        })
        var total = 0
        movs.forEach(e => {
            if (e.amt)
                total = total + e.amt
        });
        // console.log(grp.ccy)
        for (let group in grp) {
            console.log(sprintf("%88s %1.2f", 'Currency', total))
        }
    })
}

module.exports = {
    register
}
