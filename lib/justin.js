/**
 * Created by asonawane on 6/17/16.
 */
'use strict';


// Save as transform-document
module.exports = function(person, addresses) {
    return {
        firstName: person.firstName,
        lastName: person.lastName,
        fullName: person.firstName + ' ' + person.lastName,
        homeAddress: addresses.homeAddress
    }
};
