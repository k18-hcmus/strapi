const { sanitizeEntity } = require('strapi-utils')

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    const { id } = ctx.params
    const entity = await strapi.services.post.findOne({ id })
    return sanitizeEntity(entity, { model: strapi.models.post })
  },

  async findAllComment(ctx) {
    const { id } = ctx.params

    const entity = await strapi
      .query('comment')
      .find({ Post: id, _sort: 'id:desc' })

    ctx.body = entity.map((e) => {
      const { Post, ...comment } = e
      return comment
    })
  }
}
