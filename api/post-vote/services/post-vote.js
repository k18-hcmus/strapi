const { isDraft } = require('strapi-utils').contentTypes

module.exports = {
  /**
   * Promise to add record
   *
   * @return {Promise}
   */

  async create(data) {
    const validData = await strapi.entityValidator.validateEntityCreation(
      strapi.models.postVote,
      data,
      { isDraft: isDraft(data, strapi.models.postVote) }
    )

    const entry = await strapi.query('post-vote').create(validData)

    // Update upvote count & downvote count of post
    const postId = data.Post.id || data.Post
    const postVotes = await strapi.query('post-vote').find({ Post: postId })
    const upvotes = postVotes.filter((v) => v.Upvote)
    const downVotes = postVotes.filter((v) => v.Downvote)
    await strapi
      .query('post')
      .update(
        { id: postId },
        { UpvoteCount: upvotes.length, DownvoteCount: downVotes.length }
      )

    return entry
  },

  /**
   * Promise to edit record
   *
   * @return {Promise}
   */

  async update(params, data) {
    const existingEntry = await strapi.query('post-vote').findOne(params)
    const postId = existingEntry.Post.id

    const validData = await strapi.entityValidator.validateEntityCreation(
      strapi.models.postVote,
      data,
      { isDraft: isDraft(data, strapi.models.postVote) }
    )

    const entry = await strapi.query('post-vote').update(params, validData)

    // Update upvote count & downvote count of post
    const postVotes = await strapi.query('post-vote').find({ Post: postId })
    const upvotes = postVotes.filter((v) => v.Upvote)
    const downVotes = postVotes.filter((v) => v.Downvote)
    await strapi
      .query('post')
      .update(
        { id: postId },
        { UpvoteCount: upvotes.length, DownvoteCount: downVotes.length }
      )

    return entry
  }
}
