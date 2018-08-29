import path from 'path'
import fs from 'fs'

export default class Governor {
    constructor(userConfig) {
				// Initiate the config	
				this.config = {
					PREFIX:process.env.IZMIR_PREFIX || 'izmir',
					PORT:process.env.IZMIR_PORT || 8080,
					MODULES:process.env.IZMIR_MODULES || 'node_modules'
				}
		}
		getConfig() {
			return this.config
		}
    getPlugins() {
				const {
					MODULES,
					PREFIX
				} = this.config

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
			this.getPlugins.forEach(modulePath => {
								const p = path.resolve(`${MODULES}/${modulePath}/index.js`)
								if(!fs.existsSync(p)){
									throw new Error(`Module ${modulePath} does not have index.js as entry file!`)
								} else {
									require(p)()
								}
						})
		}
}

