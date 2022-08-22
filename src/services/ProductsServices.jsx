import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
});

export default class ProductsService{
    static async getCurrencies(){
        const response = await client
        .query({
            query : gql `
            {  currencies{
                label,
                symbol
              },
            }`
        })
        return response.data.currencies;
    }

    static async getCategories(){
        const response = await client
        .query({
            query : gql `
            {  categories{
                name
                }
            }`
        })
        return response.data.categories;
    }
    static async getProductsByCategories(value){
        const response = await client
        .query({
            query : gql`
            {
                category(input: {title: "${value}"}) {
                    name
                    products {
                        id
                        name
                        brand
                        inStock
                        gallery
                        prices {
                            currency {
                                symbol
                            }
                            amount
                        }
                        attributes{
                            id
                        }
                    }
                }
            }`
        })
        return (response.data.category.products);
    }
    static async getFullProductInfo(value){
        const response = await client
        .query({
            query : gql`
            {
                product(id : "${value}") {
                    name
                    inStock
                    gallery
                    description
                    category
                    attributes{
                        id,
                        name,
                        type,
                        items{
                            displayValue,
                            value,
                            id
                            }
                        }
                    prices {
                        currency {
                            symbol
                        }
                        amount
                    }
                    brand
                }
            }`
        })
        console.log(response.data.product);
        return (response.data.product);
    }
}