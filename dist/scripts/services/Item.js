(function() {
  angular
    .module('myTodo')
    .factory('Item', ['$firebaseArray', Item]);

  function Item($firebaseArray) {
    var fbRef = new Firebase('https://my-todo-f204c.firebaseio.com');
    var items = $firebaseArray(fbRef.child('items').orderByChild('priority'));
    var addItem = function(content) {
      if (content) {
        items.$add({
          content: content,
          complete: false,
          overdue: false,
          priority: items.length,
          createdAt: new Date().getTime()
        });
        this.content = null;
      }
    };

    var checkOff = function(item) {
      item.complete = true;
      items.$save(item); // update data change
    };

    var dropOff = function(item) {
      item.overdue = true;
      items.$save(item);
    };

    var levelUp = function(item) {
      if (item.priority > 0) {
        var index = items.indexOf(item);
        var higherItem = items[index - 1];

        item.priority -= 1;
        items.$save(item);
        higherItem.priority += 1;
        items.$save(higherItem);
      }
    };

    var levelDown = function(item) {
      if (item.priority < items.length - 1) {
        var index = items.indexOf(item);
        var lowerItem = items[index + 1];

        item.priority += 1;
        items.$save(item);
        lowerItem.priority -= 1;
        items.$save(lowerItem);
      }
    };

    function getActiveItemArr() {
      var array = [];
      for(var i = 0; i < items.length; i++) {
        if (!items[i].complete && !items[i].overdue) {
          array.push(items[i]);
        }
      }
      return array;
    }

    var itemObj = {
      all: items,
      add: addItem,
      checkOff: checkOff,
      dropOff: dropOff,
      levelUp: levelUp,
      levelDown: levelDown,
      getActiveItemArr: getActiveItemArr
    };

    return itemObj;
  }
})();
