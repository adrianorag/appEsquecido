angular.module('starter.services', [])

.factory('Chats', function() {
  var listNotification = window.localStorage.getItem("listNotification");
  listNotification = listNotification == null ? [] : JSON.parse(listNotification);

  return {
    all: function(){
      return listNotification;
    },
    add:function(newNotification){
      listNotification.push(newNotification);
      window.localStorage.setItem("listNotification",JSON.stringify(listNotification));
    }


  };
})
.factory('contador', function() {
  var listNotification = window.localStorage.getItem("listNotification");
  listNotification = listNotification == null ? [] : JSON.parse(listNotification);

  return {
    all: function(){
      return listNotification;
    },
    add:function(newNotification){
      listNotification.push(newNotification);
      window.localStorage.setItem("listNotification",JSON.stringify(listNotification));
    }


  };
})
;
