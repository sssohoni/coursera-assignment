(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {

  var ToBuyList = this;
  ToBuyList.items = ShoppingListCheckOffService.getItems();
  ToBuyList.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  }

}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var Boughtlist = this;
  Boughtlist.items = ShoppingListCheckOffService.getItemsBought();
  Boughtlist.addItem =  function (item){
  ShoppingListCheckOffService.addItem(item.name, item.quantity);
  }

}


function ShoppingListCheckOffService() {
  var service = this;

var ToBuy = [
  {
    name:"Cookies",
    quantity:"10"
  },
  {
    name:"Pastry",
    quantity:"5"
  },
  {
    name:"Chocolates",
    quantity:"15"
  },
  {
    name:"Donuts",
    quantity:"12"
  },
  {
    name:"Burgers",
    quantity:"11"
  }
];
var Bought = [];
service.addItem = function (itemName, quantity) {
  var item = {
    name: itemName,
    quantity: quantity
  };
  Bought.push(item);
};

  service.removeItem = function (itemIndex) {
    ToBuy.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return ToBuy;
  };

  service.getItemsBought = function () {
    return Bought;
  };
}

})();
