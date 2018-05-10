const debug = require('debug')('qcloud-sdk[AuthDbService]')
const { uniq } = require('lodash')
const uuidGenerator = require('uuid/v4')
const moment = require('moment')
const ERRORS = require('../constants').ERRORS
const mysql = require('./index')
/**
 * Get user contact data
 *
 * @param {string} userId
 * @returns {Promise}
 */
function getContact(userId) {
  if (!userId) {
    throw new Error(ERRORS.DBERR.ERR_MISSING_PARAM)
  }
  return mysql('cContact').select('contact').where({
    owner_id: userId
  })
    .then(res => {
      console.log('----get contacts---', res);
      return res && res[0] && res[0].contact || []
    })
    .catch(e => {
      debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
      throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    })
}

/**
 * Insert contacts
 * @param {string|array} contacts
 * @param {string} userId
 */
function insertContact(contacts, userId) {
  if (!contacts || !userId) {
    throw new Error(ERRORS.DBERR.ERR_MISSING_PARAM)
  }

  if (typeof contact === 'string') {
    contacts = [contacts]
  }

  return mysql('cContact').select('*').where({
    owner_id: userId
  })
    .then(res => {
      let oldContacts = JSON.parse(res[0].contacts || "[]")
      contacts = JSON.stringify(uniq([...contact, ...oldContacts]))
      return mysql('cContact').update({
        contact: contacts
      })
      .where({
        owner_id: userId
      })
    })
}

module.exports = {
  getContact,
  insertContact
}
