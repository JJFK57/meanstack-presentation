angular.module('app.articles', ['ngAnimate'])

  .constant('TPL_PATH', '/templates')

  .constant('API_PATH', 'http://localhost:3000')

  .config(function($routeProvider, TPL_PATH) {
    $routeProvider.when('/',{
      controller : 'HomeCtrl',
      templateUrl : TPL_PATH + '/index.html'
    });
    $routeProvider.when('/new-article',{
      controller : 'FormCtrl',
      templateUrl : TPL_PATH + '/form.html'
    });
    $routeProvider.when('/articles/:id',{
      controller : 'ShowCtrl',
      templateUrl : TPL_PATH + '/show.html'
    });
  })

  .filter('html', function($sce) {
    return function(text) {
      text = text.replace("\n","\n<br />");
      text = $sce.trustAsHtml(text);
      return text;
    };
  })

  .filter('firstLine', function() {
    return function(text) {
      var split = text.split("\n")[0];
      return split[0] + (split.length > 1 ? ' ...' : '');
    };
  })

  .controller('HomeCtrl', function($scope, $http, API_PATH) {
    $http.get(API_PATH + '/articles').success(function(articles) {
      $scope.articles = articles;
    });
  })

  .controller('ShowCtrl', function($scope, $http, $routeParams, API_PATH) {
    var url = API_PATH + '/articles/' + $routeParams.id;
    $http.get(url).success(function(article) {
      $scope.article = article;
    });
  })

  .controller('FormCtrl', function($scope, $http, $location, API_PATH) {
    $scope.article = {};
    $scope.submit = function() {
      if($scope.myForm.$valid) {
        $http.post(API_PATH + '/articles', $scope.article).then(function(article) {
          $location.path('/');
        });
      }
    };
  });
