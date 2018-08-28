import path from 'path'
import fs from 'fs'

export default class Governor {
    constructor(userConfig) {
        this.userConfig = userConfig
    }

    getConfig() {

        const defaultConfig = {
            PREFIX: 'super',
            MODULES: path.resolve(process.cwd(), 'node_modules'),
            PORT: 8080
        }

        // userConfig overwrites on defaults
        const config = Object.assign({}, defaultConfig, this.userConfig)
        return config
    }
    getModulePaths() {
        const {
            MODULES,
            PREFIX
        } = this.getConfig()

        const paths = fs.readdirSync(MODULES)
            .filter(modPath => {
                return modPath.indexOf(PREFIX) === 0
            })
        return paths
    }
    loadModules() {

    }
}