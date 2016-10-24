describe('My first test', () => {
  it('display default page title', () => {
    browser.get('https://angularjs.org/');

    let title = browser.getTitle();

    expect(title).toEqual('AngularJS — Superheroic JavaScript MVW Framework');
  });
});
