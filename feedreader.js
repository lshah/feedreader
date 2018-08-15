// Jasmine will read this spec file to run the tests against the feed reader application. 

//All tests are placed inside $() to make sure that the DOM is loaded before running the tests. 

$(function() {

 //Test suite 'RSS Feeds' verified that the allFeeds variable is defined and each feed has a URL and a name
 describe('RSS Feeds', () => {
  it('are defined', () => {
   expect(allFeeds).toBeDefined();
   expect(allFeeds.length).not.toBe(0);
  });


  //This test loops through all the feeds and makes sure they have a URL and the URL is not empty
  it('have URLs and URLs are not empty', () => {
   for (let feed of allFeeds) {
    expect(feed.url).toBeDefined();
    expect(feed.url.length).not.toBe(0);
   }
  });

  //This test loops through all the feeds and makes sure they have a name and the name is not empty
  it('have names and names are not empty', () => {
   for (let feed of allFeeds) {
    expect(feed.name).toBeDefined();
    expect(feed.name.length).not.toBe(0);
   }
  });
 });


 //Test suite 'The menu' verifies that the menu is hidden until it is clicked
 describe('The menu', () => {

  let body = document.querySelector('body');
  let menu = document.querySelector('.menu-icon-link');
  let clickCount = 0;
  let isMenuOpen = false;
  let spy;

  //This test checks that the menu is hidden by default

  it('is hidden by default', () => {
   expect(body.classList.contains('menu-hidden')).toBe(true);

  });

  //This test checks that the menu opens and closes when the menu button is clicked

  it('changes visibility on click', () => {
   menu.click();
   expect(body.className).not.toContain('menu-hidden');

   menu.click();
   expect(body.className).toContain('menu-hidden');
  });

 });

 //Test suite 'Initial Entries' verifies feed entries are displayed when the feeds are done loading
 describe('Initial Entries', () => {
  let feed = document.querySelector('.feed');
  let entries = document.querySelectorAll('.entry').length;

  beforeEach((done) => {
   loadFeed(0, done);;
  });


  //This test checks that there is at least one entry within the feed container after feeds have loaded
  it('has at least one entry when loadFeed is called', () => {
   expect(feed.querySelectorAll('.entry').length > 0).toBe(true);
  });

 });

 //Test suite 'New Feed Selection' verifies that the page content changes when a different feed is selected
 describe('New Feed Selection', () => {
  let feed = document.querySelector('.feed');
  let feedNumber = 0;
  let feed1Title;
  let feed2Title;

  beforeEach((done) => {
   loadFeed(feedNumber);
   feed1Title = document.querySelector('.feed').innerHTML;
   feedNumber++;
   done();
  });

  afterEach((done) => {
   loadFeed(feedNumber);
   feed2Title = document.querySelector('.feed').innerHTML;
   done();
  });


  //This test checks if the page title updates when a different feed is selected
  it('changes content', (done) => {
   expect(feed1Title).not.toEqual(feed2Title);
   done();
  });
 });

}());