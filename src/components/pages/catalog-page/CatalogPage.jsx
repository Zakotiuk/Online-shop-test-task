import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProductsService from "../../../services/ProductsServices";
import CardItem from '../../card_item/CardItem';
import './CatalogPage.css'

class CatalogPage extends Component{
    state = {
        products : [],
        category : 'All'
    }

    componentDidMount(){
        this.getProducts();
    }

    getProducts(){
        ProductsService.getProductsByCategories(this.props.category)
        .then((response)=> {
            this.setState({
                products : response
            })
        }, error=> {
            console.log("Error: ", error.response);
        })
        .catch(error => {
            console.log("Server error: ", error)
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.category !== prevProps.category) {
            this.setState({
                category : this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)
            })
            this.getProducts();
        }
    }

    render(){
        return(
            <div className="div_catalog_page">
                <span className="fnt-sz42 fnt-wgh4">{this.state.category}</span>
                <div className="div_cardlist">
                    {
                        this.state.products.map((item, index)=>
                        <Link key={index} to={"/id?=" + `${item.id}`}>
                            <CardItem
                                    id={item.id}
                                    name={item.name}
                                    brand={item.brand}
                                    image={item.gallery[0]}
                                    inStock={item.inStock}
                                    prices={item.prices}
                                    attributes={item.attributes}
                                    changeIsCountChanged={this.props.changeIsCountChanged}
                                    currencyId={localStorage.getItem("currencyId")}/>
                        </Link>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default CatalogPage;