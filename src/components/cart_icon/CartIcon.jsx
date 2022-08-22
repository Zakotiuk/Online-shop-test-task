import React, { Component } from "react";
import Basket from '../../image/Basket.png'
import './CartIcon.css'
import '../main_styles.css'
import UsefulFunction from "../../utils/usefulFunctions";
class CartIcon extends Component{

    state  = {
        count : 0
    }

    setModalActive = (isModalActive) =>{
        this.props.setModalActive(isModalActive);
    }

    componentDidMount(){
        localStorage.getItem("count") == null
        ? this.setState({
            count : 0
        })
        : this.setState({
            count : localStorage.getItem("count")
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.isChangedCount != this.props.isChangedCount){
            console.log(this.props.isChangedCount)
            if(this.props.isIncrement)
                UsefulFunction.incrementCountCart();
            else
                UsefulFunction.decrementCountCart();

            this.setState({
                count : localStorage.getItem("count")
            })
        }
    }

    render(){
        return(
            <div onClick={()=> this.setModalActive(true)} className="div_cart_icon">
                <img className="img_basket" src={Basket}/>
                <span className="circle_counter fnt-wgh7">{this.state.count}</span>
            </div>
        )
    }
}

export default CartIcon