(function() {
  angular
    .module('myTodo', ['ui.router', 'firebase'])
    .config(config);

  function config($stateProvider, $locationProvider) {
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });

    $stateProvider
      .state('main', {
        url: '/',
        controller: 'MainCtrl as main',
        templateUrl: '/templates/main.html'
      })
      .state('history', {
        url: '/history',
        controller: 'HistoryCtrl as history',
        templateUrl: '/templates/history.html'
      });
  }
})();
