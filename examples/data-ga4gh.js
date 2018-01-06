// Some data for the demo.

// We are going to use the same data source for multiple tracks
var bamSource = pileup.formats.bam({
  url: '/test-data/synth3.normal.17.7500000-7515000.bam',
  indexUrl: '/test-data/synth3.normal.17.7500000-7515000.bam.bai'
});

// This URL points to the GA4GH Reference Server, which
// can be accessed for examples of standardized endpoints
// for genomic data. All available GA4GH endpoints can
// be found here: http://1kgenomes.ga4gh.org
var ga4ghReferenceServer = 'https://ga4gh.dev.lifeomic.com/lifeomic/v1';

var sources = [
  {
    viz: pileup.viz.genome(),
    isReference: true,
    data: pileup.formats.twoBit({
      url: 'http://www.biodalliance.org/datasets/hg38.2bit'
    }),
    name: 'Reference'
  },
  {
    viz: pileup.viz.scale(),
    name: 'Scale'
  },
  {
    viz: pileup.viz.location(),
    name: 'Location'
  },
  {
    viz: pileup.viz.genes(),
    data: pileup.formats.bigBed({
      url: 'http://www.biodalliance.org/datasets/ensGene.bb'
    }),
    name: 'Genes'
  },
  {
    viz: pileup.viz.variants(),
    data: pileup.formats.GAVariant({
        token: 'eyJraWQiOiJEKytGNk9FK1FWYW9NNTdGZHo0TmRVdDlFUUhWUmFuaUpSbnpPdjlJaXdJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIxMDFkYTk4MS0yNzNkLTQ4NjUtOWYzYy1mZGM3MGY0NTYzODYiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBlbWFpbCIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX1NCdEdtY0o3VCIsImV4cCI6MTUxMjU2NDYxNCwiaWF0IjoxNTEyNTYxMDE0LCJ2ZXJzaW9uIjoyLCJqdGkiOiJkMGMwZGQyYi1mNDlhLTRjN2YtODMzZi03MWZkMDYxYzRmNjIiLCJjbGllbnRfaWQiOiI5MTVjbWhzNmtrZDMxOHA5bTdwdXQzbGNhIiwidXNlcm5hbWUiOiJtYXJrLnNjaHJvZXJpbmcifQ.nzLqze_w7UgA1Xcvc4fGSc7FH1QLuEQB1rrYQ2JDDbMuC6cQPYCBoTWjQ1hiQSH8bpspjA91GVG655ZFvJihmb3yDhrEhjJOKRo_Fj_qdEve3YisMDBi_SEvRseA0kcAc65K0FE36rlGQoDt9JKKdG95xEAPgt3oV9Z0D7p3pdv0lwxtMWCmhtg6Kv1M0MA6aNu0hOgQ-i6zaGrHbe3jmiBBk2hSlS8w1rBRqtfy-j8wzIIEAwSLDrdSlAsneH6osAJN2yLbn4--76ZtJpo4UykqzPigPcYn7CfmQarjvJFQB7gN5gSUwNjm_tamYQalVNfCHp0ENZBC1pZGfKjDxw',
        endpoint: ga4ghReferenceServer,
        variantSetId: '1221eea2-9553-468d-9db3-c8145570d954',
        callSetIds: ["1221eea2-9553-468d-9db3-c8145570d954:Kapa400"],
    }),
    options: {
      onVariantClicked: function(data) {
        var content = "Variants:\n";
        for (var i =0;i< data.length;i++) {
          content += `${data[i].id}: Ref: ${data[i].ref}, Alt: `;
          data[i].alt.forEach(alt => {
            content += `${alt} `;
          })
          content += '\n';
        }
        alert(content);
      },
    },
    name: 'Kapa400'
  }/*,
  {
    viz: pileup.viz.coverage(),
    data: pileup.formats.GAReadAlignment({
      token: 'eyJraWQiOiJEKytGNk9FK1FWYW9NNTdGZHo0TmRVdDlFUUhWUmFuaUpSbnpPdjlJaXdJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIxMDFkYTk4MS0yNzNkLTQ4NjUtOWYzYy1mZGM3MGY0NTYzODYiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBlbWFpbCIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX1NCdEdtY0o3VCIsImV4cCI6MTUxMjUyMTE1NiwiaWF0IjoxNTEyNTE3NTU2LCJ2ZXJzaW9uIjoyLCJqdGkiOiIwZDc4OWVlNS0yMTBkLTRhODEtYmUwMS0yZmVmZjk4ZjcyODYiLCJjbGllbnRfaWQiOiI5MTVjbWhzNmtrZDMxOHA5bTdwdXQzbGNhIiwidXNlcm5hbWUiOiJtYXJrLnNjaHJvZXJpbmcifQ.eth62m1oZUfIi1dw21PTVvtET9haw4aG_qopx52O5iz6F3hO2MiY7W1sJq1uaoRBwiWHTeWMQ2mUTSCYhcyanwHl9bycZKNl_PokuCD1xh8mwcUzXogHmED2CdqTDDMxUmXwAc0RPojr0naO-k9GIl9392HMc8lm_NDmRxTCw8-Ec7MRlLrjTAXMqjGV79FV69xowQ3_Muj4jxNYBr2mqKLlj92bYhNkH2BhmrRwUt1nw5m7KQU9tRWsFzcLRg7dnXmvVsh_wK4tlJX92VUizY0h6nEDhYGU7QP-rR6J3v0YIp0iOCR9ftAdxVrotWUBce7YpHGzmk81Yx-iE_JEgQ',
      endpoint: ga4ghReferenceServer,
      readGroupId: '1024eedb-490b-4a8e-9214-d2f811ec17e3:Kapa400'
    }),
    cssClass: 'normal',
    name: 'Alignments'
  } /*
  {
    viz: pileup.viz.pileup(),
    data: pileup.formats.GAReadAlignment({
      endpoint: ga4ghReferenceServer,
      readGroupId: "WyIxa2dlbm9tZXMiLCJyZ3MiLCJOQTEyODc4IiwiU1JSNjIyNDYxIl0",
      forcedReferenceId: "WyJOQ0JJMzciLCIxIl0"
    }),
    cssClass: 'normal',
    name: 'NA12878'
  } */
];

var range = {contig: 'chr1', start: 120000, stop: 125000};
