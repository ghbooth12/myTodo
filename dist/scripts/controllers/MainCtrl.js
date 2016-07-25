(function() {
  angular
    .module('myTodo')
    .controller('MainCtrl', ['Item', MainCtrl]);

  function MainCtrl(Item) {
    this.content = null;
    this.allItems = Item.all;
    this.addItem = Item.add;
  }
})();
