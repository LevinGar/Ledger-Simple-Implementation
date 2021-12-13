const sprintf = require("sprintf-js").sprintf

function print(content, sort) {
    content.map((x) => {
        console.log(x.date+" "+x.desc)
        x.accs.map((acc) => {
            console.log(sprintf("%70s %30.2f", acc.desc, acc.amt))
        })
    })

}

module.exports = { print }
