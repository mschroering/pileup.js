'use strict';function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}var _chai = require(


'chai');var _mainDataVcf = require(

'../../main/data/vcf');var _mainSourcesVcfDataSource = require(
'../../main/sources/VcfDataSource');var _mainSourcesVcfDataSource2 = _interopRequireDefault(_mainSourcesVcfDataSource);var _mainContigInterval = require(
'../../main/ContigInterval');var _mainContigInterval2 = _interopRequireDefault(_mainContigInterval);var _mainRemoteFile = require(
'../../main/RemoteFile');var _mainRemoteFile2 = _interopRequireDefault(_mainRemoteFile);

describe('VcfDataSource', function () {
  function getTestSource() {
    var vcf = new _mainDataVcf.VcfFile(new _mainRemoteFile2['default']('/test-data/snv.vcf'));
    return _mainSourcesVcfDataSource2['default'].createFromVcfFile(vcf);}


  it('should extract features in a range', function (done) {
    var source = getTestSource();
    var range = new _mainContigInterval2['default']('20', 63799, 69094);

    // No variants are cached yet.
    var variants = source.getFeaturesInRange(range);
    (0, _chai.expect)(variants).to.deep.equal([]);

    source.on('newdata', function () {
      var variants = source.getFeaturesInRange(range);
      (0, _chai.expect)(variants).to.have.length(6);
      (0, _chai.expect)(variants[0].contig).to.equal('20');
      (0, _chai.expect)(variants[0].position).to.equal(63799);
      (0, _chai.expect)(variants[0].ref).to.equal('C');
      (0, _chai.expect)(variants[0].alt).to.equal('T');
      done();});

    source.rangeChanged({ 
      contig: range.contig, 
      start: range.start(), 
      stop: range.stop() });});});