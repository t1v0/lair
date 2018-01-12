/* globals Template Router */

Template.hostSubnetNav.helpers({
  isSubnetActive: function (sid) {
  	var params = Router.current().params.sid
    if (params === sid ) {
      return 'active'
    }
  },

  isMainActive: function (name) { 
    if (Router.current().route.getName() === name) {
      return 'active'
    }
  }
})
