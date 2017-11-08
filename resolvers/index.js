import { merge } from 'lodash';
import userResolvers from './User';
import tourneyResolvers from './Tourney';
import playerResolvers from './Player';
import teamResolvers from './Team';
import fixtureResolvers from './Fixture';

const resolvers = merge(
  userResolvers,
  tourneyResolvers,
  playerResolvers,
  teamResolvers,
  fixtureResolvers,
);

export default resolvers;
