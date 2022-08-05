import { ProfileTypeDefs, ProfileResolvers } from "./Profile.sdl";
import { RoleTypeDef, RoleResolvers } from "./Role.sdl";

export const typeDefs = [ProfileTypeDefs, RoleTypeDef];
export const resolvers = [ProfileResolvers, RoleResolvers];
