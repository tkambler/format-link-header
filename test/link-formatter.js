var formatter = require('../src/link-formatter');
var expect = require('chai').expect;

describe('+ link-formatter', function() {
  describe('#format', function() {
    it('should format a proper link header with next and last attributes', function() {
      var linkHeader =
        '<https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=2&per_page=100>; rel="next", ' +
        '<https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=3&per_page=100>; rel="last"';

      var linkObject = {
        next: {
          client_id: '1',
          client_secret: '2',
          page: '2',
          per_page: '100',
          rel: 'next',
          url: 'https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=2&per_page=100'
        },
        last: {
          client_id: '1',
          client_secret: '2',
          page: '3',
          per_page: '100',
          rel: 'last',
          url: 'https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=3&per_page=100'
        }
      };


      expect(formatter.format(linkObject)).to.be.equal(linkHeader);
    });

    it('it should parse a proper link header with next, prev and last attributes', function() {
      var linkHeader =
        '<https://api.github.com/user/9287/repos?page=3&per_page=100>; rel="next", ' +
        '<https://api.github.com/user/9287/repos?page=1&per_page=100>; rel="prev", ' +
        '<https://api.github.com/user/9287/repos?page=5&per_page=100>; rel="last"';

        var linkObject = {
          next: {
            page: '3',
            per_page: '100',
            rel: 'next',
            url: 'https://api.github.com/user/9287/repos?page=3&per_page=100'
          },
          prev: {
            page: '1',
            per_page: '100',
            rel: 'prev',
            url: 'https://api.github.com/user/9287/repos?page=1&per_page=100'
          },
          last: {
            page: '5',
            per_page: '100',
            rel: 'last',
            url: 'https://api.github.com/user/9287/repos?page=5&per_page=100'
          }
        };

        expect(formatter.format(linkObject)).to.be.equal(linkHeader);
    });

    it('should return a blank string if the link object is nullable', function() {
      expect(formatter.format(null)).to.be.equal('');
      expect(formatter.format(undefined)).to.be.equal('');
    });

    it('should group together properties with related rel attribute values', function() {
      var linkHeader = '<https://imaginary.url.notreal/?name=What,+me+worry>; rel="next page";';
      var linkObject = {
        page: {
          rel: 'page',
          name: 'What, me worry',
          url: 'https://imaginary.url.notreal/?name=What,+me+worry'
        },
        next: {
          rel: 'next',
          name: 'What, me worry',
          url: 'https://imaginary.url.notreal/?name=What,+me+worry'
        }
      };

      expect(formatter.format(linkObject)).to.be.equal(linkHeader);
    });
  });
});
