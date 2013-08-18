App = Ember.Application.create();

App.Store = DS.Store.extend({
  revision: 12,
  adapter: 'App.LSAdapter'
});

App.LSAdapter = DS.LSAdapter.extend({
  namespace: 'locations-emberjs'
});

App.Location = DS.Model.extend({
    latitude: DS.attr('string'),
    longitude: DS.attr('string'),
    accuracy: DS.attr('string')
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return App.Location.find();
  }

});


App.LocationController = Ember.ObjectController.extend({
    // we need to have an item-controller in place....
    // the only reason this is here is to store the selected property.
});

App.IndexController = Ember.ArrayController.extend({
  
  editCounter: function () {
    return this.filterProperty('selected', true).get('length');
  }.property('@each.selected'),


  addRandomLocation: function() {
      randonLat = 100 + Math.random()*100;
      randonLng = 100 + Math.random()*100;
      newLocation = App.Location.createRecord({latitude: randonLat, longitude:randonLng});
      newLocation.get("store").commit();
  },


  deleteSelectedRecords: function() {
    arr = this.filterProperty('selected', true);
    if (arr.length==0) {
        output = "nothing selected";
    } else { 
        output = "";
        for (i=0 ; i<arr.length ; i++) { 
          arr[i].deleteRecord()
          arr[i].store.commit();
        }
       
    }
  }

});



