EvedaApp.controller('RootCtrl', ['$scope', '$rootScope', 'data', '$localStorage', '$ionicPopover', '$ionicModal', '$ionicSideMenuDelegate', '$ionicLoading', '$ionicPopup', '$state', '$timeout', '$ionicScrollDelegate', '$http', 
	function($scope, $rootScope, data, $localStorage, $ionicPopover, $ionicModal, $ionicSideMenuDelegate, $ionicLoading, $ionicPopup, $state, $timeout, $ionicScrollDelegate, $http) {
		$scope.mode = 'list';
		
		$scope.user = $localStorage.getObject('login');

		//$scope.isPremium = $localStorage.get('isPremium', false);
		if ($localStorage.get('isPremium', false) == "true") {
		    $scope.isPremium = true;
		}
		else{
			$scope.isPremium = false;
		}
		
		$scope.genres = $localStorage.getObject('list-genres');
		$scope.imageData = null;

		$scope.regions = $localStorage.getObject('list-regions');
		$scope.regionName = $localStorage.get('region', 'TP.HCM');

		$scope.event = {
			title: null,
			location: null,
			startDate: moment().toDate(),
			startTime: moment().add(1, 'hours').minute(0).second(0).millisecond(0).toDate(),
			endDate: moment().toDate(),
			endTime: moment().add(2, 'hours').minute(0).second(0).millisecond(0).toDate(),
			visibility: null,
			region: null,
			genre: null,
			url: null,
			notes: null
		};

		$scope.$on('$ionicView.enter', function(){
	      	$ionicSideMenuDelegate.canDragContent(false);
	    });

		$timeout(function () {
            document.getElementById('fab-activity').classList.toggle('on');
        }, 200);

	    $scope.setRegions = function() {
	    	data.get('site/get-regions').then(function(result) {
	    		$scope.regions = result.data;
	    		$localStorage.setObject('list-regions', result.data);
			});
	    };

	    $scope.setGenres = function() {
	    	data.get('site/get-genres').then(function(result) {
		    	$scope.genres = result.data;
		    	$localStorage.setObject('list-genres', result.data);
			});
	    };

	    $scope.setIsPremium = function() {
	    	if ($scope.user != null) {
		    	data.post('site/is-premium', {
		    		'id': $scope.user.id
			    }).then(function(result) {
			    	if (result.success) {
			    		$scope.isPremium = result.data;
			    		$localStorage.set('isPremium', result.data);
					}
				}); 
			} else {
				$scope.isPremium = false;
			    $localStorage.set('isPremium', false);
			}
	    };

		//Loading
		$scope.showLoading = function(message) {
	      $ionicLoading.show({
	        template: message
	      });
	    };
	    $scope.hideLoading = function() {
	      $ionicLoading.hide();
	    };

		//Change mode in login modal
		$scope.changeModeToLoginEmail = function() {
			$scope.mode = 'email';
		};

		$scope.changeModeToList = function() {
			$scope.mode = 'list';
		};

		$scope.changeModeToRegister = function() {
			$scope.mode = 'register';
		};

		//Sort pop over
		$ionicPopover.fromTemplateUrl('templates/sort-template.html', {
	    	scope: $scope
	    }).then(function(popover) {
	      	$scope.popover = popover;
	    });

	    $scope.openPopover = function($event) {
	      	$scope.popover.show($event);
	    };
	    $scope.closePopover = function() {
	      	$scope.popover.hide();
	    };

	    //List region modal
	    $ionicModal.fromTemplateUrl('templates/list-regions-modal.html', {
			scope: $scope,
		    animation: 'slide-in-down'
	  	}).then(function(modal) {
	   		$scope.regionsModal = modal;
	  	});

	  	$scope.openRegionsModal = function() {
			$scope.regionsModal.show();
		};

		$scope.closeRegionsModal = function() {
			$scope.regionsModal.hide();
		};

		//Login modal
	  	$ionicModal.fromTemplateUrl('templates/login-modal.html', {
			scope: $scope,
		    animation: 'slide-in-up'
	  	}).then(function(modal) {
	   		$scope.loginModal = modal;
	  	});

	  	$scope.openLoginModal = function() {
	  		$scope.loginForm = {};
	  		$scope.registerForm = {};
			$scope.loginModal.show();
		};

		$scope.closeLoginModal = function() {
			$scope.loginModal.hide();
		};

		//Create event modal
		$ionicModal.fromTemplateUrl('templates/create-event-modal.html', {
			scope: $scope,
		    animation: 'slide-in-up'
	  	}).then(function(modal) {
	   		$scope.createEventModal = modal;
	  	});

	  	$scope.openCreateEventModal = function() {
	  		if ($scope.user == null) {
	  			$scope.loginModal.show();
			} else {
				//reset form
				$scope.event = {
					title: null,
					location: null,
					startDate: moment().toDate(),
					startTime: moment().add(1, 'hours').minute(0).second(0).millisecond(0).toDate(),
					endDate: moment().toDate(),
					endTime: moment().add(2, 'hours').minute(0).second(0).millisecond(0).toDate(),
					visibility: null,
					region: null,
					genre: null,
					url: null,
					notes: null
				};
				$scope.createEventModal.show();

				if (!$scope.isPremium) {
					document.getElementById("public").disabled = true;
				} else {
					document.getElementById("public").disabled = false;
				}
			} 
		};

		$scope.closeCreateEventModal = function() {
			$scope.createEventModal.hide();
		};

		//Upgrade account modal
	  	$ionicModal.fromTemplateUrl('templates/upgrade-account-modal.html', {
			scope: $scope,
		    animation: 'slide-in-up'
	  	}).then(function(modal) {
	   		$scope.upgradeModal = modal;
	  	});

	  	$scope.openUpgradeModal = function() {
	  		$scope.upgradeForm = {};
			$scope.upgradeModal.show();
		};

		$scope.closeUpgradeModal = function() {
			$scope.upgradeModal.hide();
		};

		$scope.checkLogin = function() {
			if ($scope.user == null) {
				//user not logged in
				$scope.openLoginModal();
			} else {
				$ionicSideMenuDelegate.canDragContent(true);
				$ionicSideMenuDelegate.toggleRight();
			} 
		};

		$scope.login = function (email, password) {
			// Check if user input both field email & password
		    if (email && password) {
		        $ionicLoading.show({
		            template: 'Signing In...'
		        });

		        // Send data to PHP server 
		        data.post('login', {
		        	'email': email, 
		        	'password': password
		        }).then(function(result) {
		        	if (result.success) {
						// User successfully logged in
						// Set user's data from Server to variable & local storage
						$scope.user = result.data;
						$localStorage.setObject('login', result.data);

						// Send user_id to Server to check if user is premium account
						$scope.setIsPremium();

						$ionicLoading.hide();

				      	$scope.closeLoginModal();
					} else {
						// Show pop up for error
						for (var key in result.data) {
							var alertPopup = $ionicPopup.alert({
								title: 'Sign in failed!!!',
								template: '<div class="row"><span class="col text-center">' + result.data[key] + '</span></div>',
								okType: 'button-assertive'
							});
							$ionicLoading.hide();
							break;
						}
					}
		        });

		    } else {
				var alertPopup = $ionicPopup.alert({
					title: 'Error',
					template: '<div class="row"><span class="col text-center">Please enter email and password</span></div>',
					okType: 'button-assertive'
				});
		    }
		};

		$scope.register = function (email, password, displayname) {
		    if (email && password && displayname) {
		        $ionicLoading.show({
		            template: 'Signing Up...'
		        });

		        //$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
		        data.post('signup', {
		        	'email': email, 
		        	'password': password, 
		        	'display_name': displayname
		        }).then(function(result) {
		        	if (result.success) {
						//Success create user

						//Logging user in
						data.post('login', {
				        	'email': email, 
				        	'password': password
				        }).then(function(result) {
				        	if (result.success) {
								// User successfully logged in
								$scope.user = result.data;
								$localStorage.setObject('login', result.data);

								$scope.setIsPremium();

								$ionicLoading.hide();

							    $scope.closeLoginModal();
						      	
							} else {
								for (var key in result.data) {
									var alertPopup = $ionicPopup.alert({
										title: 'Sign in failed!!!',
										template: '<div class="row"><span class="col text-center">' + result.data[key] + '</span></div>',
										okType: 'button-assertive'
									});
									$ionicLoading.hide();
									break;
								}
							}
				        });
					} else {
						for (var key in result.data) {
							var alertPopup = $ionicPopup.alert({
								title: 'Error',
								template: '<div class="row"><span class="col text-center">' + result.data[key] + '</span></div>',
								okType: 'button-assertive'
							});
							$ionicLoading.hide();
							break;
						}
					}
		        });

		    } else {
		    	var alertPopup = $ionicPopup.alert({
					title: 'Error',
					template: '<div class="row"><span class="col text-center">Please fill all details</span></div>',
					okType: 'button-assertive'
				});
		    }
		};

		$scope.logout = function() {
			$localStorage.setObject('login', null);
			$scope.user = null;
			$scope.mode = 'list';
			$ionicSideMenuDelegate.canDragContent(false);
		};

		$scope.getImage = function() {
			navigator.camera.getPicture(function(imageData) {
				var image = document.getElementById('photo-image');
			    image.src = "data:image/jpeg;base64," + imageData;
			    $scope.imageData = image.src;
			}, function(message) {
				var alertPopup = $ionicPopup.alert({
					title: 'Error',
					template: '<div class="row"><span class="col text-center">' + message + '</span></div>',
					okType: 'button-assertive'
				});
			}, { 
				quality: 50,
			    destinationType: Camera.DestinationType.DATA_URL,
			    encodingType: Camera.EncodingType.JPEG,
			    sourceType: Camera.PictureSourceType.PHOTOLIBRARY
			});
		};

		$scope.createEvent = function() {
			if (!$scope.event.title) {
				var alertPopup = $ionicPopup.alert({
					title: 'Error',
					template: '<div class="row"><span class="col text-center">Please input title</span></div>',
					okType: 'button-assertive'
				});
			} else {
				if (!$scope.event.region || !$scope.event.genre) {
					var alertPopup = $ionicPopup.alert({
						title: 'Error',
						template: '<div class="row"><span class="col text-center">Please select region, genre</span></div>',
						okType: 'button-assertive'
					});
				} else {
					var start = moment(moment($scope.event.startDate).format('YYYY-MM-DD') + " " + moment($scope.event.startTime).format('HH:mm:ss')),
						end = moment(moment($scope.event.endDate).format('YYYY-MM-DD') + " " + moment($scope.event.endTime).format('HH:mm:ss')),
						now = moment();

					if (!(start.isAfter(now) && end.isAfter(now) && end.isAfter(start))) {
						var alertPopup = $ionicPopup.alert({
							title: 'Error',
							template: '<div class="row"><span class="col text-center">Invalid start & end date</span></div>',
							okType: 'button-assertive'
						});
					} else {
						$ionicLoading.show({
				            template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
				        });

						data.post('site/create-event', {
							'user_id': $scope.user.id,
							'title': $scope.event.title,
							'location': $scope.event.location,
							'start_date': moment($scope.event.startDate).format('DD-MM-YYYY') + ' ' + moment($scope.event.startTime).format('HH:mm:ss'),
							'end_date': moment($scope.event.endDate).format('DD-MM-YYYY') + ' ' + moment($scope.event.endTime).format('HH:mm:ss'),
							'url': $scope.event.url,
							'notes': $scope.event.notes,
							'image': $scope.imageData,
							'visibility': $scope.event.visibility,
							'region_id': $scope.event.region,
							'genre_id': $scope.event.genre
						}).then(function(result) {
							if (result.success) {
								// Success create event
								var alertPopup = $ionicPopup.alert({
									title: 'Success',
									template: '<div class="row"><span class="col text-center">New event has been created and wait for the check</span></div>',
									okType: 'button-balanced'
								});

								var image = document.getElementById('photo-image');
			    				image.src = '';
						      	$ionicLoading.hide();
						      	/*alert(start);
						      	alert(end);*/

						      	$scope.closeCreateEventModal();
							} else {
								for (var key in result.data) {
									var alertPopup = $ionicPopup.alert({
										title: 'Error!!!',
										template: '<div class="row"><span class="col text-center">' + result.data[key] + '</span></div>',
										okType: 'button-assertive'
									});
									$ionicLoading.hide();
									break;
								}
							}
						});
					}
				}
			}
		};

		$scope.selectRegion = function(regionName) {
			$localStorage.set('region', regionName);
			$scope.regionName = regionName;
			$rootScope.$broadcast('selectRegion', $state.current.name);
		};

		$scope.scrollTop = function() {
			if ($state.current.name === 'app.home') {
				$ionicScrollDelegate.scrollTop(true);
			} else {
				if ($state.current.name === 'app.homeByMonth') {
					$state.go($state.current, {}, {reload: true});
				}
			}
		};

		$scope.upgrade = function(phoneNumber, address, about) {
			if (phoneNumber && address) {
		        $ionicLoading.show({
		            template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
		        });

		        //$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
		        data.post('site/upgrade', {
		        	'user_id': $scope.user.id,
		        	'phoneNumber': phoneNumber, 
		        	'address': address, 
		        	'about': about
		        }).then(function(result) {
		        	if (result.success) {
						// Success upgrade
						var alertPopup = $ionicPopup.alert({
							title: 'Success',
							template: '<div class="row"><span class="col text-center">An upgrade request has been sent to admin. Please wait for response.</span></div>',
							okType: 'button-balanced'
						});
				      	$ionicLoading.hide();

				      	$scope.closeUpgradeModal();
					} else {
						for (var key in result.data) {
							var alertPopup = $ionicPopup.alert({
								title: 'Error',
								template: '<div class="row"><span class="col text-center">' + result.data[key] + '</span></div>',
								okType: 'button-assertive'
							});
							$ionicLoading.hide();
							break;
						}
					}
		        });

		    } else {
		    	var alertPopup = $ionicPopup.alert({
					title: 'Error',
					template: '<div class="row"><span class="col text-center">Please input phone number & address</span></div>',
					okType: 'button-assertive'
				});
		    }
		};
	}
]);