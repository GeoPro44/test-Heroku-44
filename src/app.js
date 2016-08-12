var app = angular.module('sortApp', []);

app.controller('mainController', function($scope) {
  $scope.sortType     = 'name'; // set the default sort type
  $scope.sortReverse  = false;  // set the default sort order
  $scope.searchFish   = '';     // set the default search/filter term
  $scope.filterList = [];
  
  // create the list of sushi rolls 
  $scope.sushi = [
    { name: 'Cali Roll', fish: 'Crab', tastiness: 2, price: 1.33, "checked": true },
    { name: 'Philly', fish: 'Tuna', tastiness: 4, price: 3.42, "checked": false },
    { name: 'Tiger', fish: 'Eel', tastiness: 7, price: 12.23, "checked": true },
    { name: 'Rainbow', fish: 'Variety', tastiness: 6, price: 5.25, "checked": false }
  ];
  
	$scope.addFilter = function(filterName, value, dt) {
		$scope.removeFilter(filterName);
		$scope.filterList.push({'filterName': filterName, 'value': value, 'displayText': dt});
	};	
	
	$scope.removeFilter = function(filterName) {
		var f = _.findWhere($scope.filterList, {'filterName': filterName});
		if (f) {			
			$scope.filterList = _.without($scope.filterList, f);
		}
	};
  
});

// Setup the filter
app.filter('customFilter', function() {

  // Create the return function and set the required parameter name to **input**
	return function(input, filterList) {

		var outList = input;		
		var setFilters = _.pluck(filterList, 'filterName');		
		//console.log('setFilters: ' + JSON.stringify(setFilters));
		
		// Like it
		if (_.contains(setFilters, 'likeIt')) 
		{	
			var f = _.findWhere(filterList, {'filterName': 'likeIt'});
			
			outList = _.filter(outList, function(fish){ 				
				return fish.checked === f.value; 
			});			
		}
		
		// Price Greater
		if (_.contains(setFilters, 'priceGreater')) 
		{	
			var f = _.findWhere(filterList, {'filterName': 'priceGreater'});
			
			outList = _.filter(outList, function(fish){ 				
				return fish.price > f.value; 
			});			
		}
		
		// if (_.contains(setFilters, 'likeIt')) 
		// {
			// angular.forEach(input, function(fish) {
			  // if (fish.checked === true) {
				// out.push(fish)
			  // }      
			// });
		// }

		return outList;
	}

});