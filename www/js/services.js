angular.module('starter.services', [])

.factory('NotificationFactory', function() {

  var listNotification = window.localStorage.getItem("listNotification");
  listNotification = listNotification == null ? [] : JSON.parse(listNotification);

  return {
    all: function(){
      return listNotification;
    },
    get: function(id) {
      for (var i = 0; i < listNotification.length; i++) {
        if (listNotification[i].id === parseInt(id)) {
          return listNotification[i];
        }
      }
      return null;
    },
    add:function(newNotification){
      listNotification.push(newNotification);
      window.localStorage.setItem("listNotification",JSON.stringify(listNotification));
    },
    remove:function(notification){
      angular.forEach(listNotification, function (item,i){
        if(item.id == notification.id){
          listNotification.splice(i, 1);
          window.localStorage.setItem("listNotification",JSON.stringify(listNotification));
          return true;
        }
      });
      return false;
    }
  };
})

.factory('ContadorFactory', function() {
  var contador = window.localStorage.getItem("contador");
  this.contador = this.contador == null ? 1 : parseInt(this.contador);

  return {
    get: function(){
      contador++;
      window.localStorage.setItem("contador",this.contador);
      return this.contador;
    }
  };
})
;
