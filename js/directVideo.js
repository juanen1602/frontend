angular.module("AppCamera", [])
	.controller("videoandparameters", function($scope, $http){

	$scope.url = "http://192.168.43.177:8000";

	$scope.brightnessSlider = 0;
	$scope.brightnessNumber = 0;
	$scope.brightnessMin = 0;
	$scope.brightnessMax = 63;

	$scope.gammaSlider = 100;
	$scope.gammaNumber = 100;
	$scope.gammaMin = 1;
	$scope.gammaMax = 500;

	$scope.gainSlider = 260;
	$scope.gainNumber = 260;
	$scope.gainMin = 260;
	$scope.gainMax = 1023;

	$scope.exposureSlider = 33;
	$scope.exposureNumber = 33300;
	$scope.exposureMin = 100;
	$scope.exposureMax = 3600000000;

	$scope.nameButton = "Start Video";
	$scope.streaming = false;
	$scope.refresh = null;
	$scope.video = null;
	$scope.hidden = "display: none;";
	$scope.hiddenStopped = "display: inline";


	$scope.getBrightness = function()
	{
		$http({
			method: 'GET',
			url: $scope.url + '/GetParameters/Brightness',
		}).then(function successCallback(response){
			console.log(response.data);
			$scope.brightnessSlider = response.data.Value.CurrentValue;
			$scope.brightnessNumber = response.data.Value.CurrentValue;
			$scope.brightnessMin = response.data.Value.MinValue;
			$scope.brightnessMax = response.data.Value.MaxValue;
		}, function errorCallback(response){
			console.log(response.statusText);
		});
	}


	$scope.getGamma = function()
	{
			$http({
			method: 'GET',
			url: $scope.url + '/GetParameters/Gamma',
		}).then(function successCallback(response){
			console.log(response.data);
			$scope.gammaSlider = response.data.Value.CurrentValue;
			$scope.gammaNumber = response.data.Value.CurrentValue;
			$scope.gammaMin = response.data.Value.MinValue;
			$scope.gammaMax = response.data.Value.MaxValue;
		}, function errorCallback(response){
			console.log(response.statusText);
		});
	}


	$scope.getGain = function()
	{
		$http({
			method: 'GET',
			url: $scope.url + '/GetParameters/Gain',
		}).then(function successCallback(response){
			console.log(response.data);
			$scope.gainSlider = response.data.Value.CurrentValue;
			$scope.gainNumber = response.data.Value.CurrentValue;
			$scope.gainMin = response.data.Value.MinValue;
			$scope.gainMax = response.data.Value.MaxValue;
		}, function errorCallback(response){
			console.log(response.statusText);
		});

	}


	$scope.getExposure = function()
	{
		$http({
			method: 'GET',
			url: $scope.url + '/GetParameters/Exposure',
		}).then(function successCallback(response){
			console.log(response.data);
			$scope.exposureNumber = response.data.Value.CurrentValue;
			$scope.exposureMin = response.data.Value.MinValue;
			$scope.exposureMax = response.data.Value.MaxValue;

			var minp = 0;
			var maxp = 100;

			var minv = Math.log($scope.exposureMin);
			var maxv = Math.log($scope.exposureMax);

			var scale = (maxv - minv) / (maxp - minp);

			var position = (Math.log($scope.exposureNumber) - minv) / scale + minp;

			$scope.exposureSlider = Math.round(position);

		}, function errorCallback(response){
			console.log(response.statusText);
		});
	}


	$scope.putBrightness = function(position)
	{
		$scope.brightnessNumber = position;

		var dat = {Value: position};
		var json = JSON.stringify(dat);

		$http({
			method: 'PUT',
			url: $scope.url + '/SetParameters/Brightness',
			data: json,
		}).then(function successCallback(response){
			console.log(response.data);
			$scope.brightness = response.data.Message;
		}, function errorCallback(response){
			console.log(response.statusText);
		});

	}


	$scope.putBrightnessNum = function(value, keyEvent)
	{
		if(keyEvent.which == 13)
		{
			$scope.brightnessSlider = value;

			var dat = {Value: value};
			var json = JSON.stringify(dat);

			$http({
				method: 'PUT',
				url: $scope.url + '/SetParameters/Brightness',
				data: json,
			}).then(function successCallback(response){
				console.log(response.data);
				$scope.brightness = response.data.Message;
			}, function errorCallback(response){
				console.log(response.statusText);
			});

		}
	}


	$scope.putGamma = function(position)
	{
		$scope.gammaNumber = position;

		var dat = {Value: position};
		var json = JSON.stringify(dat);

		$http({
			method: 'PUT',
			url: $scope.url + '/SetParameters/Gamma',
			data: json,
		}).then(function successCallback(response){
			console.log(response.data);
			$scope.gamma = response.data.Message;
		}, function errorCallback(response){
			console.log(response.statusText);
		});
	}


	$scope.putGammaNum = function(value, keyEvent)
	{
		if(keyEvent.which == 13)
		{
			$scope.gammaSlider = value;

			var dat = {Value: value};
			var json = JSON.stringify(dat);

			$http({
				method: 'PUT',
				url: $scope.url + '/SetParameters/Gamma',
				data: json,
			}).then(function successCallback(response){
				console.log(response.data);
				$scope.gamma = response.data.Message;
			}, function errorCallback(response){
				console.log(response.statusText);
			});

			$scope.gammaput = null;
		}
	}


	$scope.putGain = function(position)
	{
		$scope.gainNumber = position;

		var dat = {Value: position};
		var json = JSON.stringify(dat);

		$http({
			method: 'PUT',
			url: $scope.url + '/SetParameters/Gain',
			data: json,
		}).then(function successCallback(response){
			console.log(response.data);
			$scope.gain = response.data.Message;
		}, function errorCallback(response){
			console.log(response.statusText);
		});
	}


	$scope.putGainNum = function(value, keyEvent)
	{
		if(keyEvent.which == 13)
		{
			$scope.gainSlider = value;

			var dat = {Value: value};
			var json = JSON.stringify(dat);

			$http({
				method: 'PUT',
				url: $scope.url + '/SetParameters/Gain',
				data: json,
			}).then(function successCallback(response){
				console.log(response.data);
				$scope.gain = response.data.Message;
			}, function errorCallback(response){
				console.log(response.statusText);
			});

		}
	}


	$scope.putExposure = function(position)
	{
		var minp = 0;
		var maxp = 100;

		var minv = Math.log(100);
		var maxv = Math.log(3600000000);

		var scale = (maxv - minv) / (maxp - minp);

		$scope.exposureNumber = Math.exp(minv + scale*(position - minp));

		$scope.exposureNumber = Math.round($scope.exposureNumber/100)*100;

		var value = $scope.exposureNumber;

		var dat = {Value: value};
		var json = JSON.stringify(dat);

		$http({
			method: 'PUT',
			url: $scope.url + '/SetParameters/Exposure',
			data: json,
		}).then(function successCallback(response){
			console.log(response.data);
			$scope.exposure = response.data.Message;
		}, function errorCallback(response){
			console.log(response.statusText);
		});
	}


	$scope.putExposureNum = function(value, keyEvent)
	{
		if(keyEvent.which == 13)
		{
			var roundedValue = Math.round(value/100)*100;

			$scope.exposureNumber = roundedValue;

			var minp = 0;
			var maxp = 100;

			var minv = Math.log(100);
			var maxv = Math.log(3600000000);

			var scale = (maxv - minv) / (maxp - minp);

			var position = (Math.log(roundedValue) - minv) / scale + minp;

			$scope.exposureSlider = Math.round(position);

			var dat = {Value: value};
			var json = JSON.stringify(dat);

			$http({
				method: 'PUT',
				url: $scope.url + '/SetParameters/Exposure',
				data: json,
			}).then(function successCallback(response){
				console.log(response.data);
				$scope.exposure = response.data.Message;
			}, function errorCallback(response){
				console.log(response.statusText);
			});

		}
	}


	$scope.setUp = function()
	{
		$http({
			method: 'GET',
			url: $scope.url + '/VideoStreaming2',
		}).then(function successCallback(response){
			console.log(response.data);
		}, function errorCallback(response){
			console.log(response.statusText);
		});
	}

	$scope.loop = function()
	{

		var timestamp = Date.now();
		var timestampStr = timestampStr + '';

		$scope.video = $scope.url + '/Photo/video' + '?' + timestamp;

		$http({
			method: 'GET',
			url: $scope.video,
		}).then(function successCallback(response){
			console.log("Updating picture timestamp:" + timestamp);
		}, function errorCallback(response){
			console.log(response.statusText);
		});
	}

	$scope.stop = function()
	{
		$http({
			method: 'GET',
			url: $scope.url + '/VideoStreamingOff2',
		}).then(function successCallback(response){
			console.log("Stopped Streaming");
		}, function errorCallback(response){
			console.log(response.statusText);
		});
	}


	$scope.obtainVideo = function()
	{
		if($scope.streaming == false)
		{
			$scope.streaming = true;
			$scope.nameButton = "Stop Video";
			$scope.hidden = "display: inline;";
			$scope.hiddenStopped = "display: none;";

			$scope.setUp();
			$scope.refresh = setInterval($scope.loop, 500);
		}
		else if($scope.streaming == true)
		{
			$scope.streaming = false;
			$scope.nameButton = "Start Video";
			$scope.hidden = "display: none;";
			$scope.hiddenStopped = "display: inline;";

			clearInterval($scope.refresh);

			$scope.stop();
		}
	}


	$scope.Init = function()
	{
		$scope.getBrightness();
		$scope.getGamma();
		$scope.getGain();
		$scope.getExposure();
	}


	$scope.Init();

});
