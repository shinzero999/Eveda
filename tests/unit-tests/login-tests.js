describe('RootCtrl Login Unit test', function() {

    var controller, 
        scope,
        data,
        ionicPopup;

    beforeEach(function() {
        module('EvedaApp');
        
        // Provide will help us create fake implementations for our dependencies
        module(function($provide) {
        
          // Fake data Implementation returning a promise
          $provide.value('data', {
            get: function() {
              return { 
                then: function(callback) {return callback([{ success: true }]);}
              };
            },
            post: function() {
              return { 
                then: function(callback) {return callback([{ success: true }]);}
              };
            },
          });
          
          return null;
        });
    });

    // instantiate the controller and mocks for every test
    beforeEach(inject(function($controller, $rootScope, _data_) {  
        scope = $rootScope.$new();

        data = _data_;

        // mock $ionicPopup
        ionicPopup = jasmine.createSpyObj('$ionicPopup spy', ['alert']);

        // instantiate LoginController
        controller = $controller('RootCtrl', { 
                        '$ionicPopup': ionicPopup, 
                        '$scope': scope
                    });
    }));

    it('should post data (object)', inject(function($http, $httpBackend) {

        var success;

        /* Code Under Test */
        $http.post('http://localhost/eveda/eveda-web/' + 'login', { 
            'email': 'abc@mailinator.com', 
            'password': '123456'
        }).then(function(result) {
            success = result.data.success;
        });
        /* End Code */


        $httpBackend
          .when('POST', 'http://localhost/eveda/eveda-web/' + 'login', { 
            'email': 'abc@mailinator.com', 
            'password': '123456'
          })
          .respond({ 
            success: true
          });


       // $httpBackend.flush();

        expect(success).toEqual(true);

    }));

    it("should call the store service to retrieve the store list", function() {
        // Jasmine spy over the data service. 
        // Since we provided a fake response already we can just call through. 
        spyOn(data, 'post').and.callThrough();
        spyOn(data, 'get').and.callThrough();
        
        // Since we setup a spy we can now expect that spied function to have been called 
        // or to have been called with certain parameters..etc
        scope.login('abc@mailinator', '123456');
        //expect(ionicPopup.alert).toHaveBeenCalled();
        expect(data.post).toHaveBeenCalled();
    });

    describe('doLogin', function() {
        var testCases = [
            {email: '', password: ''},
            {email: 'abc@mailinator.com', password: '123456'}
        ];

        for(var user in testCases) {
            (function(userInfo) {
                it('if email & password is blank, should show a popup', function() {
                    scope.login(userInfo.email, userInfo.password);
                    expect(ionicPopup.alert).toHaveBeenCalled();
                    //expect(scope.user).not.toBeNull();
                });
            })(user);
        }

        /*it('if email & password is blank, should show a popup', function() {
            scope.login('', '');
            //expect(ionicPopup.alert).toHaveBeenCalled();
            //expect(scope.user).not.toBeNull();
        });

        it('if email & password is blank, should show a popup', function() {
            scope.login('', null);
            expect(ionicPopup.alert).toHaveBeenCalled();
        });

        it('if email & password is blank, should show a popup', function() {
            scope.login(null, '');
            //expect(ionicPopup.alert).toHaveBeenCalled();
        });

        it('if email & password is blank, should show a popup', function() {
            scope.login(null, null);
            //expect(ionicPopup.alert).toHaveBeenCalled();
            expect(scope.user).toBeDefined();
        });*/

        /*it('if email & password is blank, should show a popup', function() {
            scope.login('abc@mailinator', '123456');
            //expect(scope.user).not.toBeNull();
            expect(ionicPopup.alert).toHaveBeenCalled();
        });*/

        /*describe('when the login is executed,', function() {
            it('if successful, should define new user', function() {

                expect(scope.user).toBeDefined();
            });

            it('if unsuccessful, should show a popup', function() {

                expect(ionicPopup.alert).toHaveBeenCalled();
            });
        });*/

    });
});