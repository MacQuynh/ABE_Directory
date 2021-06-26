import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  printSchema,
  GraphQLList, } from 'graphql';

import Task from './types/task';
  
const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    taskMainList: {
      type: new GraphQLList(new GraphQLNonNull(Task)),
      resolve: async (source, args, { pgPool }) => {
        const pgResp = await pgPool.query(`          
          SELECT *
          FROM azdev.tasks
          WHERE is_private = FALSE
          ORDER BY created_at DESC
          LIMIT 100
        `);
        return pgResp.rows;
      },
    },
  },
});

// SELECT id, content, tags,
//   approach_count AS "approachCount", created_at AS "createdAt"

export const schema = new GraphQLSchema({
  query: QueryType,
});

console.log(printSchema(schema));