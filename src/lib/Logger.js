import {Signale} from 'signale'
const custom = new Signale({
    disabled: false,
    interactive: false,
    stream: process.stdout,
    scope: 'custom',
    types: {
        log: {
            badge: '**',
            color: 'blue',
            label: 'Log'
        },
        warn: {
            badge: '⚠️',
            color: 'yellow',
            label: 'Warning'
        },
        error: {
            badge: '❗️',
            color: `red`,
            label: `Error`
        }
    }
})
export default class Logger {
    static log(message) {
        custom.log(message)
    }
    static warn(message) {
        custom.warn(message)
    }
    static error(message) {
        custom.error(message)
    }
}