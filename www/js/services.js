EvedaApp.factory('data', ['$http', 
  function($http) {
    //var serviceBase = 'http://shinzero.pe.hu/';
    var serviceBase = 'http://localhost/eveda/eveda-web/';

    return {
      post: function (url, data) {
        return $http({
          method: 'POST',
          url: serviceBase + url,
          data: data,
        }).then(function(result) {
          return result.data;
        });
      },
      get: function(url) {
        return $http({
          method: 'GET',
          url: serviceBase + url,
        }).then(function(result) {
          return result.data;
        });
      },
      getMoreDate: function(numberOfMonth) {
        var now = moment().add(numberOfMonth, 'months');
        var nextMonth = moment().add(numberOfMonth + 1, 'months');
        /*var now = moment().add(numberOfMonth, 'months').format('YYYY-MM-DD');
        var nextMonth = moment().add(numberOfMonth + 1, 'months').format('YYYY-MM-DD');*/
        var array = [];
        while (now.isBefore(nextMonth)) {
          array.push(now.clone());
          now.add(1, 'days');
        }
        return array;

        /*return $http({
          method: 'POST',
          url: serviceBase + 'site/get-number-of-events',
          data: {now: now, nextMonth: nextMonth},
        }).then(function(result) {
          //return result.data;
          array = array.concat(result.data.data);

          for (var i = array.length - 1; i >= 0; i--) {
            array[i].date = moment(array[i].date);
          };

          return array;
        });*/
      },
      getMoreDateReverse: function(numberOfMonth) {
        var now = moment().subtract(numberOfMonth + 1, 'months');
        var lastMonth = moment().subtract(numberOfMonth + 2, 'months');
        var array = [];
        while (now.isAfter(lastMonth)) {
          array.push(now.clone());
          now.subtract(1, 'days');
        }

        /*for (var i = 0; i < 30; i++) {
          array.push(moment().add(i, 'days'));
        };*/
        return array;
      },
      getPublicEvents: function(regionName) {
        return $http({
          method: 'POST',
          url: serviceBase + 'site/get-public-events',
          data: {regionName: regionName}
        }).then(function(result) {
          var array = result.data.data;
          if (array) {
            for (var i = array.length - 1; i >= 0; i--) {
              array[i].start_date = moment(array[i].start_date);
              array[i].end_date = moment(array[i].end_date);
            };
          }
          return array;
        });
      },
      getEventDetail: function(id) {
        return $http({
          method: 'POST',
          url: serviceBase + 'site/get-event-detail',
          data: {id: id}
        }).then(function(result) {
          return result.data;
        });
      }
    }
  }
]);

EvedaApp.factory('$localStorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || null);
    }
  }
}]);