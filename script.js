var dictionaryOfProjects = [];

//When document is ready, execute PHP <-> MySQL script:
$(document).ready(function(){
  //Retrieve the data from the database (works with the config.php script)
  $.ajax({
    //Basic configuration required
    url: 'config.php',
    data: "", //Not sending anything to the database, so remains null
    dataType: 'json',
    success: function(data){ //In case of success
      for (var x in data){ //For every row in the data
        var row = data[x]; //Separate the row
        dictionaryOfProjects.push({
          professor: row[1],
          titulo: row[2]
        });
      }
    }
  });

  //Control the toggle when Filter Search Button is clicked
  var down = true;
  $( "#filter" ).click(function() {
    $("#refine-search").slideToggle("slow");
    $("#refine-search").css("display", "block");
    if (down){
      $( ".demo-card-wide.mdl-card" ).animate({ "bottom": "-=120px" }, "slow" );
      $( "#footer" ).animate({ "bottom": "-=120px" }, "slow" );
      down=false;
    }
    else{
      $( ".demo-card-wide.mdl-card" ).animate({ "bottom": "+=120px" }, "slow" );
      down = true;
    }
  });
});

//AngularJS scripts goes here:
var app = angular.module("portal", []);
app.controller("projectsListCtrl", function($scope){
  $scope.listOfProjects = dictionaryOfProjects;
});


var databaseApp = angular.module("databaseApp", []);
databaseApp.controller("databaseCtrl",function($scope, $http){
  $scope.insertDatabase=function(){
    $http.post("register.php", {'databaseTitle':$scope.databaseTitle,'databaseDescription':$scope.databaseDescription})
    .success(function(data,status,headers,config){
      console.log("data successufully inserted!");
    });
  }
});
