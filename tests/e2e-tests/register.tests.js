describe('Clicking on the signup button ', function(){  
    var email, password, displayName, signupFormButton, createButton, signupButton;

    beforeEach(function() {
        browser.get('#/app/home');
        //Waiting for website to load
        browser.waitForAngular();
        //Get button
        createButton = element(by.id('fab-activity'));
        signupFormButton = element(by.id('signupFormButton'));
        browser.sleep(1000);
    });

    it('should display a popup for an unsuccessful register', function() {
        createButton.click().then(function() {
            browser.sleep(1000);
            signupFormButton.click().then(function() {
                browser.sleep(1000);
                //Get email & password input
                email = element(by.model('registerForm.email'));
                password = element(by.model('registerForm.password'));
                displayName = element(by.model('registerForm.displayname'));

                //Get sign in button
                signupButton = element(by.id('registerButton'));

                //Set text for email & password input
                email.sendKeys('abc');
                password.sendKeys('123456');
                displayName.sendKeys('abc')
                browser.sleep(1000);

                //Click sign in button & expect result
                signupButton.click().then(function() {
                    //browser.sleep(5000);
                    //expect(true).toBe(true);
                    var popup = element(by.css('.popup-container.popup-showing.active'));
                    expect(popup.isDisplayed()).toBeTruthy();
                    browser.sleep(1000);
                });
            });
            
        });
    });

    it('should validate the credentials for a successful register and close modal view', function() {
        createButton.click().then(function() {
            browser.sleep(1000);
            signupFormButton.click().then(function() {
                browser.sleep(1000);
                email = element(by.model('registerForm.email'));
                password = element(by.model('registerForm.password'));
                displayName = element(by.model('registerForm.displayname'));

                signupButton = element(by.id('registerButton'));

                email.sendKeys('abc12@mailinator.com');
                password.sendKeys('123456');
                displayName.sendKeys('abc12')
                browser.sleep(1000);

                signupButton.click().then(function() {
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