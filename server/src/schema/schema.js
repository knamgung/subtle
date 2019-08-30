const graphql = require("graphql");
const History = require("../models/history");
const Users = require("../models/img");

//Schema defines data on the Graph like object types(book type), relation between
//these object types and descibes how it can reach into the graph to interact with
//the data to retrieve or mutate the data

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} = graphql;

const HistoryType = new GraphQLObjectType({
  name: "history",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    img: { type: new GraphQLList(ImgSrcType) }
  })
});

const InputHistoryType = new GraphQLInputObjectType({
  name: "historyInput",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    img: { type: new GraphQLList(InputImgSrcType) }
  })
});

const User = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    userId: { type: GraphQLID },
    allHistory: {
      type: new GraphQLList(AllHistoryType)
    }
  }),

  resolve(parent, arg) {
    return Users.find(user => {
      return (user.userId = parent.userId);
    });
  }
});

const AllHistoryType = new GraphQLObjectType({
  name: "allHistory",
  fields: () => ({
    history: {
      type: new GraphQLList(HistoryType)
    }
  })
});

const InputAllHistoryType = new GraphQLInputObjectType({
  name: "allHistoryInput",
  fields: () => ({
    history: {
      type: new GraphQLList(InputHistoryType)
    }
  })
});

const ImgSrcType = new GraphQLObjectType({
  name: "images",
  fields: () => ({
    imgSrc: { type: GraphQLString },
    resultValue: { type: GraphQLString },
    result: { type: GraphQLString },
    image: { type: GraphQLString },
    userId: { type: GraphQLID }
  })
});

const InputImgSrcType = new GraphQLInputObjectType({
  name: "imagesInput",
  fields: () => ({
    imgSrc: { type: GraphQLString },
    resultValue: { type: GraphQLString },
    result: { type: GraphQLString },
    image: { type: GraphQLString },
    userId: { type: GraphQLID }
  })
});

//RootQuery describe how users can use the graph and grab data.
//E.g Root query to get all authors, get all books, get a particular book
//or get a particular author.
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    User: {
      type: User,
      args: {
        userId: { type: GraphQLID }
      },
      resolve(parent, args) {
        //Here we define how to get data from database source

        //this will return the book with id passed in argument by the user
        return a.find(b => {
          return (b.userId = args.userId);
        });
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: User,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args) {
        let user = new Users({
          userId: args.userId,
          allHistory: []
        });
        return user.save();
      }
    },
    addResult: {
      type: User,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        historyType: { type: new GraphQLNonNull(InputImgSrcType) }
      },
      resolve(parent, args) {
        let result = new History(args.history);
        return Users.find({ userId: args.userId });
      }
    }
  }
});

//Creating a new GraphQL Schema, with options query which defines query
//we will allow users to use when they are making request.
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
