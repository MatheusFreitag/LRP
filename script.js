var app = angular.module('portal', []);
app.controller("projectsListCtrl", function($scope, $http){
  $http.get("projects.php").success(function(data){
    $scope.listOfProjects = data;
  })
});
