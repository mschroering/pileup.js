/**
 * This tests whether feature information is being shown/drawn correctly
 * in the track.
 *
 * 
 */
'use strict';function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}var _chai = require(

'chai');var _underscore = require(

'underscore');var _underscore2 = _interopRequireDefault(_underscore);var _mainRemoteFile = require(
'../../main/RemoteFile');var _mainRemoteFile2 = _interopRequireDefault(_mainRemoteFile);var _mainPileup = require(
'../../main/pileup');var _mainPileup2 = _interopRequireDefault(_mainPileup);var _dataCanvas = require(
'data-canvas');var _dataCanvas2 = _interopRequireDefault(_dataCanvas);var _async = require(
'../async');

describe('FeatureTrack', function () {
  var testDiv = document.getElementById('testdiv');
  var range = { contig: 'chr1', start: 130000, stop: 135000 };
  var json;

  beforeEach(function () {
    testDiv.style.width = '800px';
    _dataCanvas2['default'].RecordingContext.recordAll();});


  afterEach(function () {
    _dataCanvas2['default'].RecordingContext.reset();});


  before(function () {
    return new _mainRemoteFile2['default']('/test-data/features.ga4gh.chr1.120000-125000.json').getAllString().then(function (data) {
      json = data;});});



  var drawnObjects = _dataCanvas2['default'].RecordingContext.drawnObjects;

  function ready() {
    return testDiv.querySelector('canvas') && 
    drawnObjects(testDiv, '.features').length > 2;}


  it('should render features', function () {

    var p = _mainPileup2['default'].create(testDiv, { 
      range: range, 
      tracks: [
      { 
        viz: _mainPileup2['default'].viz.genome(), 
        data: _mainPileup2['default'].formats.twoBit({ 
          url: '/test-data/test.2bit' }), 

        isReference: true }, 

      { 
        viz: _mainPileup2['default'].viz.features(), 
        data: _mainPileup2['default'].formats.featureJson(json) }] });





    return (0, _async.waitFor)(ready, 2000).
    then(function () {
      var features = drawnObjects(testDiv, '.features');
      // there can be duplicates in the case where features are
      // overlapping  more than one section of the canvas
      features = _underscore2['default'].uniq(features, false, function (x) {
        return x.start;});


      (0, _chai.expect)(features).to.have.length(4);
      (0, _chai.expect)(features.map(function (f) {return f.start;})).to.deep.equal(
      [89295, 92230, 110953, 120725]);
      p.destroy();});});});