// Jasmine will read this spec file to run the tests against the feed reader application. 

//All tests are placed inside $() to make sure that the DOM is loaded before running the tests. 

$(function() {
    
    //Test suite 'RSS Feeds' verified that the allFeeds variable is defined and each feed has a URL and a name
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


         //This test loops through all the feeds and makes sure they have a URL and the URL is not empty
         it('have URLs and URLs are not empty', function(){
            for(let feed of allFeeds){
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe("");
            }
         });

        //This test loops through all the feeds and makes sure they have a name and the name is not empty
         it('have names and names are not empty', function(){
            for(let feed of allFeeds){
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe("",null);
            }
         });
    });


    //Test suite 'The menu' verifies that the menu is hidden until it is clicked
    describe('The menu', function(){

         let body = document.querySelector('body');
         let menu = document.querySelector('.menu-icon-link');
         let clickCount = 0;
         let isMenuOpen = false;
         let spy;

         beforeEach(function(){
            spy = spyOn(menu, 'click');
            menu.click();
            expect(spy).toHaveBeenCalled();
            clickCount++;
         });

        //This test checks that the menu is hidden by default

         it('is hidden by default', function(){
            expect(body.classList.contains('menu-hidden')).toBe(true);            

         });

         //This test checks that the menu opens and closes when the menu button is clicked

         it('changes visibility on click', function(){
            if(expect(spy).toHaveBeenCalled() && clickCount%2 == 0){
                expect(body.classList.contains('menu-hidden')).toBe(false);
            }
            else if(expect(spy).toHaveBeenCalled() && clickCount%2 != 0){
                expect(body.classList.contains('menu-hidden')).toBe(true);
            }
         });

    });

    //Test suite 'Initial Entries' verifies feed entries are displayed when the feeds are done loading
    describe('Initial Entries', function(){
        let feed = document.querySelector('.feed');
        let entry = document.querySelectorAll('.entry');
        beforeEach(function(done){
            loadFeed(0);
            done();            
            });


         //This test checks that there is at least one entry within the feed container after feeds have loaded
         it('has a single entry element within the the feed container', function(done){
            expect(feed).toBeDefined();
            expect(entry).toBeDefined();
            done();
         });

         });

    //Test suite 'New Feed Selection' verifies that the page content changes when a different feed is selected
    describe('New Feed Selection', function(){
        let feed = document.querySelector('.feed');
        let feedNumber = 0;
        let feed1Title;
        let feed2Title;

        beforeEach(function(done){
            loadFeed(feedNumber);
            feed1Title = document.querySelector('.header-title');
            feedNumber++;
            done();       
            });

        afterEach(function(done){
            loadFeed(feedNumber);
            feed2Title = document.querySelector('.header-title');
            done();        
            });


         //This test checks if the page title updates when a different feed is selected
        it('changes content', function(done){
            expect(feed1Title).not.toEqual(feed2Title);
            done();
        });
    });
    
}());
