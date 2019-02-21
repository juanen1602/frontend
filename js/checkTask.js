angular.module("AppCheckTask", [])
	.controller("taskList", function($scope, $http){

	$scope.url = "http://192.168.43.177:8000";
	$scope.currentTask = 0;
	$scope.stateCurrentTask = "";
	$scope.counter = 0;
	$scope.nRequest = 0;

	$scope.listTask = [];
	$scope.listColor = [];

	$scope.init = function()
	{

		var i=0;

		while(i < 25)
		{
			var member = [i+1, "display: none;", "Pending", "color: #0FF413;"];
			$scope.listTask.push(member);
			i++;
		}

	}

	$scope.checkCurrentTask = function()
	{
		$http({
			method: 'GET',
			url: $scope.url + '/GetCurrentTask',
		}).then(function successCallback(response){
			console.log(response.data);
			$scope.currentTask = response.data.Value;
		}, function errorCallback(response){
			console.log(response.statusText);
		});
	}

	$scope.refresh = function()
	{
		$scope.counter++;
		$http({
			method: 'GET',
			url: $scope.url + '/Task/' + $scope.currentTask.toString(),
		}).then(function successCallback(response){
			console.log(response.data);
			$scope.currentTask = response.data.currentTask;
			$scope.stateCurrentTask = response.data.Status;
			$scope.nRequest = response.data.nRequest;

		}, function errorCallback(response){
			console.log(response.statusText);
		});


		if($scope.nRequest > 0 && $scope.nRequest <= 25)
		{
			var i=0;

			while(i < $scope.nRequest)
			{
				$scope.listTask[i][1] = "display: block;";
				i++;
			}

			if($scope.currentTask > 1)
			{
				var j=0;
				while(j < $scope.currentTask-1)
				{
					$scope.listTask[j][2] = "Done";
					$scope.listTask[j][3] = "color: #0FF413;";
					j++;
				}

				$scope.listTask[$scope.currentTask-1][2] = "Running";
				$scope.listTask[$scope.currentTask-1][3] = "color: #F7EF02;";

				j = $scope.currentTask;
				while(j < $scope.nRequest)
				{
					$scope.listTask[j][2] = "Pending";
					$scope.listTask[j][3] = "color: #E61414;";
					j++;
				}
			}

			else if($scope.currentTask == 1)
			{
				$scope.listTask[0][2] = "Running";
				$scope.listTask[0][3] = "color: #F7EF02;";

				var j=1;
				while(j < $scope.nRequest)
				{
					$scope.listTask[j][2] = "Pending";
					$scope.listTask[j][3] = "color: #E61414;";
					j++;
				}
			}

		}

		else if($scope.nRequest > 25)
		{
			var i=0;

			while(i < 25)
			{
				$scope.listTask[i][1] = "display: block;";
				i++;
			}

			var resta = $scope.listTask[24][0] - $scope.currentTask;

			var j=0;

			while(j < $scope.currentTask-$scope.listTask[0][0])
			{
				$scope.listTask[j][2] = "Done";
				$scope.listTask[j][3] = "color: #0FF413;";
				j++;
			}

			j = $scope.currentTask-$scope.listTask[0][0];

			$scope.listTask[j][2] = "Running";
			$scope.listTask[j][3] = "color: #F7EF02;";

			j = $scope.currentTask-$scope.listTask[0][0]+1;

			while(j < 25)
			{
				$scope.listTask[j][2] = "Pending";
				$scope.listTask[j][3] = "color: #E61414;";
				j++;
			}

			if(($scope.listTask[24][0] - $scope.currentTask < 19) && ($scope.listTask[24][0] < $scope.nRequest))
			{
				var member = [$scope.listTask[24][0]+1, "display: block;", "Pending", "color: #E61414;"];

				$scope.listTask.shift();
				$scope.listTask.push(member);
			}

		}
		else
		{

		}


	}

	$scope.loop = function()
	{
		setInterval($scope.refresh, 2000);
	}

	$scope.init();

	$scope.checkCurrentTask();

	$scope.loop();

});
