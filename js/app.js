App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

App.IndexController = Ember.ObjectController.extend({
  
  prop1:"prop1_value",
  summaryText: function() {
  	if (this.get("firstName") && this.get("lastName")) {
  		return "Hello " + this.get("firstName") + " " + this.get("lastName");
  	} else {
  		return "Please provide your first and last name...."
  	}
  }.property("firstName","lastName")

});