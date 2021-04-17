(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);


MyInfoController.$inject = ['UserService'];

function MyInfoController(UserService) {
  var myInfoCtrl = this;

  myInfoCtrl.myInfo = UserService.getUserDetails();
  if (myInfoCtrl.myInfo.length > 0) {
    UserService.getFavoriteMenu(myInfoCtrl.myInfo[0].favoriteMenu)
    .then(function(result){
      myInfoCtrl.menuItem = result;
    });
  }
}

})();
