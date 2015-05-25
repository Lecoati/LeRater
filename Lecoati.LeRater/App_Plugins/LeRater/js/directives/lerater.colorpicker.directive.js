angular.module('umbraco')
.directive('leColorPicker',
['assetsService',
function(assetsService) {

    assetsService.loadCss('/umbraco/lib/spectrum/spectrum.css');

    return {
        scope: {
            selectedColor: '=leColorPicker'
        },
        link: function($scope, $element, $attributes) {
            $scope.localColor = '';

            $element.spectrum({
                color: $scope.selectedColor,
                allowEmpty: true,
                showInitial: false,
                chooseText: 'choose',
                cancelText: 'cancel',
                preferredFormat: 'hex',
                showInput: true,
                clickoutFiresChange: false,
                show: function() {
                    $scope.localColor = $scope.selectedColor;
                },
                move: function(color) {
                    $scope.$apply(function() {
                        if (color) {
                            $scope.selectedColor = color.toHexString();
                        } else {
                            $scope.selectedColor = '';
                        }
                    });
                },
                change: function(color) {
                    if (color) {
                        $scope.localColor = color.toHexString();
                    } else {
                        $scope.localColor = '';
                    }
                },
                hide: function() {
                    $scope.$apply(function() {
                        $scope.selectedColor = $scope.localColor;
                    });
                }
            });

        }
    };

}]);
