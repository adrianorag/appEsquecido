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

          $cordovaLocalNotification.schedule({
            id:newNotification.id,
            title:newNotification.title,
            text:newNotification.text,
            at:newNotification.at,
          }).then(function (result) {
            console.log(newNotification.id);
          });

          $scope.resetForm();
          contador ++;
          window.localStorage.setItem("listNotification",JSON.stringify(listNotification));
          window.localStorage.setItem("contador",contador);
        };

        $scope.scheduleSingleNotification = function () {
          $cordovaLocalNotification.schedule({
            id: 1,
            title: 'Warning',
            text: 'Youre so sexy!',
            data: {
              customProperty: 'custom value'
            }
          }).then(function (result) {
            console.log('Notification 1 triggered');
          });
        };

        $scope.scheduleDelayedNotification = function () {
          var now = new Date().getTime();
          var _10SecondsFromNow = new Date(now + 10 * 1000);

          $cordovaLocalNotification.schedule({
            id: 2,
            title: 'Warning',
            text: 'Im so late',
            at: _10SecondsFromNow
          }).then(function (result) {
            console.log('Notification 2 triggered');
          });
        };

        $scope.scheduleEveryMinuteNotification = function () {
          $cordovaLocalNotification.schedule({
            id: 3,
            title: 'Warning',
            text: 'Dont fall asleep',
            every: 'minute'
          }).then(function (result) {
            console.log('Notification 3 triggered');
          });
        };

        $scope.updateSingleNotification = function () {
          $cordovaLocalNotification.update({
            id: 2,
            title: 'Warning Update',
            text: 'This is updated text!'
          }).then(function (result) {
            console.log('Notification 1 Updated');
          });
        };

        $scope.cancelSingleNotification = function () {
          $cordovaLocalNotification.cancel(3).then(function (result) {
            console.log('Notification 3 Canceled');
          });
        };
      });
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  var listNotifation = window.localStorage.getItem("listNotifation");
  listNotifation = listNotifation == null ? [] : JSON.parse(listNotifation);
  $scope.listNotifation= listNotifation;

  $scope.settings = {
    enableFriends: true
  };
});
