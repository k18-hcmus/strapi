const { findPublishPost } = require('../controllers/post')
const _ = require('lodash')
module.exports = {
  /**
   * Promise to fetch record
   *
   * @return {Promise}
   */

  findOne(params, populate) {
    return strapi
      .query('post')
      .findOne(
        params,
        ['Tags', 'Comments', 'Comments.User', 'PostVotes', 'User'],
        {
          orderBy: { comment: { id: 'desc' } }
        }
      )
  },
  async findPublishPost(params, populate) {
    const results = await strapi
      .query('post')
      .find({ ...params, Status: 'Publish' }, populate)
    return results
  }
}
