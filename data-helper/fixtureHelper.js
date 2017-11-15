const createSchedule = (teams) => {
  const odd = (teams.length % 2) !== 0;
  const evenTeams = odd ? teams.length + 1 : teams.length;

  const gamesAmountByRound = ((evenTeams * (evenTeams - 1)) / 2);
  let reverseIndex = evenTeams - 2;

  const local = new Array(gamesAmountByRound);
  const visitant = new Array(gamesAmountByRound);

  for (let i = 0; i < gamesAmountByRound; i++) {
    if (i % (evenTeams / 2) === 0) {
      //Initial game for each fixture or journey
      //if teams amount is odd the first game is deleted setting it as null
      if (odd) {
        local[i] = null;
        visitant[i] = null;
      } else {
        //Set the first team as local and the last team as visitant
        if ((i % 2) === 0) {
          local[i] = teams[i % (evenTeams - 1)];
          visitant[i] = teams[evenTeams - 1];
        } else {
          local[i] = teams[evenTeams - 1];
          visitant[i] = teams[i % (evenTeams - 1)];
        }
      }
    } else {
      local[i] = teams[i % (evenTeams - 1)];
      visitant[i] = teams[reverseIndex];
      reverseIndex--;
      if (reverseIndex < 0) {
        reverseIndex = evenTeams - 2;
      }
    }
  }

  const games = [];
  for (let i = 0; i < gamesAmountByRound; i++) {
    if (local[i] != null) {
      games.push({
        local_id: local[i].id,
        visitant_id: visitant[i].id,
      });
    }
  }

  const gamesLength = games.length;
  const gamesByFixture = odd ? (teams.length - 1) / 2 : teams.length / 2;
  let j = 0;
  const fixtures = [];
  for (let i = 0; i < gamesLength; i = i + gamesByFixture) {
    fixtures[j] = games.slice(i, i + gamesByFixture);
    j++;
  }

  return fixtures;
};

module.exports = {
  createSchedule,
};
