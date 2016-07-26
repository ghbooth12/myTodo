(function() {
  angular
    .module('myTodo')
    .directive('todoItem', ['Item', '$interval', todoItem]);

  function todoItem(Item, $interval) {
    return {
      templateUrl: 'templates/directives/todoItem.html',
      restrict: 'E',
      scope: {},
      link: function(scope, element, attributes) {
        scope.visibleItemArr = Item.all;

        scope.getDayDiff = function(item) {
          var currentTime = new Date().getTime();
          var gapInMs = currentTime - item.createdAt;
          var msPerMin = 60 * 1000; // CHANGE TO DAY!!
          scope.dayDiff = Math.ceil(gapInMs / msPerMin);

          return scope.dayDiff;
        };

        scope.checkToComplete = function(item) {
          item.complete = true;
        };

        scope.showHide = function(item) { // CHANGE TO DAY!!
          if (scope.dayDiff >= 3 || item.complete) {
            var index = scope.visibleItemArr.indexOf(item);
            scope.visibleItemArr.splice(index, 1);
            return false;
          } else {
            return true;
          }
        };

        var timeoutId = $interval(function() {
          if (scope.visibleItemArr.length > 0) {
            for(var i = 0; i < scope.visibleItemArr.length; i++) {
              scope.getDayDiff(scope.visibleItemArr[i]);
              scope.showHide(scope.visibleItemArr[i]);
            }
          }
          console.log("printing");
        }, 1000); // INCREASE INTERVAL

        function stopInterval() {
          $interval.cancel(timeoutId);
          timeoutId = undefined;
        }

        element.on('$destroy', function() {
          stopInterval();
        });
      }
    };
  }
})();
