import React, { Component } from "react";
import Basket from '../../image/Basket_green.png'
import './CardItem.css'
import '../main_styles.css'
import UsefulFunction from "../../utils/usefulFunctions";

class CardItem extends Component{
    state = {
        isChangedCount : null
    }
    componentDidMount(){
        this.setState({
            isChangedCount : JSON.parse(localStorage.getItem("isChangedCount"))
        })
    }
    addNewProductToCart = (e) =>{
        e.preventDefault();
        let newElementToCart = {
            allAttributes : this.props.attributes,
            brand : this.props.brand,
            checkedAttributes : [],
            count : 1,
            gallery : [this.props.image],
            name : this.props.name,
            prices : this.props.prices,
            };

        let myArray;
        localStorage.getItem("cartInfo") !== null
        ? myArray = JSON.parse(localStorage.getItem("cartInfo"))
        : myArray = []
            if(myArray.length !== 0 && myArray.findIndex(elem => elem.allAttributes?.length == 0 && elem.name == newElementToCart.name) !== -1)
            {
                myArray = UsefulFunction.changeCountOfProduct(myArray, newElementToCart)
            }
            else
                myArray.push(newElementToCart)
        this.setState({
            isChangedCount : JSON.parse(localStorage.getItem("isChangedCount"))
        })
        localStorage.setItem("isChangedCount", !JSON.parse(localStorage.getItem("isChangedCount")))
        localStorage.setItem("cartInfo", JSON.stringify(myArray));        
        this.props.changeIsCountChanged(this.state.isChangedCount);
        alert("Added to cart!!");
    }
    render(){
        return(
            <div className="div_card_item">
                {
                    !this.props.inStock  && <div className="div_blure"><span className="fnt-sz24 fnt-wgh4">Out of stock</span></div>
                }
                {
                    this.props.attributes.length === 0 && this.props.inStock !== false &&
                    <div onClick={this.addNewProductToCart} className="div_green_basket">
                        <img src={Basket}/>
                    </div>
                }
                    <img className="_image" src={this.props.image}/>
                    <span className={!this.props.inStock ? "span_sold fnt-sz18 fnt-wgh3" : "fnt-sz18 fnt-wgh3"}>{this.props.brand} {this.props.name}</span>
                    <span className={!this.props.inStock ? "span_sold fnt-sz18 fnt-wgh5" : "fnt-sz18 fnt-wgh5"}>{this.props.prices[this.props.currencyId].currency.symbol}{this.props.prices[this.props.currencyId].amount.toFixed(2)}</span>
            </div>
        )
    }
}   

export default CardItem;