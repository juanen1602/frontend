angular.module("AppTask", [])
	.controller("taskandids", function($scope, $http){

	$scope.url = "http://192.168.43.177:8000";

	$scope.state = 1;

	$scope.hideButtonStart = "display: inline;";
	$scope.hideButtonBack = "display: none;";
	$scope.hideButtonNext = "display: none;";
	$scope.hideButtonFinish = "display: none;";
	$scope.hideButtonReload = "display: none;";

	$scope.hideRange = "display: none;";
	$scope.hideNumber = "display: none;";
	$scope.hideNumberTags = "display: none;";
	$scope.hideTag = "display: none;";
	$scope.hideListParameters = "display: none;";

	$scope.hideTag1 = "display: inline;";
	$scope.hideTag2 = "display: inline;";
	$scope.hideTag3 = "display: inline;";
	$scope.hideTag4 = "display: inline;";
	$scope.hideTag5 = "display: inline;";

	$scope.amount = 1;
	$scope.amountNum = 1;

	$scope.amountTags = null;
	$scope.nameTag = "";
	$scope.listTags = [];
	$scope.listSize = 0;

	$scope.text = "Please, press button to start creation of sequence";

	$scope.ID = null;

	$scope.setElements = function()
	{
		if($scope.state == 1)
		{
			$scope.amount = 1;
			$scope.amountNum = 1;

			$scope.amountTags = null;
			$scope.nameTag = "";
			$scope.listTags = [];
			$scope.listSize = 0;

			$scope.text = "Please, press button to start creation of sequence";
		}
		else if($scope.state == 2)
		{
			$scope.amount = 1;
			$scope.amountNum = 1;

			$scope.amountTags = null;
			$scope.nameTag = "";
			$scope.listTags = [];
			$scope.listSize = 0;

			$scope.text = "Now, select the number of pictures you are willing to take (max 10000)";
		}
		else if($scope.state == 3)
		{
			$scope.amountTags = null;
			$scope.nameTag = "";
			$scope.listTags = [];
			$scope.listSize = 0;

			$scope.text = "Now, select the number of Tags to attach the burst";
		}
		else if($scope.state == 4)
		{
			$scope.nameTag = "";
			$scope.listTags = [];
			$scope.listSize = 0;

			$scope.text = "Introduce the names, one by one, untill the array is completed";
		}
		else if($scope.state == 5)
		{
			$scope.text = "To finish the request, click Finish button. To correct something, click Back button";
		}
		else if($scope.state == 6)
		{
			var dat = {Amount: $scope.amount,
				Tags: $scope.listTags,
				Author: "Juanen"};
			var json = JSON.stringify(dat);

			$http({
				method: 'POST',
				url: $scope.url + '/CreateTask',
				data: json,
			}).then(function successCallback(response){
				console.log(response.data);
				$scope.ID = response.data.ID;
				$scope.text = "Success! " + response.data.Message + ". Your ID is " + $scope.ID;
				console.log($scope.ID);
			}, function errorCallback(response){
				console.log(response.statusText);
			});
		}
	}

	$scope.hideElements = function()
	{
		if($scope.state == 1)
		{
			$scope.hideButtonStart = "display: inline;";
			$scope.hideButtonBack = "display: none;";
			$scope.hideButtonNext = "display: none;";
			$scope.hideButtonFinish = "display: none;";
			$scope.hideButtonReload = "display: none;";
			$scope.hideListParameters = "display: none;";

			$scope.hideRange = "display: none;";
			$scope.hideNumber = "display: none;";
			$scope.hideNumberTags = "display: none;";
			$scope.hideTag = "display: none;";
		}
		else if($scope.state == 2)
		{
			$scope.hideButtonStart = "display: none;";
			$scope.hideButtonBack = "display: inline;";
			$scope.hideButtonNext = "display: inline;";
			$scope.hideButtonFinish = "display: none;";
			$scope.hideButtonReload = "display: none;";
			$scope.hideListParameters = "display: none;";

			$scope.hideRange = "display: inline;";
			$scope.hideNumber = "display: inline;";
			$scope.hideNumberTags = "display: none;";
			$scope.hideTag = "display: none;";
		}
		else if($scope.state == 3)
		{
			$scope.hideButtonStart = "display: none;";
			$scope.hideButtonBack = "display: inline;";
			$scope.hideButtonNext = "display: inline;";
			$scope.hideButtonFinish = "display: none;";
			$scope.hideButtonReload = "display: none;";
			$scope.hideListParameters = "display: none;";

			$scope.hideRange = "display: none;";
			$scope.hideNumber = "display: none;";
			$scope.hideNumberTags = "display: inline;";
			$scope.hideTag = "display: none;";
		}
		else if($scope.state == 4)
		{
			$scope.hideButtonStart = "display: none;";
			$scope.hideButtonBack = "display: inline;";
			$scope.hideButtonNext = "display: inline;";
			$scope.hideButtonFinish = "display: none;";
			$scope.hideButtonReload = "display: none;";
			$scope.hideListParameters = "display: none;";

			$scope.hideRange = "display: none;";
			$scope.hideNumber = "display: none;";
			$scope.hideNumberTags = "display: none;";
			$scope.hideTag = "display: inline;";
		}
		else if($scope.state == 5)
		{
			$scope.hideButtonStart = "display: none;";
			$scope.hideButtonBack = "display: inline;";
			$scope.hideButtonNext = "display: none;";
			$scope.hideButtonFinish = "display: inline;";
			$scope.hideButtonReload = "display: none;";
			$scope.hideListParameters = "display: inline;";

			$scope.hideRange = "display: none;";
			$scope.hideNumber = "display: none;";
			$scope.hideNumberTags = "display: none;";
			$scope.hideTag = "display: none;";

			if($scope.listSize == 1)
			{
				$scope.hideTag1 = "display: inline;";
				$scope.hideTag2 = "display: none;";
				$scope.hideTag3 = "display: none;";
				$scope.hideTag4 = "display: none;";
				$scope.hideTag5 = "display: none;";
			}
			else if($scope.listSize == 2)
			{
				$scope.hideTag1 = "display: inline;";
				$scope.hideTag2 = "display: inline;";
				$scope.hideTag3 = "display: none;";
				$scope.hideTag4 = "display: none;";
				$scope.hideTag5 = "display: none;";
			}
			else if($scope.listSize == 3)
			{
				$scope.hideTag1 = "display: inline;";
				$scope.hideTag2 = "display: inline;";
				$scope.hideTag3 = "display: inline;";
				$scope.hideTag4 = "display: none;";
				$scope.hideTag5 = "display: none;";
			}
			else if($scope.listSize == 4)
			{
				$scope.hideTag1 = "display: inline;";
				$scope.hideTag2 = "display: inline;";
				$scope.hideTag3 = "display: inline;";
				$scope.hideTag4 = "display: inline;";
				$scope.hideTag5 = "display: none;";
			}
			else if($scope.listSize == 5)
			{
				$scope.hideTag1 = "display: inline;";
				$scope.hideTag2 = "display: inline;";
				$scope.hideTag3 = "display: inline;";
				$scope.hideTag4 = "display: inline;";
				$scope.hideTag5 = "display: inline;";
			}
		}
		else if($scope.state == 6)
		{
			$scope.hideButtonStart = "display: none;";
			$scope.hideButtonBack = "display: none;";
			$scope.hideButtonNext = "display: none;";
			$scope.hideButtonFinish = "display: none;";
			$scope.hideButtonReload = "display: inline;";
			$scope.hideListParameters = "display: none;";

			$scope.hideRange = "display: none;";
			$scope.hideNumber = "display: none;";
			$scope.hideNumberTags = "display: none;";
			$scope.hideTag = "display: none;";
		}
	}

	$scope.lastState = function()
	{
		if($scope.state > 1 && $scope.state <= 6)
		{
			$scope.state--;

			$scope.setElements();
			$scope.hideElements();
		}
	}

	$scope.nextState = function()
	{
		if($scope.state < 6)
		{
			$scope.state++;

			$scope.setElements();
			$scope.hideElements();
		}
		else
		{
			$scope.state = 1;

			$scope.setElements();
			$scope.hideElements();
		}
	}

	$scope.getAmount = function(Amount)
	{
		$scope.amountNum = Amount;

		$scope.amount = Amount;
	}

	$scope.getAmountNum = function(Amount, keyEvent)
	{
		if(keyEvent.which == 13)
		{
			$scope.amountNum = Amount;
			$scope.amount = Amount;
		}
	}

	$scope.getTags = function(number)
	{
		$scope.amountTags = number;
	}

	$scope.getNameTag = function(name, keyEvent)
	{
		if(keyEvent.which == 13)
		{
			$scope.nameTag = name;

			$scope.listTags.push($scope.nameTag);
			$scope.listSize++;

			$scope.nameTag = "";

			if($scope.listSize >= $scope.amountTags)
			{
				$scope.hideTag = "display: none;";
			}
			else
			{
			}
		}

	}

});
