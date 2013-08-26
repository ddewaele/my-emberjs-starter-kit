App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});

App.Marker = Ember.Object.extend({
});


App.InlineTextField = Ember.TextField.extend({
    focusOut: function() {
      this.set('blurredValue', this.get('value'));
    }
});


App.MapView = Ember.View.extend({
  id: 'map_canvas',
  tagName: 'div',

  attributeBindings: ['style'],
  style:"width:100%; height:200px",
  
  didInsertElement: function() {
    var mapOptions = {
      center: new google.maps.LatLng(37.871667, -122.272778),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var controller = this.get("controller");
    var map = new google.maps.Map(this.$().get(0),mapOptions);
    
    var triggerButton = $('#' + this.get("triggerButton"));

    console.log("found triggerButton" + triggerButton);

    var that = this;
    triggerButton.click(function () {
      that.loadDirections();
      return false;
    });

    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);

    this.set("map",map);
    
    var that = this;
  },
  
  loadDirections: function() {
    console.log("Observed content change in the index controller.... should update.....")

    from = this.get("from");
    to = this.get("to");

    if (from && to) {

    console.log("Loading up direction from " + from + " to " + to);    
    
    var directionsService = new google.maps.DirectionsService();

     var request = {
      origin:from,
      destination:to,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
      };
      directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        }
      });

    } else {
      console.log("Need both a from and a to");
    }


  }.observes("from","to")
});

// This is our main array controller that does the marker management
// It keeps a list of marker objects in its content

App.IndexController = Ember.ArrayController.extend({
  fromToChanged: function() {
    console.log("fromToChanged")
  }.observes("from"),

  directionsText: function() {
    return "Going from " + this.get("from") + " to " + this.get("to");
  }.property("from")
});
