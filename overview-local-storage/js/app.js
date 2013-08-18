App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});

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

App.IndexController = Ember.ArrayController.extend({
  
  addRandomLocation: function() {
      randonLat = 100 + Math.random()*100;
      randonLng = 100 + Math.random()*100;
      newLocation = App.Location.createRecord({latitude: randonLat, longitude:randonLng});
      newLocation.get("store").commit();
  }

});




