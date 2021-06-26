import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    printSchema,
  } from 'graphql';

  const Hotels = new GraphQLObjectType({
      name: 'Hotels',
      description: "Hotels Management", 
      fields: {
          hotelname: {
              type: new GraphQLNonNull(GraphQLString),
          },
          numberofrooms: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          availablerooms: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          args: {
            begin: {type: new GraphQLNonNull(GraphQLInt)},
            end: {type: new GraphQLNonNull(GraphQLInt)},
          },
          resolve: function (source, {hotelname, numberofrooms, availablerooms}) {
            return addHotel(hotelname, numberofrooms, availablerooms)
          }
      },
      
  }); 

  export default Hotels;