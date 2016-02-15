// -----------------------------------------------------------------------------------------------
// The magic of callbacks


// 1) Using existing functions that takes a callback as an argument
var arrayOrg = ["Lars", "Peter", "Poul", "Jan", "Bo", "Frederik"];

// filter array - apply the function
var arrayFiltered = arrayOrg.filter(function (str) {
    if (str.length <= 3)
        return str;
})

var arrayUpperCased = arrayOrg.map(function (str) {
    return str.toUpperCase();
});

// interesting: I thought that I could make my filter behave as my map but it will only give back
// the current elements unaltered that satisfy the test
var arrayUpperCased2 = arrayOrg.filter(function (str) {
    if (str.length)
        return str.toUpperCase();
})


// 2) Implement user defined functions that take callbacks as an argument
// together with
// 3) Using the Prototype property to add new functionality to existing objects
Array.prototype.myFilter = function (callback) {
    var array = this;
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        if (callback(array[i]))
            newArray.push(array[i]);
    }
    return newArray;
}

Array.prototype.myMap = function (callback) {
    var array = this;
    for (var i = 0; i < array.length; i++) {
        array[i] = callback(array[i]);
    }
    return array;
}

var myArrayFiltered = arrayOrg.myFilter(function (str) {
    if (str.length <= 3)
        return str.toUpperCase();
})

var myMapArrayUpperCased = arrayOrg.myMap(function (str) {
    return str.toUpperCase();
})

// 4) More user defined functions with callbacks
function handleNumArrays(na1, na2, callback) {
    var newArray = [];
    for (var i = 0; i < na1.length; i++) {
        newArray.push(na1[i] + na2[i]);
    }
    callback(newArray);
}

var a = [1, 2, 3];
var b = [1, 2, 3];
handleNumArrays(a, b, function (res) {
    console.log(res.join(","))
})

handleNumArrays(a, b, function (res) {
    var sum = 0;
    for (var i = 0; i < res.length; i++) {
        sum += res[i]
    }
    console.log(sum)
})

handleNumArrays(a, b, function (res) {
    res = res.myMap(function (elem) {
        return elem * 10;
    })

    console.log(res.join(','));
})

// -----------------------------------------------------------------------------------------------
// HOISTED: means that if something is hoisted it's declaration is entirely moved to the
// beginning of it's scope at RUNTIME
// function declarations are hoisted
// variable declarations are hoisted - BUT variable assignment IS NOT HOISTED! :)
// example
later();
function later() {
} // this is perfectly legal since the later function will be moved up to the beginning of the file
// since it is declared in the global scope

bubblegum = 10;
var bubblegum; // this is also legal since the declaration var bubblegum will be hoisted('hejst') to
// beginning of the file since it is also declared in the global scope

willNotWorkFunc = function () {
}; // this line demonstrates that the var part of willNotWorkFunc is hoisted

willNotWorkFunc(); // this will not work since the ASSIGNMENT of the var willNotWorkFunc will NOT be hoisted
var willNotWorkFunc = function () {
} // however the var willNotWorkFunc VARIABLE will be hoisted!

// DESIGN RULE: Now that we know about hoisting: that each declaration will automatically be moved to the to
// the top of its scope, WHY NOT just simply remember to declare the variables and functions at the top to
// prevent further confusion?


// -----------------------------------------------------------------------------------------------
// THIS in javascript
//
// How 'this' in JavaScript differs from this in Java
// In Java: this is always a reference to the current object
// In JavaScript:
//                  in method: 'this' refers to the object it is a method of (same as in JAVA)
var obj = {
    num: 55,
    printNum: function () {
        console.log(this.num);
    }
}
obj.printNum();
//
//                  if you extract the method into a function: 'this' looses its value
//                                                              (and becomes undefined in strict mode)
//                      (use bind to make 'this' point back to some object )
var printNumExtracted = obj.printNum;
printNumExtracted(); // will not work -  will print undefined
printNumExtracted = printNumExtracted.bind(obj); // bind the function back to the object - make
// the 'this' in the function refer to obj
printNumExtracted();
//
//                  in function: If the function is declared in global scope
//                                  'this' referes to the global object
//                                  (window in browser, undefined in strict mode)
function globalThis() {
    console.log(this);
}
globalThis();
//
//                          every local function has it's own 'this' variable
//                      (in JavaScript functions are first class members )
//                      Problem: If you have a nested function inside a method and want to access
//                               the object in the function
var obj = {
    index: 'index:',
    numbers: [1, 2, 3, 4],
    indexNumbers: function () {
        this.numbers = this.numbers.map(function (number) {
            return this.index + number; // this will not work - this refers to the local function
        });
        this.numbers.forEach(function (number) {
            console.log(number);
        });
    }
}

obj.indexNumbers(); // will not work -  will print 4 x undefined

//                      Solution: before function call in method: var self = this;
//                                and then use self in the function
var obj = {
    index: '',
    numbers: [1, 2, 3, 4],
    indexNumbers: function () {
        var self = this;

        this.numbers = this.numbers.map(function (number) {
            return self.index + number; // this will work - self now refers
                                        // to the object instead of the local function
        });
        this.numbers.forEach(function (number) {
            console.log(number);
        });

    },
    resetIndex: function () {
        this.index = '';
    }
}

obj.indexNumbers();
//
//                   in Constructor: 'this' refers to the object currently being created and is returned
//
var House = function (doors, windows) {
    this.doors = doors;
    this.windows = windows;
}

var h = new House(3, 4);
console.log('House with ' + h.doors + ' doors and ' + h.windows + ' windows');
//
//                  whenever call or apply is used: 'this' is explicitly defined
//
function myFunc(a, b, c) {
    this.index = a + ' ' + b + ' ' + c; // to be used with the 'obj' Object
}

myFunc.call(obj, 'this', 'is', 'index '); // now make 'this' in myFunc refer to 'obj'
console.log(obj.index)
obj.indexNumbers();

function myFunc2() {
    this.index = arguments[0] + ' ' + arguments[1] + ' ' + arguments[2]; // to be used with the 'obj' Object
}
obj.resetIndex();
myFunc2.apply(obj, ['this', 'index', 'is ']); // now make 'this' in myFunc refer to 'obj'
console.log(obj.index)
obj.indexNumbers();
// The purpose of the methods call(), apply() and bind() : if you have a function that you would like to
// use with an already defined object. It will make the this reference refer to the object
// and in effect temporarily make the function a method

// IIFE (Immediately Invoked Function Expression)
// (self invoking functions)
// can be used for the module pattern:
// (for variable privacy while keeping the methods public)
//var counter = (function(){
//    var i = 0;
//
//    return {
//        get: function(){
//        return i;
//    },
//    set: function( val ){
//        i = val;
//    },
//    increment: function() {
//        return ++i;
//    }
//}());

// and for correctly creating event listener - that means locking a variable:
// this won't work:
var elems = document.getElementsByTagName('a');

for (var i = 0; i < elems.length; i++) {
    elems[i].addEventListener('click', function (e) {
            e.preventDefault();
            alert('I am link #' + i);
        }, 'false');

}

// when the for loop is done (long before an event is triggered)
// - i will be max value, and thus when the event is triggered,
// i will be the max value for all events

// solve it with closure + IIFE :
var elems = document.getElementsByTagName('a');

for (var i = 0; i < elems.length; i++) {
    (function (lockedInIndex) {
        elems[i].addEventListener('click', function (e) {
            e.preventDefault();
            alert('I am link #' + lockedInIndex);
        }, 'false');
    })(i);
}

// protection against polluting the global environment
(function(){
    var txt = "Hello World";
    console.log(txt);  //OK
})();

// console.log(txt);  //Throws an error

// -----------------------------------------------------------------------------------------------
// OBJECTS
var person = {
    name: 'Simon',
    hobby: 'programming',
    birthday: '130582',
    email: 'thatguy@simonsteinaa.dk'
}

for (prop in person) {
    console.log(prop);
}

delete(person.hobby)

for (prop in person) {
    console.log(prop);
}

if (person.hasOwnProperty('name')) {
    console.log('simon has name')
}

if (!person.hasOwnProperty('hobby')) {
    console.log('simon hasn\'t a hobby');
}

var Person = function(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.getDetails = function() {
        console.log(this.firstName + ' ' + this.lastName + ', age: ' + this.age );
    }
}

var p = new Person('Simon', 'Steinaa', 33);
p.getDetails();

function listAllProperties(o){
    var objectToIsnspect;
    var result = [];

    for(objectToInspect = o; objectToInspect !== null; objectToInspect = Object.getPrototypeOf(objectToInspect)){
        result = result.concat(Object.getOwnPropertyNames(objectToInspect));
    }

    return result;
}
console.log(listAllProperties(p))
delete(p.age)
console.log(listAllProperties(p))

// -----------------------------------------------------------------------------------------------
// CLOSURES
var getPerson = function(n, a) {
    // theese variables are in effect PRIVATE when you access the object
    var name = n;
    var age = a;

    return {
        //only the methods of the object has access to the name and age variables i.e. closure
        setName: function(n) {
            name = n;
        },
        setAge: function(a) {
            age = a;
        },
        getInfo: function() {
            return name + ', ' + age;
        }

    }
}

var peter = getPerson('Peter', 43);
console.log(peter.getInfo())
peter.name = 'kurt';
console.log(peter.getInfo())
peter.setName('kurt');
console.log(peter.getInfo())
