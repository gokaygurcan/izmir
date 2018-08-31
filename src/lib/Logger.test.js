import Logger from './Logger';

// Skipping test with .skip
describe.skip('Logger tests', () => {
  const logger = new Logger('Governor');
  test('Logger log', () => {
		logger.log('Lorem ipsum dolor sit amet')
  })
  test('Logger warn', () => {
		logger.warn('Lorem ipsum dolor sit amet')
  })
  test('Logger error', () => {
		logger.error('Lorem ipsum dolor sit amet')
  })
})