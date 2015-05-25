angular.module('umbraco')
.controller('LeRater.iconpicker.controller',
['$scope', 'dialogService',
function($scope, dialogService) {

    if (!$scope.model.value) {
        $scope.model.value = {
            selectedIcon: 'icon-rate',
            onColor: '#EFD765',
            offColor: '#333'
        }
    }

    $scope.chooseIcon = function() {
        dialogService.iconPicker({
            callback: function(selectedIcon) {
                $scope.model.value.selectedIcon = selectedIcon;
            }
        });
    };

}]);

