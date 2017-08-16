import { FogLAMPPage } from './app.po';

describe('foglampapp App', () => {
  let page: FogLAMPPage;

  beforeEach(() => {
    page = new FogLAMPPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
