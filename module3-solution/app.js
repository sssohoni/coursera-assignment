(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com')
.directive('foundItems', FoundItems);

function FoundItems() {
  var ddo = {
    templateUrl: 'foundItems.html',
    Restrict: 'E',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'narrowIt',
    bindToController: true
  };
  return ddo;
}

function FoundItemsDirectiveController(){
    var narrowIt = this;
    narrowIt.IsEmptyItems = function(){
      if (narrowIt.items != undefined && narrowIt.items.length === 0){
        return true;
      }
      return false;
    };
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowIt = this;
  narrowIt.narrowItDown =  function(){
    var promise = MenuSearchService.getMatchedMenuItems(narrowIt.search);
    promise.then(function(result){
        narrowIt.found = result;
      }).catch(function(e){
          console.log(e.message);
      });
    };
    narrowIt.removeItem = function(itemIndex){
        narrowIt.found.splice(itemIndex, 1);
    }
  }


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  service.getMatchedMenuItems = function (searchTerm) {

  return $http({
        method: "GET",
        url: (ApiBasePath + '/menu_items.json')
      }).then (function success(result){
        var foundItems = [];
        if(searchTerm !== undefined && searchTerm.length > 0){       
        for (var i = 0; i < result.data.menu_items.length; i++) {
          var description = result.data.menu_items[i].description;
          if (description.indexOf(searchTerm) !== -1){
            foundItems.push(result.data.menu_items[i]);
          }
        }
        }
      return foundItems;
    }, function error(response){
          throw new Error("Error");
      });
    };
  }
  })();
