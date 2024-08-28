/**
 * Role.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
    BASE_ROLES: {
      SUPER_ADMIN: 1,
      ADMIN: 2,
    },
    // datastore: 'mysql',
    attributes: {
      id: {
        type: 'number',
        columnType: 'bigint',
        autoIncrement: true,
      },
      name: {
        type: 'string',
        columnType: 'text'
      },
      description: {
        type: 'string',
        columnType: 'text'
      }
  
    },
    bootstrap: async () => {
      return true;
    }
  
  };