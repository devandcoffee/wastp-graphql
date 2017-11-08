const User = `
  type User {
    id: ID!
    tourneys: [Tourney]
    teams: [Team]
    players: [Player]
    uid: String
    email: String
    created_at: String
    updated_at: String
  }

  input NewUser {
    email: String!
    password: String!
  }
`;

export default User;
