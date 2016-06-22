/**
 * Created by asonawane on 6/17/16.
 */

var assert = require('assert');

describe('transform document', function() {


    var transformDocument = require('../lib/transform-document.js');

    var person = {
        firstName: 'john',
        lastName: 'smite'
    };

    var addresses = {
        homeAddress: {
            streetAddress1: '808 Hollywood Ave',
            streetAddress2: '',
            city: 'Silvers Spring'
        }
    };

    it('should build an object with firstName set to person.firstName', function() {
        var result = transformDocument(person, addresses);
        assert.equal(result.firstName, 'john');
    });

    it('should build an object with fullName set to person.firstName concatenated with person.lastName', function() {
        var result = transformDocument(person, addresses);
        assert.equal(result.fullName, 'john smite');
    });

});
