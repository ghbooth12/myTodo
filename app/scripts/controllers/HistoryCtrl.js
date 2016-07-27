(function() {
  angular
    .module('myTodo')
    .controller('HistoryCtrl', ['Item', HistoryCtrl]);

  function HistoryCtrl(Item) {
    this.itemArr = Item.all;
  }
})();
