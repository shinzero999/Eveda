EvedaApp.controller('HomeCtrl', ['$scope', '$localStorage', '$rootScope', 'data', 
	function($scope, $localStorage, $rootScope, data) {
		$scope.dates = data.getMoreDate(0);
		$scope.numberOfMonth = 1;
		$scope.publicEvents = $localStorage.getObject('public-events');

		var reloadData = function() {
			$scope.numberOfMonth = 0;

			$scope.setRegions();
			$scope.setGenres();
			$scope.setIsPremium();

			$scope.setDates();
			$scope.setPublicEvents();
		}

		$scope.setPublicEvents = function() {
			data.getPublicEvents($scope.regionName).then(function(result) {
				$scope.publicEvents = result;
				$localStorage.setObject('public-events', result);
				$scope.hideLoading();
			});
		};

		$scope.setDates = function() {
			$scope.dates = [];
		
			$scope.dates = $scope.dates.concat(data.getMoreDate($scope.numberOfMonth));

			$scope.numberOfMonth++;
			/*data.getMoreDate($scope.numberOfMonth).then(function(result) {
				
			});*/
		};

		if (!$scope.genres || !$scope.regions || !$scope.publicEvents) {
			$scope.showLoading('Loading...');

			reloadData();
		} 	

		/*$rootScope.$on('firstLoad', function(event, data) {
			console.log('here');
			if (data === 'app.home') {
				
			}
	    });*/

		$scope.loadMore = function() {
			$scope.dates = $scope.dates.concat(data.getMoreDate($scope.numberOfMonth));
			/*data.getMoreDate($scope.numberOfMonth).then(function(result) {
				$scope.dates = $scope.dates.concat(result);
			});*/
			$scope.numberOfMonth++;
			//console.log($scope.numberOfMonth);
			$scope.$broadcast('scroll.infiniteScrollComplete');    
		};

		$scope.doRefresh = function() {
			$scope.showLoading('Loading...');

	        reloadData();

			$scope.$broadcast('scroll.refreshComplete');   
		};

		/*$scope.$on('$stateChangeSuccess', function() {
			$scope.loadMore();
		});*/

		$rootScope.$on('selectRegion', function(event, data) {
			if (data === 'app.home') {
				$scope.closeRegionsModal();
				$scope.showLoading('Loading...');

				$scope.setPublicEvents();
				//reloadData();
			}
	    });
    }
]);
