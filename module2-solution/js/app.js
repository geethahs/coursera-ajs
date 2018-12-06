(function () {
'use strict';

var itemsbought =[];

angular.module('ShoppingListApp', [])
.controller('ToBuyShoppingListController', ToBuyShoppingListController)
.controller('BoughtShoppingListController', BoughtShoppingListController)
.provider('ShoppingListService', ShoppingListServiceProvider);

ToBuyShoppingListController.$inject = ['ShoppingListService'];
function ToBuyShoppingListController(ShoppingListService) {

  var showList = this;
  showList.items = ShoppingListService.getItems();
  showList.errorBuyMessage = "";

  showList.removeItem = function (itemIndex) {
  	ShoppingListService.moveItem(itemIndex);
    try{
    ShoppingListService.removeItem(itemIndex);
}
catch (error) {
      showList.errorBuyMessage = error.message;
    }
  };
}

BoughtShoppingListController.$inject = ['ShoppingListService'];
function BoughtShoppingListController(ShoppingListService) {

  var showMovedList = this;
  var objreturn = ShoppingListService.getMovedItems();
  showMovedList.items = objreturn.items;
  showMovedList.errorBoughtMessage = objreturn.message;

}


function ShoppingListService(defaults) {
  var service = this;
  var items = [{
			    name: "cookies",
			    quantity: "10"
			},
			{
			    name: "cookies",
			    quantity: "10"
			},
			{
			    name: "cookies",
			    quantity: "10"
			}
			];

  service.moveItem = function (itemIndex) {
    itemsbought.push(items[itemIndex]);
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
    if(!items.length){
    	throw new Error(defaults.errorBuyMessage);
    }
  };

  service.getItems = function () {
      return items;
  };

  service.getMovedItems = function () {
    var obj = {
      items : itemsbought,
      message : defaults.errorBoughtMessage
  };
    return obj;
  };
}

function ShoppingListServiceProvider() {
  var provider = this;

  provider.defaults = {
    errorBuyMessage : "Everything is bought!",
    errorBoughtMessage : "Nothing bought yet."
  };

  provider.$get = function () {
    var shoppingList = new ShoppingListService(provider.defaults);

    return shoppingList;
  };
}

})();





/*
(function () {
'use strict';

var itemsbought =[];

angular.module('ShoppingListApp', [])
.controller('ToBuyShoppingListController', ToBuyShoppingListController)
.controller('BoughtShoppingListController', BoughtShoppingListController)
.factory('ShoppingListFactory', ShoppingListFactory);


ToBuyShoppingListController.$inject = ['ShoppingListFactory'];
function ToBuyShoppingListController(ShoppingListFactory) {

  var showList = this;
  var shoppingList = ShoppingListFactory();
  showList.items = shoppingList.getItems();
  showList.errorBuyMessage = "";

  showList.removeItem = function (itemIndex) {
  	shoppingList.moveItem(itemIndex);
    try{
    shoppingList.removeItem(itemIndex);
}
catch (error) {
      showList.errorBuyMessage = error.message;
    }
  };
}

BoughtShoppingListController.$inject = ['ShoppingListFactory'];
function BoughtShoppingListController(ShoppingListFactory) {

  var showMovedList = this;
  var shoppingList = ShoppingListFactory();
  showMovedList.items = shoppingList.getMovedItems();
  showMovedList.errorBoughtMessage = "Nothing bought yet.";

}


function ShoppingListService() {
  var service = this;
  var items = [{
			    name: "cookies",
			    quantity: "10"
			},
			{
			    name: "cookies",
			    quantity: "10"
			},
			{
			    name: "cookies",
			    quantity: "10"
			}
			];

  service.moveItem = function (itemIndex) {
    itemsbought.push(items[itemIndex]);
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
    if(!items.length){
    	throw new Error("Everything is bought!");
    }
  };

  service.getItems = function () {
      return items;
  };

  service.getMovedItems = function () {
    return itemsbought;
  };
}

function ShoppingListFactory() {
  var factory = function () {
    return new ShoppingListService();
  };

  return factory;
}

})();



*/
