App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

App.hobbies = Em.ArrayProxy.create({
  content: []
});

Person = Ember.Object.extend({
  // these will be supplied by `create`
  firstName: null,
  lastName: null,
  //hobbies: [],
  hobbiesBinding: "App.hobbies.content",

  fullName: function() {
    var firstName = this.get('firstName');
    var lastName = this.get('lastName');

    return firstName + ' ' + lastName;
  }.property('firstName', 'lastName'),

  addHobby: function(hobbyName) {
    this.hobbies.pushObject(hobbyName);
  },

  sayHello: function() {
    return "hello " + this.get("fullName") + " - your hobbies are " + this.get("hobbies");
  },

  fullNameChanged: function() {
    console.log("I noticed that the fullName has changed....")
  }.observes('fullName'),

  hobbiesChanged: function() {
    console.log("I noticed that your hobbies changed....")
  }.observes('hobbies.@each')  

});

App.IndexController = Ember.ObjectController.extend({

});