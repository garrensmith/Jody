Jody
============

A basic bdd framework to work with node so that I can learn a bit of javascript and node. 
Adds a method on to all objects to test using should().
It can test callbacks and events


To Install
==========
    npm Jody

To Use
======
    run Jody <file_name>
or
Create specs in ./spec and then:
    run Jody 

To use:
    var describe = require('Jody').describe;

    describe("New set of specs").
      beforeEach(function () {
      }).
      it("Should test something", function() {
        var i = 0;
        i += 1;
        i.should().beEqual(1);
      });

Examples
========

See ./spec folder for examples on use

Todo
====

* Improve error messages
* Watch files and autotest
* describe or context within spec
* more matchers
* Add beforeAll, afterEach and afterAll
* testing of http apps
* Mocks and Stubs


