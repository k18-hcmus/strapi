module.exports = {
  /**
   * Promise to fetch record
   *
   * @return {Promise}
   */

  findOne(params, populate) {
    return strapi
      .query('post')
      .findOne(params, ['Tags', 'Comments', 'Comments.User', 'PostVotes'], {
        orderBy: { comment: { id: 'desc' } }
      })
  }
}
