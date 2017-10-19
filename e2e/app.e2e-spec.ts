import { VirginTrainPage } from './app.po';

describe('virgin-train App', function() {
  let page: VirginTrainPage;

  beforeEach(() => {
    page = new VirginTrainPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
