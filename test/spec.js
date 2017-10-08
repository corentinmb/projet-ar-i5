var request = require('supertest');
var assert = require('chai').assert;
describe('Test du serveur', function () {
  var server;
  beforeEach(function () {
    server = require('./../server');
  });
  afterEach(function () {
    server.close();
  });
  it('réponse serveur', function testConnexion(done) {
    assert.isNotNull(server);
    done();
  });
 
});
describe('Test des routes', function () {
  var server;
  beforeEach(function () {
    server = require('./../server');
  });
  afterEach(function () {
    server.close();
  });
  // RACINE
  it('réponse de la racine /', function testRacine(done) {
  request(server)
    .get('/')
    .expect(200, done);
  });

  // STATS
  it('réponse de la page /stats', function testStats(done) {
    request(server)
      .get('/stats')
      .expect(200, done);
  });
    
  // ADMIN
  it('réponse des routes /admin', function testAdmin(done) {
    request(server)
      .get('/admin')
      .expect(302);
    request(server)
      .get('/admin/login')
      .expect(302);
    request(server)
      .get('/admin/logout')
      .expect(302, done);
  });
      
  // CLIENT
  it('réponse des routes /client', function testClient(done) {
    request(server)
      .get('/client')
      .expect(200);
    request(server)
      .get('/client/connect')
      .expect(200, done);
  });
    
});