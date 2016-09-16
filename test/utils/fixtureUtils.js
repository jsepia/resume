'use strict';

const fs = require('fs');
const cheerio = require('cheerio');

function fetchHTML(filename) {
  return fs.readFileSync(filename, { encoding: "utf8" });
}

function loadResumeDOM() {
  return cheerio.load(fetchHTML("dist/resume.html"));
}

module.exports = {
  loadResumeDOM: loadResumeDOM
};
