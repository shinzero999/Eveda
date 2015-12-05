EvedaApp.controller('HomeByMonthCtrl', ['$scope', '$rootScope', 'data', '$ionicLoading',
	function($scope, $rootScope, data, $ionicLoading) {
		$scope.selected = _removeTime($scope.selected || moment());
        $scope.month = $scope.selected.clone();
        $scope.weeks = [];

        function _removeTime(date) {
        	return date.day(0).hour(0).minute(0).second(0).millisecond(0);
        };

        $scope.startBuild = function() {
			var start = $scope.selected.clone();
            start.date(1);
            _removeTime(start.day(0));

            $scope._buildMonth(start);
        };

        $scope._buildMonth = function(start) {
        	$scope.weeks = [];
        	var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
        	while (!done) {
            	$scope.weeks.push({ days: $scope._buildWeek(date.clone()) });
            	date.add(1, "weeks");
            	done = count++ > 2 && monthIndex !== date.month();
            	monthIndex = date.month();
        	}
    	};

    	$scope._buildWeek = function(date) {
        	var days = [];
        	for (var i = 0; i < 7; i++) {
	            days.push({
	                name: date.format("dd").substring(0, 1),
	                number: date.date(),
	                isCurrentMonth: date.month() === $scope.month.month(),
	                isToday: date.isSame(new Date(), "day"),
	                date: date
	            });
            	date = date.clone();
            	date.add(1, "d");
        	}
        	return days;
    	};

    	$scope.select = function(day) {
            $scope.selected = day.date;  
        };

        $scope.next = function() {
            var next = $scope.month.clone();
            _removeTime(next.month(next.month()+1).date(1));
            $scope.month.add(1, 'months');
            $scope._buildMonth(next);
        };

        $scope.previous = function() {
            var previous = $scope.month.clone();
            _removeTime(previous.month(previous.month()-1).date(1));
            $scope.month.subtract(1, 'months');
            $scope._buildMonth(previous);
        };

        $scope.$on('$ionicView.enter', function() {
		    // code to run each time view is entered
		    $scope.selected = _removeTime($scope.selected || moment());
		    $scope.month = $scope.selected.clone();
		    $scope.startBuild();
            $scope.hideLoading();
		});

        $rootScope.$on('firstLoad', function(event, data) {
          if (data === 'app.homeByMonth') {
            $scope.showLoading('Loading...');

            $scope.selected = _removeTime($scope.selected || moment());
            $scope.month = $scope.selected.clone();
            $scope.startBuild();

            $scope.hideLoading();
          }
        });
    }
]);