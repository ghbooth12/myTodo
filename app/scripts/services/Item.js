(function() {
  angular
    .module('myTodo')
    .factory('Item', ['$firebaseArray', Item]);

  function Item($firebaseArray) {
    var fbRef = new Firebase('https://my-todo-f204c.firebaseio.com');
    var items = $firebaseArray(fbRef.child('items'));
    var addItem = function(content) {
      if (content) {
        items.$add({
          content: content,
          complete: false,
          overdue: false,
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
      getActiveItemArr: getActiveItemArr
    };

    return itemObj;
  }
})();
