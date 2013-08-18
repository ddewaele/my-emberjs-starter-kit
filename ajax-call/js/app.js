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


App.LocationController = Ember.ObjectController.extend({
 fetch: function() {

      id = this.get("id");

      console.log("Using ID = " + id);
     
      url = 'http://localhost:3000/todos/' + id
      
      var that = this;
      $.getJSON(url, function(data) {
        console.log("found json data = " + JSON.stringify(data));
        that.set("data",data);
      });

    }
});




