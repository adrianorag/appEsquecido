angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $cordovaLocalNotification, $ionicPlatform) {
      $scope.alerta ={
        tempoAlerta : 0,
        tituloAlerta : ""
      };

      $scope.addTime = function(tempoMin){
        $scope.alerta.tempoAlerta += tempoMin;
      }


      $scope.resetForm = function(){
        $scope.alerta.tempoAlerta = 0;
        $scope.alerta.tituloAlerta= '';
      }

      $ionicPlatform.ready(function () {
        $scope.createSingleNotification = function () {

          var listNotification = window.localStorage.getItem("listNotification");
          var contador = window.localStorage.getItem("contador");
          contador = contador == null ? 1 : parseInt(contador);
          listNotification = listNotification == null ? [] : JSON.parse(listNotification);

          var now = new Date().getTime();
          var tempoMin = $scope.alerta.tempoAlerta * 60;
          var _timeAlert = new Date(now + $scope.alerta.tempoAlerta * 60 * 1000);
          var _textAlert =  $scope.alerta.tituloAlerta;

          var newNotification = {title: 'Lembre-se', id: contador, text:_textAlert,  at: _timeAlert, tempoMin: tempoMin };
          listNotification.push(newNotification);

          contador ++;
          window.localStorage.setItem("listNotification",JSON.stringify(listNotification));
          window.localStorage.setItem("contador",contador);

          $cordovaLocalNotification.schedule({
            id:newNotification.id,
            title:newNotification.title,
            text:newNotification.text,
            at:newNotification.at,
          }).then(function (result) {
            console.log(newNotification.id);
          });

          $scope.resetForm();
        };

        $scope.cancelSingleNotification = function () {
          $cordovaLocalNotification.cancel(3).then(function (result) {
            console.log('Notification 3 Canceled');
          });
        };
      });
})

.controller('ListCtrl', function($scope, $cordovaLocalNotification) {
  var listNotification = window.localStorage.getItem("listNotification");
  listNotification = listNotification == null ? [] : JSON.parse(listNotification);

  var dataAtual = Date();
  angular.forEach(listNotification, function(value, key) {
      value.dataPassada =new Date(dataAtual).getTime()> new Date(value.at).getTime();
  }, this);

  $scope.listNotification= listNotification;

  $scope.cancelNotificantion = function(itemNotification){
    console.log(itemNotification.id);
    $cordovaLocalNotification.cancel(itemNotification.id);
    var lista = $scope.listNotification;
    angular.forEach($scope.listNotification, function (item,i){
      if(item.id == itemNotification.id){
        $scope.listNotification.splice(i, 1);
      }
    });
  };

});
