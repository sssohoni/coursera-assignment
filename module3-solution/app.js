(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
  var menu = {
    templateUrl: 'removeitem.html',
    scope: {
      items: '<',
      //myTitle: '@title',
      //badRemove: '=',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'searchlist',
    bindToController: true
  };

  return menu;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
var searchlist = [];
  var promise = MenuSearchService.getMenuCategories();

  promise.then(function (response) {
    menu.categories = response.data;
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });

  menu.logMenuItems = function (searchTerm) {
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

    promise.then(function (response) {
      searchlist = response.data;
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  };

}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  service.getMenuCategories = function () {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/categories.json")
      });

      return response;
    };

    service.getMatchedMenuItems = function (menulist, searchTerm) {
      var found = [];

      for (var i = 0; i < menulist.items.length; i++) {
        var name = menulist.items[i].name;
        if (name.toLowerCase().indexOf("searchTerm") !== -1) {
      return true;
        }
      }

      return false;
    };

  service.removeItem = function (itemIndex) {
    foundItems.splice(itemIndex, 1);
  };

}


})();
