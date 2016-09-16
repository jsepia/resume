const expect = require('chai').expect;

function toExist($element) {
  expect($element.length).to.exist;
  expect($element.length).to.be.at.least(1);
}

function toExistAndBeUnique($element) {
  expect($element.length).to.exist;
  expect($element).to.have.lengthOf(1);
}

function toNotBeEmpty($element) {
  expect($element.length).to.exist;
  expect($element.length).to.be.at.least(1);
  expect($element.text().length).to.be.at.least(1);
}

// this is meant for <meta> tags which have a 'content' attribute
function toHaveContent($element) {
  expect($element.length).to.exist;
  expect($element.length).to.be.at.least(1);
  expect($element.attr('content').length).to.be.at.least(1);
}

module.exports = {
  toExist: toExist,
  toExistAndBeUnique: toExistAndBeUnique,
  toNotBeEmpty: toNotBeEmpty,
  toHaveContent: toHaveContent
};
