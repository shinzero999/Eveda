exports.config = {  
        capabilities: {
            'browserName': 'chrome',
           /* 'chromeOptions': {                
                args: ['--disable-web-security']
            } */
        },
        baseUrl: 'http://localhost:8100',
        specs: [
            //'e2e-tests/**/*.tests.js'
            'e2e-tests/create-event.tests.js',
            'e2e-tests/upgrade.tests.js',
        ],
        jasmineNodeOpts: {
            isVerbose: true,
        },
        //onPrepare: function() { browser.driver.manage().window().maximize(); },
};