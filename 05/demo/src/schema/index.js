import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    printSchema,
  } from 'graphql';
  import Hotels from './types/hotel.js';
  import { addHotel } from '../utils'; //Resolver-function
  
  const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: { 
        createHotel: {
            type: Hotels, 
            args: {
                hotelname, 
                numberofrooms,
                availablerooms
            },
            resolve: function(source, {hotelname, numberofrooms, availablerooms}){
                return addHotel(hotelname, numberofrooms, availablerooms)
            }
        }
    },
  });
  
  export const schema = new GraphQLSchema({
    query: QueryType,
  });
  
  console.log(printSchema(schema));
  