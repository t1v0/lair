/* globals Template Meteor Session StatusMap */

Template.hostList.events({
  'click .flag-enabled': function () {
    Meteor.call('disableHostFlag', this.projectId, this._id)
  },

  'click .flag-disabled': function () {
    Meteor.call('enableHostFlag', this.projectId, this._id)
  },

  'click .service-flag-enabled': function () {
      Meteor.call('disableServiceFlag', this.projectId, this._id)
  },

   'click .service-flag-disabled': function () {
      Meteor.call('enableServiceFlag', this.projectId, this._id)
   },

  'click #flag-filter-enable': function () {
    Session.set('hostListFlagFilter', 'enabled')
  },

  'click #flag-filter-disable': function () {
    Session.set('hostListFlagFilter', null)
  },

  'click .host-status-button': function (event) {
    var id = 'hostListStatusButton' + event.target.id
    if (Session.equals(id, null) || typeof Session.get(id) === 'undefined') {
      Session.set(id, 'disabled')
      return
    }
    Session.set(id, null)
  },

  'keyup #host-list-search': function (event, tpl) {
    Session.set('hostListSearch', tpl.find('#host-list-search').value)
  },

  'click #remove-host-list-search': function (event, tpl) {
    tpl.find('#host-list-search').value = ''
    Session.set('hostListSearch', null)
  },

  'click .host-status': function () {
    var status = StatusMap[StatusMap.indexOf(this.status) + 1]
    if (StatusMap.indexOf(this.status) === 4) {
      status = StatusMap[0]
    }
    Meteor.call('setHostStatus', this.projectId, this._id, status)
  },

   'click .service-status': function () {
       var status = StatusMap[StatusMap.indexOf(this.status) + 1]
       if (StatusMap.indexOf(this.status) === 4) {
           status = StatusMap[0]
       }
       Meteor.call('setServiceStatus', this.projectId, this._id, status)
   },

  'click .remove-tag': function (event, tpl) {
    var hostId = event.target.id.replace('remove-tag-', '')
    Meteor.call('removeHostTag', tpl.data.projectId, hostId, this.valueOf())
  },

  'click #load-more': function () {
    var viewIncrement = Session.get('viewIncrement') || 25
    var previousLimit = Session.get('hostViewLimit') || viewIncrement
    var newLimit = previousLimit + viewIncrement
    Session.set('hostViewLimit', newLimit)
  },

  'click #load-all': function () {
    Session.set('hostViewLimit', 10000)
  },

  'click .note': function () {
    Modal.show('notesModal', this)
  }
})

Template.hostList.helpers({
    services: function(pid, hid) {
        var query = {
            projectId: pid,
            hostId: hid
        }

        return Services.find(query, {
            sort: {
                port: 1
            },
            limit: 10000
        }).fetch()
    }
  }

)