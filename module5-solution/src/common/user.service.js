(function () {
"use strict";

angular.module('common')
.service('UserService', UserService);


UserService.$inject = ['$http', 'ApiPath'];
function UserService($http, ApiPath) {
  var service = this;
  var userDetails = new Array();
  service.getFavoriteMenu = function (favShortName) {
    return $http.get(ApiPath + '/menu_items/' + favShortName + '.json')
      .then(function success(response) {
      return response.data;
    },function error(response){
      throw new Error ("Failed to fetch data!");
    });
  };

  service.setUserDetails = function(userDetails){
    userDetails = [];
    userDetails.push(userDetails);
  };

  service.getUserDetails = function () {
      return userDetails;
  };
}
})();
