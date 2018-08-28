import Governor from './Governor'
test('Governor test',() => {
    const governor = new Governor()
    const governorConfig = governor.getConfig()
    const {PREFIX}=governorConfig
    
    const temp = governor.getModulePaths().filter(modName => {
        return modName.indexOf(PREFIX) === 0
    })
    console.log(temp)
})