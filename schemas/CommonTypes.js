const CommonTypes = `
  type PageInfo {
    endCursor: String!
    hasNextPage: Boolean
  }

  type MetaInfo {
    totalCount: Int
    currentPage: Int
  }
`

module.exports = CommonTypes
