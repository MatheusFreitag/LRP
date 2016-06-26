function singleProject($scope, $http) {
    // this is where the JSON from api.php is consumed
    $http.get('singleProject.php').
        success(function(data) {
            // here the data from the api is assigned to a variable named users
            $scope.singleProject = data;
        });
}
