const CommonTypes = `
  type PageInfo {
    endCursor: String!
    hasNextPage: Boolean
  }

  type MetaInfo {
    totalCount: Int
    currentPage: Int
  }

  enum Status {
    ACCEPTED
    PENDING
    REJECTED
  }
`

module.exports = CommonTypes
