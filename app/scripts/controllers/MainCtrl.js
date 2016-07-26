(function() {
  angular
    .module('myTodo')
    .controller('MainCtrl', ['Item', MainCtrl]);

  function MainCtrl(Item) {
    this.content = null;
    this.itemArr = Item.all;
    this.addItem = Item.add;
  }
})();
