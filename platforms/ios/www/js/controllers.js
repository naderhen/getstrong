angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
})

.controller('HomeCtrl', function($scope) {
	console.log('home', $scope);
})

.controller('BuildWorkoutCtrl', function($scope) {
	$scope.exercises = [
		{name: "Squat", weight: 135, weight_increment: 20, set_reps: [12, 10, 8, 6], sets: []},
		{name: "Bench Press", weight: 135, weight_increment: 20, set_reps: [5, 5, 5], sets: []},
		{name: "Overhead Press", weight: 65, weight_increment: 20, set_reps: [10, 6, 4, 2, 1], sets: []}
	]

	_.each($scope.exercises, function(exercise) {
		_.each(exercise.set_reps, function(rep_num, idx) {
			exercise.sets.push({weight: (idx == 0 ? exercise.weight : exercise.sets[idx - 1].weight) + exercise.weight_increment, prescribed_reps: rep_num, accomplished_reps: 0});
		})
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
