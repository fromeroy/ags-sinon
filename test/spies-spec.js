var assert = require('assert')
var sinon = require('sinon')
var index = require('../src/index.js')
var jQuery = require('jquery')

describe('Spies', () => {
	it('calls the original function', () => {
		var callback = sinon.spy()
		var proxy = index.once(callback)

		proxy()

		assert(callback.called)
	})
	it('calls myFunction and check if called or not called', () => {
		var callback = sinon.spy()
		var proxy = index.myFunction(callback)

		assert(callback.notCalled)
		proxy()

		assert(callback.called)
	})
	it('calls the original function only once', () => {
		var callback = sinon.spy()
		var proxy = index.once(callback)

		proxy()
		proxy()

		assert(callback.calledOnce)
	})
	it('calls original function with right this and args', function () {
		var callback = sinon.spy();
		var proxy = index.once(callback);
		var obj = {};

		proxy.call(obj, 1, 2, 3);

		assert(callback.calledOn(obj));
		assert(callback.calledWith(1, 2, 3));
	});
})
describe('Stubs', () => {
	it("returns the return value from the original function", function () {
		var callback = sinon.stub().returns(42);
		var proxy = index.once(callback);

		assert.equal(proxy(), 42);
	});
})
xdescribe('Fake server', () => {
	var server;

	before(function () { server = sinon.fakeServer.create(); });
	after(function () { server.restore(); });

	it("calls callback with deserialized data", function () {
		var callback = sinon.spy();
		index.getTodos(42, callback);

		// This is part of the FakeXMLHttpRequest API
		server.requests[0].respond(
			200,
			{ "Content-Type": "application/json" },
			JSON.stringify([{ id: 1, text: "Provide examples", done: true }])
		);

		assert(callback.calledOnce);
	});

})
describe('Faking time', () => {
	var clock;

	before(function () { clock = sinon.useFakeTimers(); });
	after(function () { clock.restore(); });

	it('calls callback after 5000ms', function () {
		var callback = sinon.spy();
		var throttled = index.throttle(callback, 5000);

		throttled();

		clock.tick(4999);
		assert(callback.notCalled);

		clock.tick(1);
		assert(callback.calledOnce);
	})
})