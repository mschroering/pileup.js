'use strict';function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}var _chai = require(


'chai');var _mainInterval = require(

'../main/Interval');var _mainInterval2 = _interopRequireDefault(_mainInterval);

describe('Interval', function () {
  it('should have start/stop/length', function () {
    var x = new _mainInterval2['default'](10, 20);
    (0, _chai.expect)(x.start).to.equal(10);
    (0, _chai.expect)(x.stop).to.equal(20);
    (0, _chai.expect)(x.length()).to.equal(11);
    (0, _chai.expect)(x.toString()).to.equal('[10, 20]');});


  it('should determine containment', function () {
    var x = new _mainInterval2['default'](-10, 10);
    (0, _chai.expect)(x.contains(0)).to.be['true'];
    (0, _chai.expect)(x.contains(-10)).to.be['true'];
    (0, _chai.expect)(x.contains(+10)).to.be['true'];
    (0, _chai.expect)(x.contains(+11)).to.be['false'];
    (0, _chai.expect)(x.contains(-11)).to.be['false'];});


  it('should work with empty intervals', function () {
    var empty = new _mainInterval2['default'](5, 0), 
    other = new _mainInterval2['default'](-10, 10);
    (0, _chai.expect)(empty.contains(0)).to.be['false'];
    (0, _chai.expect)(empty.length()).to.equal(0);
    (0, _chai.expect)(empty.intersect(other).length()).to.equal(0);});


  it('should determine intersections', function () {
    var tp53 = new _mainInterval2['default'](7512444, 7531643);
    var other = new _mainInterval2['default'](7512444, 7531642);

    (0, _chai.expect)(tp53.intersects(other)).to.be['true'];});


  it('should clone', function () {
    var x = new _mainInterval2['default'](0, 5), 
    y = x.clone();

    y.start = 1;
    (0, _chai.expect)(x.start).to.equal(0);
    (0, _chai.expect)(y.start).to.equal(1);});


  it('should intersect many intervals', function () {
    var ivs = [
    new _mainInterval2['default'](0, 10), 
    new _mainInterval2['default'](5, 15), 
    new _mainInterval2['default'](-5, 5)];


    var intAll = _mainInterval2['default'].intersectAll;
    (0, _chai.expect)(intAll(ivs).toString()).to.equal('[5, 5]');
    (0, _chai.expect)(intAll([ivs[0], ivs[1]]).toString()).to.equal('[5, 10]');
    (0, _chai.expect)(intAll([ivs[0], ivs[2]]).toString()).to.equal('[0, 5]');
    (0, _chai.expect)(intAll([ivs[0]]).toString()).to.equal('[0, 10]');

    (0, _chai.expect)(function () {return intAll([]);}).to['throw'](/intersect zero intervals/);});


  it('should construct bounding intervals', function () {
    var ivs = [
    new _mainInterval2['default'](0, 10), 
    new _mainInterval2['default'](5, 15), 
    new _mainInterval2['default'](-5, 5)];


    var bound = _mainInterval2['default'].boundingInterval;
    (0, _chai.expect)(bound(ivs).toString()).to.equal('[-5, 15]');
    (0, _chai.expect)(bound([ivs[0], ivs[1]]).toString()).to.equal('[0, 15]');
    (0, _chai.expect)(bound([ivs[0], ivs[2]]).toString()).to.equal('[-5, 10]');
    (0, _chai.expect)(bound([ivs[0]]).toString()).to.equal('[0, 10]');

    (0, _chai.expect)(function () {return bound([]);}).to['throw'](/bound zero intervals/);});


  it('should determine coverage', function () {
    var iv = new _mainInterval2['default'](10, 20);
    (0, _chai.expect)(iv.isCoveredBy([
    new _mainInterval2['default'](0, 10), 
    new _mainInterval2['default'](5, 15), 
    new _mainInterval2['default'](10, 20)])).
    to.be['true'];

    (0, _chai.expect)(iv.isCoveredBy([
    new _mainInterval2['default'](0, 10), 
    new _mainInterval2['default'](5, 15), 
    new _mainInterval2['default'](16, 30)])).
    to.be['true'];

    (0, _chai.expect)(iv.isCoveredBy([
    new _mainInterval2['default'](0, 10), 
    new _mainInterval2['default'](5, 15), 
    new _mainInterval2['default'](17, 30) // a gap!
    ])).to.be['false'];

    (0, _chai.expect)(iv.isCoveredBy([
    new _mainInterval2['default'](0, 5), 
    new _mainInterval2['default'](9, 21)])).
    to.be['true']; // a gap, located in second interval

    (0, _chai.expect)(iv.isCoveredBy([
    new _mainInterval2['default'](0, 30)])).
    to.be['true'];

    (0, _chai.expect)(iv.isCoveredBy([
    new _mainInterval2['default'](15, 30)])).
    to.be['false'];

    (0, _chai.expect)(iv.isCoveredBy([
    new _mainInterval2['default'](0, 15)])).
    to.be['false'];

    (0, _chai.expect)(function () {return iv.isCoveredBy([
      new _mainInterval2['default'](5, 15), 
      new _mainInterval2['default'](0, 10)]);}).
    to['throw'](/sorted ranges/);});


  it('should subtract intervals', function () {
    //   0123456789
    // a ----------
    // b ---
    // c        ---
    // d    -----
    var a = new _mainInterval2['default'](0, 9), 
    b = new _mainInterval2['default'](0, 2), 
    c = new _mainInterval2['default'](7, 9), 
    d = new _mainInterval2['default'](3, 7);
    (0, _chai.expect)(a.subtract(a).map(function (x) {return x.toString();})).to.deep.equal([]);
    (0, _chai.expect)(a.subtract(b).map(function (x) {return x.toString();})).to.deep.equal(['[3, 9]']);
    (0, _chai.expect)(a.subtract(c).map(function (x) {return x.toString();})).to.deep.equal(['[0, 6]']);
    (0, _chai.expect)(a.subtract(d).map(function (x) {return x.toString();})).to.deep.equal(['[0, 2]', '[8, 9]']);

    (0, _chai.expect)(b.subtract(a).map(function (x) {return x.toString();})).to.deep.equal([]);
    (0, _chai.expect)(b.subtract(b).map(function (x) {return x.toString();})).to.deep.equal([]);
    (0, _chai.expect)(b.subtract(c).map(function (x) {return x.toString();})).to.deep.equal([b.toString()]);
    (0, _chai.expect)(b.subtract(d).map(function (x) {return x.toString();})).to.deep.equal([b.toString()]);

    (0, _chai.expect)(c.subtract(a).map(function (x) {return x.toString();})).to.deep.equal([]);
    (0, _chai.expect)(c.subtract(b).map(function (x) {return x.toString();})).to.deep.equal([c.toString()]);
    (0, _chai.expect)(c.subtract(c).map(function (x) {return x.toString();})).to.deep.equal([]);
    (0, _chai.expect)(c.subtract(d).map(function (x) {return x.toString();})).to.deep.equal(['[8, 9]']);

    (0, _chai.expect)(d.subtract(a).map(function (x) {return x.toString();})).to.deep.equal([]);
    (0, _chai.expect)(d.subtract(b).map(function (x) {return x.toString();})).to.deep.equal([d.toString()]);
    (0, _chai.expect)(d.subtract(c).map(function (x) {return x.toString();})).to.deep.equal(['[3, 6]']);
    (0, _chai.expect)(d.subtract(d).map(function (x) {return x.toString();})).to.deep.equal([]);});


  it('should compute complements', function () {
    var iv = new _mainInterval2['default'](0, 99);
    var exons = [
    new _mainInterval2['default'](10, 19), 
    new _mainInterval2['default'](30, 39), 
    new _mainInterval2['default'](35, 49), 
    new _mainInterval2['default'](80, 99)];


    (0, _chai.expect)(iv.complementIntervals(exons).map(function (x) {return x.toString();})).to.deep.equal([
    '[0, 9]', 
    '[20, 29]', 
    '[50, 79]']);});



  it('should round interval', function () {
    var interval = new _mainInterval2['default'](1, 20);
    var rounded = interval.round(40, true);
    (0, _chai.expect)(rounded.start).to.equal(0);
    (0, _chai.expect)(rounded.stop).to.equal(40);

    rounded = interval.round(40, false);
    (0, _chai.expect)(rounded.start).to.equal(1);});});