const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLInt } = graphql;
const _ = require('lodash');
const faker = require('faker');

// Product modal defination
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

// Generating static record of products that will be used in API.
let products = []
for (var i = 0; i < 500000; i++) {
    products.push({
        id: (i+1),
        name: faker.commerce.productName(),
        price:faker.commerce.price(),
        image:`https://picsum.photos/id/${i+1}/300/300`,
        description:faker.lorem.paragraph()
    })
}

/**
 * Root query defination
 *
 * @type       {GraphQLObjectType}
 */
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

/**
 * Gets the paginated items.
 *
 * @param      {array}   items     The items
 * @param      {number}  page      The page
 * @param      {number}  per_page  The per page
 * @return     {array}   The paginated items.
 */
const getPaginatedItems = (items =[], page = 1, per_page = 10) => {
    let currentPage = page
    let offset = (page - 1) * per_page
    let paginatedItems = _.drop(items, offset).slice(0, per_page);
    return paginatedItems;
}

module.exports = new GraphQLSchema({
    query: RootQuery,
});
