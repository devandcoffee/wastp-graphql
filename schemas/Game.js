const Game = `
  type Game {
    id: Int
    fixture: Fixture
    local_team: Team
    visitant_team: Team
    local_score: Int
    visitant_score: Int
    date: String
  }
`;

export default Game;
