describe('Clicking on the signin button ', function(){  
    var email, password, signinWithEmailButton, createButton, signinButton;

    beforeEach(function() {
        browser.get('#/app/home');
        //Waiting for website to load
        browser.waitForAngular();
        //Get button
        createButton = element(by.id('fab-activity'));
        signinWithEmailButton = element(by.css('button.button-block.button-light'));
        browser.sleep(1000);
    });

    it('should display a popup for an unsuccessful login', function() {
        createButton.click().then(function() {
            browser.sleep(1000);
            signinWithEmailButton.click().then(function() {
                browser.sleep(1000);
                //Get email $ password input
                email = element(by.model('loginForm.email'));
                password = element(by.model('loginForm.password'));

                //Get sign in button
                signinButton = element(by.id('loginButton'));

                //Set text for email & password input
                email.sendKeys('abc@mailinator');
                password.sendKeys('123456');
                browser.sleep(1000);

                //Click sign in button & expect result
                signinButton.click().then(function() {
                    //browser.sleep(5000);
                    //expect(true).toBe(true);
                    var popup = element(by.css('.popup-container.popup-showing.active'));
                    expect(popup.isDisplayed()).toBeTruthy();
                    browser.sleep(1000);
                });
            });
            
        });
    });

    it('should validate the credentials for a successful login and close modal view', function() {
        createButton.click().then(function() {
            browser.sleep(1000);
            signinWithEmailButton.click().then(function() {
                browser.sleep(1000);
                email = element(by.model('loginForm.email'));
                password = element(by.model('loginForm.password'));

                signinButton = element(by.id('loginButton'));

                email.sendKeys('abc@mailinator.com');
                password.sendKeys('123456');
                browser.sleep(1000);

                signinButton.click().then(function() {
                    //browser.sleep(5000);
                    //expect(true).toBe(true);
                    var modal = element(by.css('.modal.slide-in-up.ng-leave.ng-leave-active'));
                    expect(modal.isDisplayed()).toBeFalsy();
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