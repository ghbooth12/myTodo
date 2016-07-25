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
          createdAt: new Date().getTime()
        });
        this.content = null;
      }
    };

    var itemObj = {
      all: items,
      add: addItem
    };

    return itemObj;
  }
})();
