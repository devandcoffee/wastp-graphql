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
    accepted
    pending
    rejected
  }
`;

export default CommonTypes;
