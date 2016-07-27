(function() {
  angular
    .module('myTodo')
    .controller('MainCtrl', ['Item', MainCtrl]);

  function MainCtrl(Item) {
    this.content = null;
    this.addItem = Item.add;
  }
})();
