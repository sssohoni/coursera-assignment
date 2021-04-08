(function () {
'use strict';

var BuyList = [
  {
    name: "Cookies",
    quantity: "10"
  },
  {
    name: "Colddrinks",
    quantity: "5"
  },
  {
    name: "Chocolate",
    quantity: "15"
  },
  {
    name: "Cake",
    quantity: "2"
  }
  {
    name: "Waferpack",
    quantity: "3"
  }
];
angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController) 
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
    var BuyList = this;
    BuyList.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(BuyList.itemName, BuyList.itemQuantity);
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
    var BoughtList = this;
    BoughtList.addItem=function (itemIndex){
    ShoppingListCheckOffService.addItem(BoughtList.itemName,BoughtList.itemQuantity);
}


function ShoppingListCheckOffService() {
  var service = this;
  // List of shopping items
  var items = [];

  service.addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    items.push(item);
  };
  service.getItems = function () {
    return items;
  };
}

})();
