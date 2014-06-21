angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
})

.controller('HomeCtrl', function($scope) {
	console.log('home', $scope);
})

.controller('SelectRoutineCtrl', function($scope, $http, $state) {
	$http({method: 'GET', url: 'http://192.168.1.4:3000/routines'}).
		success(function(data, status, headers, config) {
			$scope.routines = data;
			console.log(data)
		}).
		error(function(data, status, headers, config) {
			alert('error');
		});

	$scope.selectRoutine = function(routine) {
		$state.go('app.build_workout', {routineId: routine.id})
	}
})

.controller('BuildWorkoutCtrl', function($scope, $http, $ionicPopup, $stateParams) {
	$scope.workout = {
		setGroups: []
	}

	$http({method: 'GET', url: 'http://192.168.1.4:3000/routines/' + $stateParams.routineId}).
		success(function(data, status, headers, config) {
			$scope.routine = data;
		}).
		error(function(data, status, headers, config) {
			alert('error');
		});

	$scope.buildWorkout = function() {
		_.each($scope.routine.steps, function(step) {
			var setGroup = {exercise: step.exercise, worksets: []};
			$scope.workout.setGroups.push(setGroup);
			_.each(step.set_reps, function(rep_num, idx) {
				var new_weight = 
				setGroup.worksets.push({ exercise: step.exercise, weight: (idx == 0 ? step.start_weight : setGroup.worksets[idx - 1].weight) + step.weight_increment, prescribed_reps: rep_num, accomplished_reps: 0 })
			});
		})
	}

	$scope.$watch('routine', function(val) {
		if (typeof val !== "undefined") {
			$scope.buildWorkout();
		}
	})

	$scope.clickSet = function(set) {
		if (set.accomplished_reps == 0) {
			set.accomplished_reps = set.prescribed_reps;
		} else {
			set.accomplished_reps = set.accomplished_reps - 1;
		}
	}

	$scope.finish = function() {
		var successful_exercises = _.filter($scope.exercises, function(exercise) {
			return _.map(exercise.sets, function(set) {
				return set.prescribed_reps == set.accomplished_reps;
			})
		})

		console.log(successful_exercises)
	}
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})
