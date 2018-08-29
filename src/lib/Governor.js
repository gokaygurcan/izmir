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
    getPlugins() {
        const {
            MODULES,
            PREFIX
        } = this.getConfig()
				
        const paths = fs.readdirSync(MODULES)
        		.filter(modPath => {
                return modPath.indexOf(PREFIX) === 0
            })
						.map(p => {
							return {
											path:path.resolve(`${MODULES}/${p}`),
											name:p
							}
						})
        return paths
    }
    loadPlugins() {
			this.getModulePaths.forEach(modulePath => {
								const p = path.resolve(`${MODULES}/${modulePath}/index.js`)
								if(!fs.existsSync(p)){
									throw new Error(`Module ${modulePath} does not have index.js as entry file!`)
								} else {
									require(p)()
								}
						})
		}
}

