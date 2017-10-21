const Status = Object.freeze({
  REJECTED: 'rejected', ACCEPTED: 'accepted', PENDING: 'pending'
})

const TourneyTypes = Object.freeze({
  LEAGUE: 'league', CUP: 'cup'
})

module.exports = {
  Status,
  TourneyTypes
}
