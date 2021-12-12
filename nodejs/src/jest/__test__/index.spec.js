const showUserName = require('../index.js');

test('test user name', () => {
    const name = showUserName();
    expect(name).toBe('freedyc');
})