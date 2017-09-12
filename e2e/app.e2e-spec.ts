import { TesteAngularPage } from './app.po';

describe('teste-angular App', function() {
  let page: TesteAngularPage;

  beforeEach(() => {
    page = new TesteAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
