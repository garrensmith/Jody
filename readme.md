Spec my node
============

A basic bdd framework to work with node so that I can learn a bit of javascript and node. 
Adds a method on to all objects to test using should().
It can test callbacks and events


To Install
==========
    npm Spec_My_Node

To Use
======
    run spec_my_node <file_name>
or
Create specs in ./spec and then:
    run spec_my_node 

To use:
    var describe = require('spec_my_node').describe;

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
* Extract report results to own object and file
* Mocks and Stubs
