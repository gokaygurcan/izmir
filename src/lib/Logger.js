import chalk from 'chalk'
export default class Logger {
    constructor(broadcaster) {
        this.broadcaster = broadcaster
    }
    log (message) {
        const head = chalk.bgGreen.black(` ${this.broadcaster} : `)
        const body = chalk.bgWhite.black(` ${message}`)
        console.log(`${head}${body}`)
    }
    warn (message) {
        const head = chalk.bgYellow.black(` ${this.broadcaster} (Warning!): `)
        const body = chalk.bgWhite.black(` ${message}`)
        console.log(`${head}${body}`)
    }
    error (message) {
        const head = chalk.bgRed.black(` ${this.broadcaster} (Error!): `)
        const body = chalk.bgWhite.black(` ${message}`)
        console.log(`${head}${body}`)
    }
}