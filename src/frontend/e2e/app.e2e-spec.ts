import { FoglampappPage } from './app.po';

describe('foglampapp App', () => {
  let page: FoglampappPage;

  beforeEach(() => {
    page = new FoglampappPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
