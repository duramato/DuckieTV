angular.module('DuckieTV.directives.sidepanel', [])

.directive('sidepanel', function(FavoritesService) {

    return {
        restrict: 'E',
        templateUrl: 'templates/sidepanel.html',
        link: function($scope, iElement, $rootScope) {

            $scope.serie = null;
            $scope.season = null;
            $scope.episode = null;

            $scope.isShowing = false;
            $scope.isExpanded = false;

            $scope.toggle = function() {
                $scope.isShowing ? $scope.hide() : $scope.show();

            };
            $scope.show = function() {
                $scope.isShowing = true;
                $scope.contract();
                $scope.zoomOut();
                iElement.addClass('active');
            };
            $scope.hide = function() {
                $scope.isShowing = false;
                $scope.zoomIn();
                iElement.removeClass('active');
            };

            $scope.expand = function() {
                $scope.show();
                $scope.isExpanded = true;
                iElement.addClass('expanded');
            };
            $scope.contract = function() {
                $scope.isExpanded = false;
                iElement.removeClass('expanded');
            }
        },
        controller: function($scope, $rootScope) {

            $rootScope.$on('serie:select', function() {

            });

            $scope.showSerie = function() {
                $scope.expand();
            };

            $scope.zoomOut = function() {
                setTimeout(function() {
                    $rootScope.$broadcast('calendar:zoomout');
                }, 50);
            };

            $scope.zoomIn = function() {
                setTimeout(function() {
                    $rootScope.$broadcast('calendar:zoomin');
                }, 50);
            }

            $rootScope.$on('episode:select', function(event, serie, episode) {
                console.log("Select episode!", serie, episode);
                $scope.serie = serie;
                $scope.episode = episode;
                $scope.show();
                setTimeout($scope.$digest, 50);
            });

            $rootScope.$on('season:select', function() {

            });
        }
    };
});