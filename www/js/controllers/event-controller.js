EvedaApp.controller('EventCtrl', ['$scope', '$rootScope', 'data', '$localStorage', '$stateParams', '$ionicLoading', '$ionicPopup', '$timeout', 'ionicMaterialMotion', 'ionicMaterialInk', '$state',
	function($scope, $rootScope, data, $localStorage, $stateParams, $ionicLoading, $ionicPopup, $timeout, ionicMaterialMotion, ionicMaterialInk, $state) {
		$ionicLoading.show({
	        template: 'Loading...'
	    });

	    (function() {
	    	var listEvents = $localStorage.getObject('public-events');
	    	for (var i = 0; i < listEvents.length; i++) {
	    		if (listEvents[i].id == $stateParams.id) {
	    			$scope.event = listEvents[i];
	    			break;
	    		}	
	    	};

	    	$scope.event.start_date = moment($scope.event.start_date);
			$scope.event.end_date = moment($scope.event.end_date);
			if ($scope.event.image != null && $scope.event.image != '') {
				document.getElementsByClassName("hero")[0].style.backgroundImage = "url('" + $scope.event.image + "')";
			}

          	$ionicLoading.hide();

          	// Set Motion
		    $timeout(function() {
		        ionicMaterialMotion.slideUp({
		            selector: '.slide-up'
		        });
		    }, 300);

		    $timeout(function() {
		        ionicMaterialMotion.fadeSlideInRight({
		            startVelocity: 3000
		        });
		    }, 700);

	        ionicMaterialInk.displayEffect();

	    })();

    	//Set external link 
    	$scope.openLink = function() {
    		window.open($scope.event.url, '_system', 'location=yes'); 
    		return false;
    	};
    }
]);
