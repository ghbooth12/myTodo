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
        var delay = 60 * 60 * 1000; // interval delay: every hour
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
          var msPerDay = 24 * 60 * 60 * 1000; // a day
          dayDiff = Math.floor(gapInMs / msPerDay);
          var dayLeft = 7 - dayDiff; // displays how many days left
          var output;

          if (dayLeft > 1) {
            output = dayLeft + " days left";
          } else {
            output = dayLeft + " day left";
          }
          return output;
        };

        function showHide(item) {
          if (dayDiff >= 7) { // drops over 7 days old tasks
            console.log("dropped: ", dayDiff);
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
          console.log("Test Message"); // Test Log
        }, delay);

        function stopInterval() {
          $interval.cancel(timeoutId);
          timeoutId = undefined;
          console.log("Interval Stopped"); // Test Log
        }

        element.on('$destroy', function() {
          stopInterval();
          console.log("Destroy Interval"); // Test Log
        });
      }
    };
  }
})();
