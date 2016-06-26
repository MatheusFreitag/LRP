var app = angular.module('portal', ['ui.router', 'ngAnimate', 'ui.bootstrap']);

app.controller("projectsCtrl", function($scope, $http){
  $http.get("projects.php").success(function(data){
    $scope.listOfProjects = data;
  })

  $scope.projectDetails = function(id){
    var request = $http({
      method: "post",
      url: "singleProject.php",
      data: { id : id },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
  }
});


app.controller('registerCtrl', function($scope, $http){
  $scope.isCollapsed = false;

  $scope.insertDatabase = function(event){
    var request = $http({
      method: "post",
      url: "register.php",
      data: {
          title         : $scope.title,
          description   : $scope.description,
          email         : $scope.email,
          externalLink  : $scope.externalLink,
          students      : $scope.students,
          faculty       : $scope.faculty,
          prerequisites : $scope.prerequisites,
          howToApply    : $scope.howToApply,
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    $scope.isCollapsed    = !$scope.isCollapsed;
    $scope.title          = "";
    $scope.description    = "";
    $scope.email          = "";
    $scope.externalLink   = "";
    $scope.students       = "";
    $scope.faculty        = "";
    $scope.prerequisites  = "";
    $scope.howToApply     = "";
    $scope.form.$setPristine();
    event.preventDefault();
  }

  $scope.closeAlert = function() {
    $scope.isCollapsed    = !$scope.isCollapsed;
  };

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
        })
        .state('singleProject', {
            url: '/sp',
            templateUrl: 'singleProject.html'
        });
});

app.controller("singleProjectCtrl", function($scope, $http){
  // this is where the JSON from api.php is consumed
  $http.get('singleProject.php').
      success(function(data) {
          // here the data from the api is assigned to a variable named users
          $scope.singleProject = data;
      });
});
