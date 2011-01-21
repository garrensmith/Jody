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

  Async
  
    describe("Async spec").
      it("Should only assert at the end", function (atEnd) {
        
        var n = 0;
        setTimeout(function(){
          ++n;
        }, 200);

        atEnd(function () {
          n.should().beEqual(1);
        });

      });

  Mock

  Only works in node v0.3.3-pre and above
  
  describe("Mock standard lib").
    it("Should mockout standard lib", function () {
      fsMock = mock("fs");
      fs = require('fs');
      
      fs.should().beEqual(fsMock);

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
* Add  afterEach 
* testing of http apps
* Mocks and Stubs -- basic implementation done


