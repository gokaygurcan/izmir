import path from 'path'
import fs from 'fs'

export default class Governor {
    constructor(userConfig) {
				// Make sure module path is properly passed
				if(userConfig.MODULES) {
					userConfig.MODULES = path.resolve(userConfig.MODULES)
				}
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
			console.log(`${this.getModulePaths()} modules will be loaded`)
    }
}
