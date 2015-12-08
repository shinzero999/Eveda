describe('I login with non-premium account, ', function(){  
    var email, password, signinWithEmailButton, createButton, signinButton;

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
                email.sendKeys('abc11@mailinator.com');
                password.sendKeys('123456');
                browser.sleep(1000);

                //Click sign in button
                signinButton.click();
            });
            
        });
    });

    describe('Then i click on upgrade button, ', function() {
        var phoneNumber, address, about, upgradeLabel, menuButton, upgradeButton;

        beforeEach(function() {
            //Get elements
            phoneNumber = element(by.model('phoneNumber'));
            address = element(by.model('address'));
            about = element(by.model('about'));

            upgradeLabel = element(by.css('[ng-show="!isPremium"]'));
            menuButton = element(by.xpath('html/body/ion-nav-view/ion-side-menus/ion-side-menu-content/ion-nav-bar/div[2]/ion-header-bar/div[3]/span/button[2]'));
            upgradeButton = element(by.xpath('html/body/div[5]/div[2]/ion-modal-view/ion-content[2]/div[1]/div[6]/div/button'));
        });

        it('I should see a successful popup and upgrade form is hidden if success', function() {
            menuButton.click().then(function() {
                browser.sleep(1000);
                upgradeLabel.click().then(function() {
                    browser.sleep(1000);

                    //Set text for input
                    phoneNumber.sendKeys('01225502878');
                    browser.sleep(1000);
                    address.sendKeys('45 Tran Phu - Nha Trang');
                    browser.sleep(1000);
                    about.sendKeys('Green hotel');

                    //Click upgrade button and expect result
                    upgradeButton.click().then(function() {
                        var popup = element(by.css('.popup-container.popup-showing.active'));
                        expect(popup.isDisplayed()).toBeTruthy();
                        var modal = element(by.css('.modal.slide-in-up.ng-leave.ng-leave-active'));
                        expect(modal.isDisplayed()).toBeFalsy();
                        browser.sleep(1000);
                    });
                });
            });
            
        });

        it('I should see an error popup if not fill all required input or error with validation', function() {
            menuButton.click().then(function() {
                browser.sleep(1000);
                upgradeLabel.click().then(function() {
                    browser.sleep(1000);

                    phoneNumber.sendKeys('');
                    browser.sleep(1000);
                    address.sendKeys('45 Tran Phu - Nha Trang');
                    browser.sleep(1000);
                    about.sendKeys('Green hotel');

                    upgradeButton.click().then(function() {
                        var popup = element(by.css('.popup-container.popup-showing.active'));
                        expect(popup.isDisplayed()).toBeTruthy();
                        browser.sleep(1000);
                    });
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