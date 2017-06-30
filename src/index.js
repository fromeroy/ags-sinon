var jQuery = require('jquery')

function once(fn) {
    let returnValue, called = false;
    return function () {
        if (!called) {
            called = true;
            returnValue = fn.apply(this, arguments);
        }
        return returnValue;
    };
}

function throttle(callback, timeout) {
    var timer;
    return function () {
        clearTimeout(timer);
        var args = [].slice.call(arguments);
        timer = setTimeout(function () {
            callback.apply(this, args);
        }, timeout);
    };
}

function myFunction(fn) {
    return function () {
        return fn.apply(this, arguments)
    };
}

function myFunctionObject() {
    return function (obj) {
        return obj
    };
}

var objeto = {
    myFunction2: function (fn) {
        return function () {
            return fn.apply(this.arguments)
        }
    }

}

module.exports = { once, throttle, myFunction, objeto, myFunctionObject }