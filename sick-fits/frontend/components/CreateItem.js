import React, {Component} from 'react';
import Router from 'next/router';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $description: String!
        $price: Int!
        $image: String
        $largeImage: String
    ) {
        createItem(
            title: $title
            description: $description
            price: $price
            image: $image
            largeImage: $largeImage
        ) {
            id
        }
    }
`;

class CreateItem extends Component {
    state = {
        title: 'Cool Title',
        description: 'Coll title desc',
        image: 'shoe.jpg',
        largeImage: 'largeShoe.jpg',
        price: 8400
    };
    handleChange = (event) => {
        const {name, type, value} = event.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({[name]: val});
    };

    render() {
        return (
            <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
                {(createItem, {loading, error}) => (
                    <Form onSubmit={async (event) => {
                        // stop the form from submitting
                        event.preventDefault();
                        // call the mutation
                        const res = await createItem();
                        // change them to the single item page
                        console.log(res);
                        Router.push({
                            pathname: '/item',
                            query: { id: res.data.createItem.id }
                        });
                    }}>
                        <Error error={error} />
                        <fieldset disabled={loading} aria-busy={loading}>
                            <label htmlFor="title">
                                Title
                                <input type="text" id="title" name="title"
                                       placeholder="Title" required value={this.state.title}
                                       onChange={this.handleChange}/>
                            </label>

                            <label htmlFor="price">
                                Price
                                <input type="number" id="price" name="price"
                                       placeholder="Price" required value={this.state.price}
                                       onChange={this.handleChange}/>
                            </label>

                            <label htmlFor="description">
                                Description
                                <input id="description" name="description"
                                       placeholder="Enter a Description" required value={this.state.description}
                                       onChange={this.handleChange}/>
                            </label>

                            <button type='submit'>Submit</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        );
    }
}

export default CreateItem;
export {CREATE_ITEM_MUTATION};