##Introduction

I'm trying to get a better understanding of EmberJS by creating a project using Google Maps.  I've published a sample on https://github.com/ddewaele/my-emberjs-starter-kit/tree/master/google-maps and I would love to get some feedback on the implementation. Also posted this on the [EmberJS Forum](http://discuss.emberjs.com/t/emberjs-with-google-maps-feedback-requested/2212).

- [Google Maps Demo](https://github.com/ddewaele/my-emberjs-starter-kit/tree/master/google-maps)

![mutli-select](https://dl.dropboxusercontent.com/u/13246619/Blog%20Articles/EmberJS/demo_google_maps.png)

Screencast : http://quick.as/864ijp


## Requirements

The app has the following requirements (currently implemented) :

- App needs to be able to display a map
- User can click on the map, causing  a marker to be added on the map and in a table below the map.
- User can add multiple markers like this
- User can highlight on or more markers by clicking on them, or by selecting them from the table below the map.
- User can remove the highlighted markers.

The app looks like this: http://quick.as/864ijp

I would love to get some feedback on the design of the app, and where I totally went wrong :smile:
 
## High level design

- Custom Ember View

A custom Ember View that inserts a DIV where the map will be displayed.
We store a reference to the Google Map on the view
We also store a collection of markers on the map.
Handles adding / selecting markers
	
- ArrayController for marker management

An ArrayController to do the marker management. (capable of working with multiple markers)
Responsible for managing adding / deleting / selecting markers.

- ObjectController, acting as a proxy to my marker object.
	
- Marker Model
should model the data (lat/lng)

## Issues / doubts
I do however have a couple of issues / doubts regarding the design of the app :

- View / Controller coupling

Currently the Ember View has a dependency on the "current" controller.
So this means that the View can only be used when this particular controller is active.


- View responsibility

The Ember View registers the Google Maps listeners (clicking on the map) in the didInsertElement.
It also adds a google.maps.Marker to the map and adds a App.Marker (a wrapper for the google.maps.Marker) to the controller.
When a marker is clicked on the map, the controller processes the logic. (markerClick)

So the view handles all the interaction with the map (clicking on the map to add a marker, and clicking on a marker to highlight it)
by delegating the processing to the controller.

- Marker Model

My marker object doesn't extend Ember.Model,just Ember.Object. If we're not persisting I guess this is ok ?

- Controller state

When a marker is added to the map (by clicking on the map), the View delegates that to the controller, where the 
controller stores it in an internal array.

- View state.
When clicking on a marker, the View again delegates it to the Controller, 
allowing the controller to perform some logic

In order to do that, the View also needs to have a list of App.Marker objects. 
(as it needs to know what Marker object it needs to pass on to the controller)

## Conclusion

If you made it this far thanks a lot ! Feel free to provide feedback here or on the  Github project.
