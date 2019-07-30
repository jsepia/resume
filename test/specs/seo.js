'use strict';

const expect = require('chai').expect;
const loadResumeDOM = require('../utils/fixtureUtils').loadResumeDOM;
const expectDOMElement = require('../utils/expectDOMElement');

const MY_NAME = "Julio Sepia";
const WEB_DEVELOPER_STRING = "web developer";
const BIO_KEYWORDS = [
  "web application",
  "frontend",
  "game",
  "user experience"
];
const SKILLS_KEY_TECHNOLOGIES = [
  "node",
  "react",
  "aws"
];

const TITLE_SELECTOR = "head > title";
const DESCRIPTION_SELECTOR = "head > meta[name=description]";

describe('test SEO', function () {
 
  let $;

  before(function () {
    $ = loadResumeDOM();
  });

  it('has my name in the title', function() {
    expect($(TITLE_SELECTOR).text()).to.include(MY_NAME);
  });

  it('has a description', function() {
    expectDOMElement.toExistAndBeUnique($(DESCRIPTION_SELECTOR));
    expectDOMElement.toHaveContent($(DESCRIPTION_SELECTOR));
  });

  it('is concise', function() {
    expect($(TITLE_SELECTOR).text().length).to.be.below(70);
    expect($(DESCRIPTION_SELECTOR).text().length).to.be.below(155);
  });

  it('has my name as h1', function() {
    expect($('head > title').text()).to.include(MY_NAME);
  });

  it('includes the term "Web Developer" in the header', function() {
    expect($('header').text().toLowerCase()).to.include(WEB_DEVELOPER_STRING);
  });

  it('includes keywords in the bio', function() {
    const bioContents = $('#bio-section').text().toLowerCase();
    BIO_KEYWORDS.forEach(function(keyword) {
      expect(bioContents).to.include(keyword);
    }, this);
  });

  it('includes key technologies in the skills section', function() {
    const skillsContents = $('#skills-section').text().toLowerCase();
    SKILLS_KEY_TECHNOLOGIES.forEach(function(keyword) {
      expect(skillsContents).to.include(keyword);
    }, this);
  });

  it('has Facebook Opengraph metadata', function() {
    expectDOMElement.toHaveContent($('meta[property="og:type"]'));
    expectDOMElement.toHaveContent($('meta[property="og:title"]'));
    expectDOMElement.toHaveContent($('meta[property="og:description"]'));
    expectDOMElement.toHaveContent($('meta[property="og:image"]'));
    expectDOMElement.toHaveContent($('meta[property="og:site_name"]'));
  });

  it('has Twitter Opengraph metadata', function() {
    expectDOMElement.toHaveContent($('meta[name="twitter:card"]'));
    expectDOMElement.toHaveContent($('meta[name="twitter:site"]'));
    expectDOMElement.toHaveContent($('meta[name="twitter:title"]'));
    expectDOMElement.toHaveContent($('meta[name="twitter:description"]'));
    expectDOMElement.toHaveContent($('meta[name="twitter:image"]'));
  });
 
});