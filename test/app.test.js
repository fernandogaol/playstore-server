const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');

describe('GET /apps', () => {
  it('should return an array', () => {
    return request(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        const apps = res.body[0];
        expect(apps).to.include.all.keys('App', 'Rating', 'Genres');
      });
  });

  it('should be 400 if sort is incorrect', () => {
    return request(app)
      .get('/apps')
      .query({ sort: 'MISTAKE' })
      .expect(400, 'Sort must be one of app or rating');
  });
  it('should sort by app name', () => {
    return request(app)
      .get('/apps')
      .query({ sort: 'App' })
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array');
        let i = 0;
        let sorted = true;
        while (sorted && i < res.body.length - 1) {
          sorted = sorted && res.body[i].App < res.body[i + 1];
          i++;
        }
        expect(sorted).to.be.true;
      });
  });
});
