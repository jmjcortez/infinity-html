var infinityApp = angular.module('infinityApp', [

]).controller('infinityController', [
  '$scope',
  '$rootScope',
  '$http',
  'API',
  function($scope, $rootScope, $http, API) {

    $rootScope.lenders = [];
    $rootScope.hasErrors = false;
    $rootScope.isLoading = false;

    $rootScope.getLenders = function() {
      $rootScope.isLoading = true;
      return $http.get(API)
        .then(function (response) {
          if (typeof response.data !== 'undefined') {
            $rootScope.lenders = response.data.data;
            $rootScope.hasErrors = false;
            $rootScope.isLoading = false;
            return response.data;
          }
        }, function (response) {
          $rootScope.hasErrors = true;
          $rootScope.isLoading = false;
          $rootScope.lenders = [];
          return "error";
        })
    }

    $rootScope.getLenders();

  }]);

infinityApp.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
});

infinityApp.filter('capitalise', function() {
  return function(input) {
    return (angular.isString(input) && input.length > 0) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : input;
  }
});

infinityApp.constant('API','http://localhost:8000/lenders');