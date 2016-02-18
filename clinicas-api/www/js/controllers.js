angular.module('starter.controllers', [])
.controller('MapCtrl',function($scope,$ionicLoading,$ionicPopup){
            var zokalo = {
                lat: -8.1090524,
                lng: -79.0215336
            }
            var miUbicacion = {};
            $scope.locateMe = function()
            {
                $ionicLoading.show({});
                navigator.geolocation.getCurrentPosition(function(pos){

                      miUbicacion.lat = pos.coords.latitude;
                      miUbicacion.lng = pos.coords.longitude;
                      $scope.map.setCenter(miUbicacion);
                      $ionicLoading.hide();
                      addMarker(miUbicacion);
                      traceRoute();

                },function(error){

                      $ionicLoading.hide();
                      $ionicPopup.alert({
                          title: 'Error de Localización',
                          template: error.message,
                          okType: 'button-assertive'
                    });
                })
            }
            addMarker = function(ubicacion)
            {
                var marker = new google.maps.Marker({
                    map: $scope.map,
                    position: ubicacion
                })
            }
            searchPlace = function()
            {
                
                var search = document.getElementById('search');
                var searchBox = new google.maps.places.SearchBox(search);
                $scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(search);
                
                searchBox.addListener('places_changed',function(){
                  
                    var places = searchBox.getPlaces();
                    places.forEach(function(place){
                        var ubicacion = place.geometry.location;
                        addMarker(ubicacion);
                        $scope.map.setCenter(ubicacion);
                        addMarker(miUbicacion);

                    })
                })
            }
            traceRoute = function(){
                var directionDisplay = new google.maps.DirectionsReder({
                    map: $scope.map
                });
                
                var request ={
                    destination: zokalo,
                    origin: miUbicacion,
                    travelMode: google.maps.TravelMode.WALKING
                }
                var directionsService = new google.maps.DirectionsService();
                   directionsService.route(request,function(response,status){
                    if( status == google.maps.DirectionsStatus.OK)
                    {
                        directionsDisplay.setDirections(response)
                    }
                })
            }
            initMap = function(){
                var mapDiv = document.getElementById('map');
                var mapOptions = {
                    center: zokalo,
                    zoom: 15
                }
                $scope.map = new google.maps.Map(mapDiv,mapOptions)
                searchPlace();
                
            }
            if( document.readyState === "complete")
            {
                initMap();
            }
            else
            {
                google.maps.event.addDomListener(window,'load',initMap)
            }
})
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
