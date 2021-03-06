import {
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
} from 'graphql';
import User from './user';
import Approach from './approach';
import { extractPrefixedColumns } from '../../db/utils';

const Task = new GraphQLObjectType({
    name: 'Task',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        tags: {
            type: new GraphQLNonNull(
                new GraphQLList(new GraphQLNonNull(GraphQLString))
            ),
            resolve: (source) => source.tags.split(','),
        },
        approachCount: { type: new GraphQLNonNull(GraphQLInt) },
        createdAt: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (source) => source.createdAt.toISOString(),
        },
        author: {
            type: new GraphQLNonNull(User),
            resolve: (source) =>
                extractPrefixedColumns({ prefixedObject: source, prefix: 'author' }),
        },
        approachList: {
            type: new GraphQLNonNull(
                new GraphQLList(new GraphQLNonNull(Approach))
            ),
            resolve: (source, args, { pgApi }) =>
                pgApi.approachList(source.id),
        },
    },
});
export default Task;