var app = angular.module('portal', ['ui.router', 'ngAnimate', 'ui.bootstrap', 'ngRoute', 'toaster']);


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
  $scope.required = true;

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
    var valid = ($scope.picturePath &&
                  $scope.title &&
                  $scope.description
                  && $scope.email
                  && $scope.externalLink
                  && $scope.areaList.value
                  && $scope.students
                  &&$scope.faculty
                  && $scope.statusList.value
                  && $scope.prerequisites
                  && $scope.howToApply
    );

    if (valid){
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
    }
    else{
      alert("All fields are required!");
    }

    if (valid){
      $scope.isCollapsed    = !$scope.isCollapsed;
    }
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


app.controller('authCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data) {
    //initially set those objects to null to avoid undefined error
    $scope.login = {};
    $scope.signup = {};
    $scope.doLogin = function (customer) {
        Data.post('login', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('dashboard');
            }
        });
    };
    $scope.signup = {email:'',password:'',name:'',phone:'',address:''};
    $scope.signUp = function (customer) {
        Data.post('signUp', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('dashboard');
            }
        });
    };
    $scope.logout = function () {
        Data.get('logout').then(function (results) {
            Data.toast(results);
            $location.path('login');
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
            url: '/login',
            templateUrl: 'login.html',
            controller: 'authCtrl'
        })
        .state('singleProject', {
            url: '/sp',
            templateUrl: 'singleProject.html'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'signup.html',
            controller: 'authCtrl'
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'register.html',
            controller: 'authCtrl'
        })
        .state('logout', {
            url: '/logout',
            templateUrl: 'login.html',
            controller: 'logoutCtrl'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'about.html'
        });
}).run(function ($rootScope, $location, Data) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        $rootScope.authenticated = false;
        Data.get('session').then(function (results) {
            if (results.uid) {
                $rootScope.authenticated = true;
                $rootScope.uid = results.uid;
                $rootScope.name = results.name;
                $rootScope.email = results.email;
            } else {
                var nextUrl = next.$$route.originalPath;
                if (nextUrl == '/signup' || nextUrl == '/login') {

                } else {
                    $location.path("/login");
                }
            }
        });
    });
});

app.factory("Data", ['$http', 'toaster',
    function ($http, toaster) { // This service connects to our REST API

        var serviceBase = 'api/v1/';

        var obj = {};
        obj.toast = function (data) {
            toaster.pop(data.status, "", data.message, 10000, 'trustedHtml');
        }
        obj.get = function (q) {
            return $http.get(serviceBase + q).then(function (results) {
                return results.data;
            });
        };
        obj.post = function (q, object) {
            return $http.post(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.put = function (q, object) {
            return $http.put(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.delete = function (q) {
            return $http.delete(serviceBase + q).then(function (results) {
                return results.data;
            });
        };

        return obj;
}]);

app.directive('focus', function() {
    return function(scope, element) {
        element[0].focus();
    }
});

app.directive('passwordMatch', [function () {
    return {
        restrict: 'A',
        scope:true,
        require: 'ngModel',
        link: function (scope, elem , attrs,control) {
            var checker = function () {

                //get the value of the first password
                var e1 = scope.$eval(attrs.ngModel);

                //get the value of the other password
                var e2 = scope.$eval(attrs.passwordMatch);
                if(e2!=null)
                return e1 == e2;
            };
            scope.$watch(checker, function (n) {

                //set the form control to valid if both
                //passwords are the same, else invalid
                control.$setValidity("passwordNoMatch", n);
            });
        }
    };
}]);
