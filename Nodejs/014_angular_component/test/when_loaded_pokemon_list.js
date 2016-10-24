describe('When loaded pokemon list page', () => {
  it('display default page title', () => {
    browser.get('http://localhost:8000/app/#/pokemons');

    let title = browser.getTitle();

    expect(title).toEqual('Фреймворк AngularJS / Нетология');
  });
  it('list items equal 3', () => {
    browser.get('http://localhost:8000/app/#/pokemons');

    let pokemonItems = element.all(by.css('pokemon-list-item'));

    expect(pokemonItems.count()).toBe(3);
  });
  it('when click to list item go to edit page',() => {
    browser.get('http://localhost:8000/app/#/pokemons');

    let item = browser.findElement(by.css('a[area-label="TEST"]'));

    item.click();

    let titleForm = browser.findElement(by.css('md-card-header-text>span'));

    expect(titleForm.getText().toEqual('Покемон TEST'));
  });
});
