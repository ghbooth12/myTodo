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
        var dayDiff;
        scope.list = Item.all;
        scope.checkToComplete = Item.checkOff;

        function collectActive() {
          for (var i = 0; i < scope.list.length; i ++) {
            if (scope.list[i].complete || scope.list[i].overdue) {
              scope.list.splice(i, 1);
            }
          }
        };

        scope.levelUp = function(item) {
          collectActive();
          var index = scope.list.indexOf(item);
          if (index !== 0) {
            var higherItem = scope.list[index - 1];
            scope.list[index - 1] = item;
            scope.list[index] = higherItem;
          }
        };

        scope.levelDown = function(item) {
          collectActive();
          var index = scope.list.indexOf(item);
          if (index !== scope.list.length - 1) {
            var lowerItem = scope.list[index + 1];
            scope.list[index + 1] = item;
            scope.list[index] = lowerItem;
          }
        };

        scope.getDayDiff = function(item) {
          var currentTime = new Date().getTime();
          var gapInMs = currentTime - item.createdAt;
          var msPerMin = 60 * 1000; // CHANGE TO DAY!!
          dayDiff = Math.ceil(gapInMs / msPerMin);

          return dayDiff;
        };

        function showHide(item) {
          if (dayDiff >= 9) { // CHANGE TO DAY!!
            console.log("dropping....", dayDiff);
            Item.dropOff(item);
          }
        };

        // ------------ Interval -------------
        var timeoutId = $interval(function() {
          var activeList = Item.getActiveItemArr();
          if (activeList.length > 0) {
            for(var i = 0; i < activeList.length; i++) {
              scope.getDayDiff(activeList[i]);
              showHide(activeList[i]);
            }
          }
          console.log("Test Message"); // Remove Test Log
        }, 1000); // INCREASE INTERVAL

        function stopInterval() {
          $interval.cancel(timeoutId);
          timeoutId = undefined;
          console.log("Interval Stopped"); // Remove Test Log
        }

        element.on('$destroy', function() {
          stopInterval();
          console.log("Destroy Interval"); // Remove Test Log
        });
      }
    };
  }
})();
