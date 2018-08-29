import Governor from './Governor'
describe('Governor tests',()=>{
				test('Governor test with custom config',() => {
						const governor = new Governor({
							MODULES: process.cwd()+'/.git/super-modules'
						})
						const governorConfig = governor.getConfig()
						console.log(governor.getPlugins()) 
				})
})
