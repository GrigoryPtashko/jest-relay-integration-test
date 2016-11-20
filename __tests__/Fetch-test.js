it('fetches data', async () => {
  const response = await fetch('http://hashnews.cfapps.io');

  // console.log('fetch response', response);

  const data = await response.text();

  expect(data).not.toBe(null);
});

