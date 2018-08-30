import Governor from './Governor';
describe('Governor tests', () => {
  test('Governor test with custom config', () => {
    const governor = new Governor();
		governor.getInfo()
    const governorConfig = governor.getConfig();
    console.log(governor.getPlugins())
		governor.loadPlugins()
  });
});
