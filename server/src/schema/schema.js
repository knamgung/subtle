const graphql = require("graphql");
const History = require("../models/history");
const Images = require("../models/images");
const UsersDB = require("../models/users");

const mongoose = require("mongoose");
var db = mongoose.connection;
const _ = require("lodash");

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

var history = [
  {
    title: "Untitled",
    date: "Sept 5",
    userId: "1"
  },
  {
    title: "History",
    date: "Sept 5",
    userId: "1"
  },
  {
    title: "History",
    date: "Sept 5",
    userId: "2"
  }
];

var images = [
  {
    imgSrc: "src",
    resultValue: "RV",
    result: "result",
    image: "ah",
    userId: "1",
    title: "Untitled"
  },
  {
    imgSrc: "1",
    resultValue: "RV",
    result: "result",
    image: "ah",
    historyId: "1",
    title: "History"
  }
];

var users = [
  {
    userId: "1"
  }
];

const HistoryType = new GraphQLObjectType({
  name: "history",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    userId: { type: GraphQLString },
    resource: {
      type: new GraphQLList(ImgSrcType),
      resolve(parents, args) {
        return Images.find({ title: parents.title });
      }
    }
  })
});

const InputHistoryType = new GraphQLInputObjectType({
  name: "historyInput",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    userId: { type: GraphQLString },
    resource: {
      type: new GraphQLList(InputImgSrcType),
      resolve(parents, args) {
        return Images.find({ title: parents.title });
      }
    }
  })
});

const User = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    userId: { type: GraphQLString },
    allHistory: {
      type: new GraphQLList(HistoryType),
      resolve(parent, args) {
        return History.find();
      }
    }
  })
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
    resultValue: { type: GraphQLString },
    result: { type: GraphQLString },
    title: { type: GraphQLString }
  })
});

const InputImgSrcType = new GraphQLInputObjectType({
  name: "imagesInput",
  fields: () => ({
    resultValue: { type: GraphQLString },
    result: { type: GraphQLString }
  })
});

//RootQuery describe how users can use the graph and grab data.
//E.g Root query to get all authors, get all books, get a particular book
//or get a particular author.
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // User: {
    //   type: User,
    //   args: {
    //     userId: { type: GraphQLID }
    //   },
    //   resolve(parent, args) {
    //     //Here we define how to get data from database source

    //     //this will return the book with id passed in argument by the user
    //     return Users.find({ userId: args.userId });
    //   }
    // }

    allHistory: {
      type: GraphQLList(HistoryType),
      args: { userId: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(parent, args) {
        return History.find();
      }
    },

    histories: {
      type: GraphQLList(HistoryType),
      resolve(parent, args) {
        return History.find();
      }
    },

    users: {
      type: User,
      args: { userId: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(parent, args) {
        console.log(args.userId);

        return UsersDB.find(args.userId);
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
        userId: { type: new GraphQLNonNull(GraphQLString) }
      },

      resolve(parent, args) {
        let user = new UsersDB({
          userId: args.userId,
          allHistory: []
        });

        return user.save();
      }
    },

    addResult: {
      type: User,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        resource: { type: new GraphQLNonNull(GraphQLList(InputImgSrcType)) }
      },

      resolve(parent, args) {
        args.resource.map((img, i) => {
          let resource = new Images({
            resultValue: img.resultValue,
            result: img.result,
            title: args.title
          });

          return resource.save();
        });

        let history = new History({
          userId: args.userId,
          title: args.title,
          date: new Date(),
          resources: args.resource
        });

        console.log(args.resource);

        return history.save();
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
