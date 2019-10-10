module.exports = {
  name: 'venturplex-go-devops-example',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/venturplex-go-devops-example/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
