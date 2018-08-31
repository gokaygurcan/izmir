import Governor from './Governor';
describe('Governor tests', () => {
  test('Governor test with custom config', () => {
    const governor = new Governor();
		governor.loadPlugins()
  });
})
