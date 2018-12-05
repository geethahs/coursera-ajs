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





/*
(function (){
	'use strict';

	

	angular.module('ShoppingListApp',[])
	.controller('ToBuyController',ToBuyController)
	.factory('ShoppingListFactory', ShoppingListFactory);

	ToBuyController.$inject = ['ShoppingListFactory'];

	function ToBuyController(ShoppingListFactory){
		var list = this;

	  // Use factory to create new shopping list service
	  var shoppingList = ShoppingListFactory();

	  list.items = shoppingList.getItems();
	}

	function ShoppingListService(){
		var service = this;
		if(shoppingList.length <= 0){
			return "Bought all items";
		}
		else{
			var shoppingList = [
			  {
			    name: "cookies",
			    quantity: "10"
			  },
			  {
			    name: "cookies",
			    quantity: "10"
			  }
			];
			service.getItems = function () {
			    return shoppingList;
			};
		}
	}

	function ShoppingListFactory() {
	  	var factory = function () {
	    return new ShoppingListService();
	  };

	  return factory;
	}

})();

*/