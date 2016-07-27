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
        scope.getActiveItemArr = function() {
          var all = Item.all;
          var array = [];
          for(var i = 0; i < all.length; i++) {
            if (!all[i].complete && !all[i].overdue) {
              array.push(all[i]);
            }
          }
          return array;
        };

        scope.getDayDiff = function(item) {
          var currentTime = new Date().getTime();
          var gapInMs = currentTime - item.createdAt;
          var msPerMin = 60 * 1000; // CHANGE TO DAY!!
          scope.dayDiff = Math.ceil(gapInMs / msPerMin);

          return scope.dayDiff;
        };

        scope.checkToComplete = Item.checkOff;

        scope.showHide = function(item) {
          if (scope.dayDiff === 3) { // CHANGE TO DAY!!
            Item.dropOff(item);
          }
        };

        var timeoutId = $interval(function() {
          var activeItemArr = scope.getActiveItemArr();
          if (activeItemArr.length > 0) {
            for(var i = 0; i < activeItemArr.length; i++) {
              scope.getDayDiff(activeItemArr[i]);
              scope.showHide(activeItemArr[i]);
            }
          }
          console.log("Test Message");
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
