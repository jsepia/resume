'use strict';

const expect = require('chai').expect;
const loadResumeDOM = require('../utils/fixtureUtils').loadResumeDOM;
const expectDOMElement = require('../utils/expectDOMElement');

describe('test DOM structure', function () {
 
  let $;

  before(function () {
    $ = loadResumeDOM();
  });
 
  it('got built', function () {
    expect($).to.exist;
    expect($.length).to.be.at.least(1);
  });
 
  it('has a correctly formed HEAD', function () {
    expectDOMElement.toExistAndBeUnique($('head'));
    expectDOMElement.toExistAndBeUnique($('head > title'));
    expectDOMElement.toNotBeEmpty($('head > title'));
    expectDOMElement.toExist($('link[rel=stylesheet]'));
  });
 
  it('has a responsive viewport', function () {
    expectDOMElement.toExistAndBeUnique($('head > meta[name=viewport]'));
    expect($('head > meta[name=viewport]').attr('content')).to.contain("width=device-width");
  });
 
  it('has a correctly formed BODY', function () {
    expectDOMElement.toExistAndBeUnique($('body'));
  });
 
});
