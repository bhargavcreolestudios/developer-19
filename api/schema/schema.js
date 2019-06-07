const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLInt } = graphql;
const _ = require('lodash');
const faker = require('faker');

const ProductsModal = new GraphQLObjectType({
    name: 'Product',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        price: { type: GraphQLString },
        image: { type: GraphQLString },
        description: { type: GraphQLString },
    },
});

let products = []
for (var i = 0; i < 1000; i++) {
    products.push({
        id: (i+1),
        name: faker.commerce.productName(),
        price:faker.commerce.price(),
        image:`https://picsum.photos/id/${i+1}/300/300`,
        description:faker.lorem.paragraph()
    })
}

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        product: {
            type: ProductsModal,
            args: { id: { type: GraphQLString }},
            resolve(parentValue, args) {
                return _.find(products, { id: args.id });
            },
        },
        products: {
            type: new GraphQLList(ProductsModal),
            args: { from: { type: GraphQLInt}, limit: { type: GraphQLInt}},
            resolve(parentValue, args) {
                let response = getPaginatedItems(products, args.from, args.limit)
                return response
            },
        },
    },
});

function getPaginatedItems(items, page, per_page) {
    let currentPage = page || 1
    let offset = (page - 1) * per_page
    let paginatedItems = _.drop(items, offset).slice(0, per_page);
    return paginatedItems;
}

module.exports = new GraphQLSchema({
    query: RootQuery,
});
