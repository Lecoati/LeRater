angular.module('umbraco')
.controller('LeRater.controller',
['$scope',
function($scope) {

    // This variable helps us to restore the icons to the original rating after
    // an hover event.
    var originalRating = 0;

    $scope.lerater = {};
    $scope.lerater.showSelected = ($scope.model.config.showSelected === '1');
    $scope.lerater.showOnHover = ($scope.model.config.showOnHover === '1');
    $scope.lerater.changeColorOnHover = ($scope.model.config.changeColorOnHover === '1');

    // Set a default maximum rating if there isn't one.
    if (!$scope.model.config.maxRating) {
        $scope.model.config.maxRating = 5;
    }

    // Default rating when the user hasn't selected anything
    if ($scope.model.value == null || $scope.model.value === '') {
        $scope.model.value = 0;
    }

    // Initialize icons
    initIcons($scope.model.value);
    originalRating = $scope.model.value;

    // Sets the rating or cleans it if the user clicks twice on the same
    // icon
    $scope.toggleRating = function(rating) {
        rating += 1;
        if (rating !== $scope.model.value) {
            $scope.model.value = rating;
        } else {
            $scope.model.value = 0;
        }
        originalRating = $scope.model.value;
        updateIcons($scope.model.value);
    };

    // Show the rating of the hovered icon.
    $scope.showHoveredRating = function(rating) {
        rating += 1;
        $scope.lerater.hoveredRating = rating;

        if ($scope.lerater.changeColorOnHover)
            updateIcons(rating);
    };

    // Restore the original rating after an hover event.
    $scope.clearHoveredRating = function() {
        if (!$scope.lerater.hoveredRating) return;

        $scope.lerater.hoveredRating = 0;
        updateIcons(originalRating);
    };

    // Initialize the icons setting which ones should be on
    function initIcons(currentRating) {
        currentRating = parseInt(currentRating, 10);
        $scope.lerater.icons = [];
        for(var i = 0; i < $scope.model.config.maxRating; i++) {
            $scope.lerater.icons.push({
                rating: i,
                color: (i < currentRating)
                       ? $scope.model.config.icon.onColor
                       : $scope.model.config.icon.offColor
            });
        }
    }

    // Updates which icons should be on
    function updateIcons(currentRating) {
        currentRating = parseInt(currentRating, 10);
        $scope.lerater.icons.forEach(function(icon) {
            icon.color = (icon.rating < currentRating)
                         ? $scope.model.config.icon.onColor
                         : $scope.model.config.icon.offColor;
        });
    }

}]);
