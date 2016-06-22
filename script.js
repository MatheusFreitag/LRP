var app = angular.module('portal', ['ui.router']);

app.controller("projectsCtrl", function($scope, $http){
  $http.get("projects.php").success(function(data){
    $scope.listOfProjects = data;
  })
});


app.controller('registerCtrl', function($scope, $http){
  $scope.insertDatabase = function(){
    var request = $http({
            method: "post",
            url: "register.php",
            data: {
                title: $scope.title,
                description: $scope.description,
                email: $scope.email,
                externalLink: $scope.externalLink,
                students: $scope.students,
                faculty: $scope.faculty,
                prerequisites: $scope.prerequisites,
                howToApply: $scope.howToApply,
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }
});


app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'home.html'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('projects', {
            url: '/projects',
            templateUrl: 'projects.html'
        })

        .state('register', {
            url: '/register',
            templateUrl: 'register.html'
        });

});
