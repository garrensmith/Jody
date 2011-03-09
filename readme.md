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

## Usage
    var describe = require('Jody').describe;

    describe("New set of specs").
      beforeEach(function () {
      }).
      it("Should test something", function() {
        var i = 0;
        i += 1;
        i.should().beEqual(1);
      });

## Async
    Add the function *async* to each callback that you want to test again. This will allow for Jody to determine if the test was successful
  
    describe("Async spec").
      it("Should only assert at the end", function (atEnd) {
        
        asyncTest(async(function(val1,val2){
          val1.should().beTrue();
          val2.should().beFalse();
        }));
      });

## Http
  See examples/http_spec.js 

## Mock

  Only works in node v0.4.0 and above
  
  describe("Mock standard lib").
    it("Should mockout standard lib", function () {
      fsMock = mock("fs");
      fs = require('fs');
      
      fs.should().beEqual(fsMock);

    });

Examples
========

See ./spec folder for examples on use

Feedback
========

For suggestions, help or feedback go to [https://convore.com/jody/](https://convore.com/jody/)


Todo
====

* Improve error messages
* Watch files and autotest
* describe or context within spec
* more matchers
* Add  afterEach 
* testing of http apps
* Mocks and Stubs -- basic implementation done


