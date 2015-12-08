describe('I login as a user, ', function(){  
    var email, password, signinWithEmailButton, createButton, signinButton;

    var scrollIntoView = function (element) {
        arguments[0].scrollIntoView();
    };

    beforeEach(function() {
        browser.get('#/app/home');
        //Waiting for website to load
        browser.waitForAngular();
        //Get button
        createButton = element(by.id('fab-activity'));
        signinWithEmailButton = element(by.css('button.button-block.button-light'));
        createButton.click().then(function() {
            browser.sleep(1000);
            signinWithEmailButton.click().then(function() {
                browser.sleep(1000);
                //Get email & password input
                email = element(by.model('loginForm.email'));
                password = element(by.model('loginForm.password'));

                //Get sign in button
                signinButton = element(by.id('loginButton'));

                //Set text for email & password input
                email.sendKeys('abc@mailinator.com');
                password.sendKeys('123456');
                browser.sleep(1000);

                //Click sign in button
                signinButton.click();
            });
            
        });
    });

    describe('Then i click on create event button, ', function() {
        var title, location, startDate, endDate, visibilityDrop, regionDrop, genreDrop, url, notes, saveButton;

        beforeEach(function() {
            //Get elements
            title = element(by.model('event.title'));
            location = element(by.model('event.location'));
            startDate = element(by.model('event.startDate'));
            endDate = element(by.model('event.endDate'));
            visibilityDrop = element(by.model('event.visibility'));
            regionDrop = element(by.model('event.region'));
            genreDrop = element(by.model('event.genre'));
            url = element(by.model('event.url'));
            notes = element(by.model('event.notes'));

            //Get button save event
            saveButton = element(by.id('create-event'));
        });

        it('I should see a successful popup and creating event form is hidden for a successful event', function() {
            createButton.click().then(function() {
                browser.sleep(1000);

                //Set text for input
                title.sendKeys('Food contest');
                browser.sleep(1000);
                location.sendKeys('Nha Trang palace hotel');
                browser.sleep(1000);
                startDate.sendKeys('12/09/2015');
                browser.sleep(1000);
                endDate.sendKeys('12/12/2015');
                browser.sleep(1000);
                visibilityDrop.sendKeys('Public');
                browser.sleep(1000);

                //Scroll page to an element
                browser.executeScript(scrollIntoView, regionDrop.getWebElement());

                regionDrop.sendKeys('Khánh Hòa');
                browser.sleep(1000);
                genreDrop.sendKeys('Tiệc');
                browser.sleep(1000);
                url.sendKeys('https://www.google.com');
                browser.sleep(1000);
                notes.sendKeys('For more infomation, please visit website');

                //Click save button & expect result
                saveButton.click().then(function() {
                    browser.sleep(1000);

                    var popup = element(by.css('.popup-container.popup-showing.active'));
                    expect(popup.isDisplayed()).toBeTruthy();
                    var modal = element(by.css('.modal.slide-in-up.ng-leave.ng-leave-active'));
                    expect(modal.isDisplayed()).toBeFalsy();
                    browser.sleep(1000);
                });
                
            });
        });

        it('I should see an error popup for a unsuccessful event', function() {
            createButton.click().then(function() {
                browser.sleep(1000);

                title.sendKeys('');
                browser.sleep(1000);
                location.sendKeys('Nha Trang palace hotel');
                browser.sleep(1000);
                startDate.sendKeys('12/09/2015');
                browser.sleep(1000);
                endDate.sendKeys('12/08/2015');
                browser.sleep(1000);
                visibilityDrop.sendKeys('Public');
                browser.sleep(1000);

                //Scroll page to an element
                browser.executeScript(scrollIntoView, regionDrop.getWebElement());

                regionDrop.sendKeys('Khánh Hòa');
                browser.sleep(1000);
                genreDrop.sendKeys('Tiệc');
                browser.sleep(1000);
                url.sendKeys('https://www.google.com');
                browser.sleep(1000);
                notes.sendKeys('For more infomation, please visit website');

                saveButton.click().then(function() {
                    browser.sleep(1000);

                    var popup = element(by.css('.popup-container.popup-showing.active'));
                    expect(popup.isDisplayed()).toBeTruthy();
                    browser.sleep(1000);
                });
                
            });
        });
    });

    afterEach(function () {
        //Clear local storage
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
    });
});