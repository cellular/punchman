test('browser', async () => {
  expect(global).toHaveProperty('browser');
  expect(global).toHaveProperty('open');
  expect(expect.pluginLoaded).toBeTruthy();
  const page = await open('/');
  expect(page.pluginLoaded).toBeTruthy();

  const input = await page.$('input[placeholder^=What]');
  await input.type('build a better mousetrap');
  await input.press('Enter');
});
