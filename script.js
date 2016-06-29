var app = angular.module('portal', ['ui.router', 'ngAnimate', 'ui.bootstrap']);


app.controller("projectsCtrl", function($scope, $http, $window){
  $http.get("projects.php").success(function(data){
    $scope.listOfProjects = data;
    $window.projects = $scope.listOfProjects;
  })

  $scope.filterByID = function(id){
    $scope.singleProject = $window.projects;
    var result = $scope.singleProject.filter(function( obj ) {
        return obj.id == id;
    })
    $window.filtered = result;
  }
});

app.controller("singleProjectCtrl", function($scope, $window){
  $scope.filteredProject = $window.filtered;
});


app.controller('registerCtrl', function($scope, $http){
  $scope.isCollapsed = false;

  $scope.areas = [
    {
      value: 'Artificial Intelligence',
      label: 'Artificial Intelligence'
    },
    {
      value: 'Cognitive Science',
      label: 'Cognitive Science'
    },
    {
      value: 'Computer Engineering',
      label: 'Computer Engineering'
    },
    {
      value: 'Computer Graphics',
      label: 'Computer Graphics'
    },
    {
      value: 'Network',
      label: 'Network'
    },
    {
      value: 'Data Processing',
      label: 'Data Processing'
    },
    {
      value: 'Database Systems',
      label: 'Database Systems'
    },
    {
      value: 'Cybersecurity',
      label: 'Cybersecurity'
    },
    {
      value: 'Robotics',
      label: 'Robotics'
    },
    {
      value: 'Software Engineering',
      label: 'Software Engineering'
    },
    {
      value: 'System Analysis',
      label: 'System Analysis'
    },
    {
      value: 'Telecomunication Engineering',
      label: 'Telecomunication Engineering'
    },
    {
      value: 'Mobile',
      label: 'Mobile'
    },
    {
      value: 'Web Design',
      label: 'Web Design'
    }
  ]

  $scope.status = [
    {
      value: 'Active: Seeking Students',
      label: 'Active: Seeking Students'
    },
    {
      value: 'Active: Not Seeking Students',
      label: 'Active: Not Seeking Students'
    },
    {
      value: 'Dormant',
      label: 'Dormant'
    },
    {
      value: 'Completed',
      label: 'Completed'
    }
  ]

  $scope.insertDatabase = function(event){
    $scope.picturePath = $(".picturePath").val();
    var request = $http({
      method: "post",
      url: "register.php",
      data: {
          image         : $scope.picturePath,
          title         : $scope.title,
          description   : $scope.description,
          email         : $scope.email,
          externalLink  : $scope.externalLink,
          areaOfStudy   : $scope.areaList.value,
          students      : $scope.students,
          faculty       : $scope.faculty,
          status        : $scope.statusList.value,
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
