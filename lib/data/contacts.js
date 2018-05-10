const debug = require('debug')('qcloud-sdk[auth]')
const { insertContact } = require('../mysql/Contact')

module.exports = (req) => {
  let { contacts, uid } = req.body;
  if (contacts && uid) {
    return insertContact(contacts, uid)
    .then(res => {
      console.log('---server api------', res)
    })
  }
}