import Governor from './Governor'
describe('Governor tests',()=>{
				test('Governor test with custom config',() => {
						const governor = new Governor({
							MODULES: process.cwd()+'/.git/super-modules'
						})
						const governorConfig = governor.getConfig()
						const {PREFIX}=governorConfig
						const temp = governor.getModulePaths().filter(modName => {
								return modName.indexOf(PREFIX) === 0
						})
						console.log(temp)
				})
})
