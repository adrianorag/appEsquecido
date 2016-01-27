angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$cordovaLocalNotification, $ionicPlatform,NotificationFactory,ContadorFactory) {
      $scope.alerta ={
        tempoAlerta : 0,
        tituloAlerta : "",
        tempoAlertaEscrito: "Informe um tempo o lembrete"
      };

      $scope.addTime = function(tempoMin){
        $scope.alerta.tempoAlerta += tempoMin;
        $scope.refreshTempoEscrito();
      }

      $scope.resetForm = function(){
        $scope.alerta.tempoAlerta = 0;
        $scope.alerta.tituloAlerta= '';
        $scope.refreshTempoEscrito();
      }

      $scope.refreshTempoEscrito = function(){
        var min= $scope.alerta.tempoAlerta;

        if(min ==0){
          $scope.alerta.tempoAlertaEscrito= 'Informe um tempo para o lembrete';
          return;
        }

        //dia = 14400 min
        var dia=parseInt((min/1440));
        min = (min % 1440);
        //hora = 60 min
        var hora=parseInt((min/60));
        min = (min % 60);

        var texto= 'Me lembre daqui ';
        if(dia>0)
          texto =  texto + dia +' d ';
        if(hora>0)
          texto =  texto + hora +' h ';
        if(min>0)
          texto =  texto + min+' min';

        texto = texto + '!!!';
        $scope.alerta.tempoAlertaEscrito= texto;
      }


      $ionicPlatform.ready(function () {
        $scope.createSingleNotification = function () {
          var now = new Date().getTime();
          var tempoMin = $scope.alerta.tempoAlerta * 60;
          var _timeAlert = new Date(now + $scope.alerta.tempoAlerta * 60 * 1000);

          var newNotification = {title: 'Lembre-se', id: ContadorFactory.get(), text: $scope.alerta.tituloAlerta,  at: _timeAlert, tempoMin: tempoMin };
          NotificationFactory.add(newNotification);

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

      });
})

.controller('ListCtrl', function($scope, $cordovaLocalNotification,NotificationFactory) {
  $scope.cancelNotificantion = function(itemNotification){
    console.log(itemNotification.id);
    $cordovaLocalNotification.cancel(itemNotification.id);
    NotificationFactory.remove(itemNotification);
    $scope.refreshListNotification();
  };

  $scope.refreshListNotification = function(){
    var listNotification = NotificationFactory.all();
    var dataAtual = Date();
    angular.forEach(listNotification, function(obj, key) {
        obj.dataPassada =new Date(dataAtual).getTime()> new Date(obj.at).getTime();

    }, this);

    $scope.listNotification= listNotification;
  }

  $scope.refreshListNotification();
});
