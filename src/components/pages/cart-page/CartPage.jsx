import React, { Component } from "react";
import Navbar from "../../navbar/Navbar";
import './CartPage.css';
import Plus from '../../../image/Square_plus.png'
import Minus from '../../../image/Square_minus.png'
import Vector from '../../../image/Vector.png'
import UsefulFunction from "../../../utils/usefulFunctions";
import { Link } from "react-router-dom";

class CartPage extends Component{
    state = {
        currencyId : 0,
        currency : "",
        totalPrice : 0,
        products : [],
        offset : 0,
        tax : 0,
        isChangedCount : null
    }

    componentDidMount(){
        this.calculateTax();
        if(localStorage.getItem("cartInfo") !== null){
            this.setState({
                products : JSON.parse(localStorage.getItem("cartInfo"))
            })
        }
        else{
            this.setState({
                products : []
            })
        }
        if(localStorage.getItem("totalPrice")!== null){
            this.setState({
                totalPrice : localStorage.getItem("totalPrice")
            })
        }
        else{
            this.setState({
                totalPrice : 0
            })
        }
        this.setState({
            currencyId : localStorage.getItem("currencyId"),
            currency : localStorage.getItem("currency"),
            isChangedCount : JSON.parse(localStorage.getItem("isChangedCount")),
            count : localStorage.getItem("count")
        })
    }

    calculateTax(){
        let myTax = 0;
        myTax = (parseFloat(localStorage.getItem("totalPrice")) * 0.21).toFixed(2);
        this.setState({
            tax : myTax
        })
    }

    changeActiveCurrency = (newCurrency) =>{
        this.setState({
            currencyId : newCurrency,
            currency : localStorage.getItem("currency"),
            totalPrice : UsefulFunction.changeTotalPrice(this.state.products)
        })
        this.calculateTax();
    }

    prevHandler = (e) =>{
        let localOffset = Math.min(this.state.offset + 200, 0)
        document.getElementById("slider"+e.target.id).style.cssText = `transform : translateX(${localOffset}px);
                                                                        display : flex`
        this.setState({
            offset : localOffset
        })
    }

    nextHandler = (length, e)=>{
        let localOffset = Math.max(this.state.offset - 200, -((200 * length)-200));
        document.getElementById("slider"+e.target.id).style.cssText = `transform : translateX(${localOffset}px);
                                                                        display : flex`
        this.setState({
            offset : localOffset
        })
    }

    submitOrder = () =>{
        alert("We see your order and will send it soon!!");
        localStorage.clear();
    }

    incrementCount = (e) => {
        UsefulFunction.incrementCountProduct(this.state.products[e.target.id]);
        this.setState({
            products : JSON.parse(localStorage.getItem("cartInfo")),
            totalPrice : UsefulFunction.changeTotalPrice(JSON.parse(localStorage.getItem("cartInfo"))),
            isChangedCount : !JSON.parse(localStorage.getItem("isChangedCount")),
            isIncrement : true,
            count : parseInt(localStorage.getItem("count"))+1
        })
        localStorage.setItem("isChangedCount", !JSON.parse(localStorage.getItem("isChangedCount")))
        this.calculateTax();
    }

    decrementCount = (e) =>{
        UsefulFunction.decrementCountProduct(this.state.products[e.target.id]);
        this.setState({
            products : JSON.parse(localStorage.getItem("cartInfo")),
            totalPrice : UsefulFunction.changeTotalPrice(JSON.parse(localStorage.getItem("cartInfo"))),
            isChangedCount : !JSON.parse(localStorage.getItem("isChangedCount")),
            isIncrement : false,
            count : parseInt(localStorage.getItem("count"))-1
        })
        localStorage.setItem("isChangedCount", !JSON.parse(localStorage.getItem("isChangedCount")))
        this.calculateTax();
    }

    render(){
        return(
            <div className="container">
            <Navbar isIncrement={this.state.isIncrement} isChangedCount={this.state.isChangedCount} changeActiveCurrency={this.changeActiveCurrency}></Navbar>
            <div className="div_cart_page">
                <span className="fnt-wgh7 fnt-sz32 upperCase">Cart</span>
                {
                    this.state?.products?.map((element, index)=>
                                
                    <div key={index}>                      
                    <hr></hr>
                    <div className="div_product">

                    <div className="div_info">
                    <span className="fnt-wgh6 fnt-sz30">{element.brand}</span>
                    <span className="fnt-wgh4 fnt-sz30">{element.name}</span>
                    <div>
                        <span className="fnt-wgh7 fnt-sz24">{element.prices[this.state.currencyId].currency.symbol}</span>
                        <span className="fnt-wgh7 fnt-sz24">{element.prices[this.state.currencyId].amount}</span>
                    </div>
                    {
                    element.allAttributes.map((elem, index)=>
                    <div key={index}>
                        {
                            elem.id != "Color"
                                ? 
                                <div>
                                    <span className="fnt-sz18 fnt-wgh7 upperCase fnt-fml-rbt-con">{elem.name}:</span>
                                    <div className="div_modal_size mrg-btm8">
                                    {   
                                        elem.items.map((info, index)=>
                                        <div key={index}>
                                            {
                                                elem.items.length === 2 && element.allAttributes.length > 2 
                                                ?
                                                    <div className={element.checkedAttributes
                                                                                        ?.filter(att => att.value == info.value && att.name == elem.id)[0]?.value == info.value ? "active_attribute" : "non_active_attribute"}>
                                                        {info.value}
                                                    </div> 
                                                :
                                                    <div className={element.checkedAttributes
                                                                                        ?.filter(att => att.value == info.value)[0]?.value == info.value ? "active_attribute" : "non_active_attribute"}>
                                                        {info.value}
                                                    </div>
                                            }
                                        </div>
                                        )
                                    }
                                    </div>
                                </div>
                                :
                                <div>
                                    <span className="fnt-sz18 fnt-wgh7 upperCase fnt-fml-rbt-con">Color:</span>
                                    <div className="div_colors">
                                    {
                                        elem.items.map((info, index)=>
                                        <div key={index} style={{backgroundColor : info.value}} className={[element.checkedAttributes
                                                                                                                                ?.filter(att => att.value == info.value)[0]?.value == info.value ? "div_active_color " : "non_active_color", info.value == "#FFFFFF" && "div_white"].join(' ')}>
                                        </div>)
                                    }
                                    </div>
                                </div>
                        }
                    </div>)}
                    </div>
                    <div className="div_right_info">
                    <div className="div_arrow_count">
                            <img id={index} onClick={this.incrementCount} src={Plus}/>
                            <span className="fnt-sz24 fnt-wgh5">{element.count}</span>
                            <img id={index} onClick={this.decrementCount} src={Minus}/>
                    </div>
                    
                    <div className="main_div_slider">
                    {
                    element.gallery?.length !=1
                    ?
                    <div className="div_slider">
                        <div className="div_vector_buttons">
                            <button id={index} className="button_prev" onClick={this.prevHandler}><img id={index} src={Vector}/></button>
                            <button id={index} className="button_next" onClick={(e) => this.nextHandler(element.gallery?.length, e)}><img id={index} src={Vector}/></button>
                        </div>
                        <div id={"slider"+index} className="slider">
                        {
                            element.gallery?.map((item, index)=>
                            <div key={index}>
                                <img key={index} src={item} className="img_slider"/>
                            </div>
                            )
                        }
                        </div>
                        </div>
                    : <img key={index} src={element.gallery[0]} className="img_slider"/>
                    }
                    </div>
                    </div>
                </div>  
                </div>    
                )}   
                <div className="div_resume">
                    <hr></hr>
                    <table>
                            <tbody>
                            <tr>
                                <td><span className="fnt-sz24 fnt-wgh4">Tax 21%:</span></td>
                                <td><span className="fnt-sz24 fnt-wgh7">{this.state.currency}{this.state.tax}</span></td>
                            </tr>
                            <tr>
                                <td><span className="fnt-sz24 fnt-wgh4">Quantity:</span></td>
                                <td><span className="fnt-sz24 fnt-wgh7">{this.state.count}</span></td>
                            </tr>
                            <tr>
                                <td><span className="fnt-sz24 fnt-wgh5">Total:</span></td>
                                <td><span className="fnt-sz24 fnt-wgh7">{this.state.currency}{this.state.totalPrice}</span></td>
                            </tr>
                        </tbody>
                    </table>
                    <Link to="/">
                        <button onClick={this.submitOrder} className="green_button upperCase fnt-sz14 fnt-wgh6 fnt-fml-rlw">Order</button>
                    </Link>
                </div>    
            </div>
        </div>
        )
    }
}
export default CartPage;