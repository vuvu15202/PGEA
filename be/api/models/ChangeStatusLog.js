/**
 * ChangeStatusLog.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
      forModel: { type: 'string', required: true },
      forModelId: { type: 'string', required: true },
      before: { type: 'string', description: 'Id trạng thái trước của bản ghi' },
      after: { type: 'string', description: 'ID trạng thái sau của bản ghi' },
      description: { type: 'string', columnType: 'text' }
    },
  
  };
  
  