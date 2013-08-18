App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});

App.Store = DS.Store.extend({
  revision: 12,
  adapter: 'DS.FixtureAdapter'
});


App.Location = DS.Model.extend({
    latitude: DS.attr('string'),
    longitude: DS.attr('string'),
    accuracy: DS.attr('string')

});

App.Location.FIXTURES = [
 {
   id: 1,
   latitude: '10.12212',
   longitude: '34.2123123',
   accuracy: '40'
 },
 {
   id: 2,
   latitude: '20.098',
   longitude: '154.657',
   accuracy: '10'
 }
];


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



