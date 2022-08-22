import React, { Component } from "react";
import './CartModal.css'
import '../main_styles.css'
import { Link } from "react-router-dom";
import CartModalItem from "../cart_modal_item/CartModalItem";
import UsefulFunction from "../../utils/usefulFunctions";

class CartModal extends Component{
    state = {
        totalPrice : 0,
        cartInfo : [],
        currency: "",
        currencyId : 0, 
        count : 0, 
        isChangedCount : null
    }

    componentDidMount(){
        JSON.parse(localStorage.getItem("cartInfo")) != null
        ? this.setState({
            cartInfo : JSON.parse(localStorage.getItem("cartInfo")),
            })
        : this.setState({
            cartInfo : this.props.cartInfo
        }) 
        this.setState({
            currency : localStorage.getItem("currency"),
            currencyId : parseInt(localStorage.getItem("currencyId")),
            isChangedCount : JSON.parse(localStorage.getItem("isChangedCount"))
        })
    }
   
    componentDidUpdate(prevProps) {
        if (prevProps.currencyId !== this.props.currencyId || prevProps !== this.props){
            this.changeTotalPrice();
            this.setState({
                cartInfo : JSON.parse(localStorage.getItem("cartInfo"))
            })
            this.setState({
                currency : localStorage.getItem("currency"),
                currencyId : parseInt(localStorage.getItem("currencyId"))
            })
        }
    }

    changeTotalPrice = () =>{
        let myTotalPrice = UsefulFunction.changeTotalPrice(JSON.parse(localStorage.getItem("cartInfo")));
        this.setState({
            totalPrice : myTotalPrice
        })
    }

    incrementCount = (id) => {
        UsefulFunction.incrementCountProduct(this.state.cartInfo[id]);
        this.changeTotalPrice();
        this.setState({
            isChangedCount : !JSON.parse(localStorage.getItem("isChangedCount"))
        })
        localStorage.setItem("isChangedCount", !JSON.parse(localStorage.getItem("isChangedCount")))
        this.props.setCoutnAndIncrement(true, !this.state.isChangedCount);
    }

    decrementCount = (id) =>{
        UsefulFunction.decrementCountProduct(this.state.cartInfo[id]);
        this.changeTotalPrice();
        this.setState({ 
            isChangedCount : !JSON.parse(localStorage.getItem("isChangedCount"))
        })
        localStorage.setItem("isChangedCount", !JSON.parse(localStorage.getItem("isChangedCount")))
        this.props.setCoutnAndIncrement(false, !this.state.isChangedCount);
    }

    render(){
        return (
          <div className={this.props.active ? "div_cart_modal active" : "div_cart_modal"} onClick={()=>this.props.setActive(false)}>
            <div className="div_content_modal" onClick={e => e.stopPropagation()}>
                <div className="div_count_info">
                    <span className="fnt-sz16 fnt-wgh7">My Bag,</span>
                    <span className="fnt-sz16 fnt-wgh5">{this.state.cartInfo?.length} items</span>
                </div>
               
                        { this.state.cartInfo?.map((elem, index)=>
                <CartModalItem count={this.state.count} decrementCount={this.decrementCount} incrementCount={this.incrementCount} id={index} key={index} elem={elem} currencyId={this.state.currencyId}></CartModalItem>
            )}
                <div className="div_modal_resume"> 
                        <div className="_spans">
                            <span className="fnt-fml-rbt fnt-wgh5 fnt-sz16">Total</span>
                            <span className="fnt-sz16 fnt-wgh7">{this.state.currency}{this.state.totalPrice}</span>
                        </div>
                    <div className="_buttons">
                    <Link to={"/cart"}>
                        <button className="_white"><span className="fnt-wgh6 fnt-fml-rlw fnt-sz14" onClick={this.changeTotalPrice}>View bag</span></button>
                    </Link>
                        <button className="_green "><span className="fnt-wgh6 fnt-fml-rlw fnt-sz14" onClick={this.changeTotalPrice}>Check out</span></button>
                    </div>
                </div>
            </div>         
        </div>
        )
    }
}
export default CartModal;