import React, { Component } from "react";
import ProductsService from "../../../services/ProductsServices";
import Navbar from "../../navbar/Navbar";
import './ProductPage.css';
import Arrow from '../../../image/Arrow.png';
import { Markup } from "interweave";

class ProductPage extends Component{
    state = {
        product : [],
        image : "",
        lastActiveColor : "#44FF03",
        offset : 0,
        attributesCart : [],
        putingInfoToCart : [],
        currencyId : 0,
        isChangedCount : null
    }

    componentDidMount(){
        var id = window.location.search.replace('?=', '');
        ProductsService.getFullProductInfo(id)
        .then((response)=> {
            this.setState({
                product : response,
                image : response.gallery[0],
                currency : response.prices[0]
            })
            this.setActiveToAttributesCart(response, false);
        }, error=> {
            console.log("Error: ", error.response);
        })
        .catch(error => {
            console.log("Server error: ", error)
        }); 

        this.setState({
            currencyId : parseInt(localStorage.getItem("currencyId")),
            isChangedCount : JSON.parse(localStorage.getItem("isChangedCount"))
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currencyId !== this.props.currencyId || prevProps !== this.props){
            this.setState({
                currency : localStorage.getItem("currency"),
                currencyId : parseInt(localStorage.getItem("currencyId"))
            })
        }
    }
    
    setActiveToAttributesCart = (elemetns, isToCart) =>{
        let tempArray = []
        for(const item of elemetns.attributes){
            isToCart == false 
            ? tempArray.push({name : item.id, value : item.items[0].value})
            : tempArray.push({name : item.name, value : item.value})
        }
        this.setState({
            attributesCart : tempArray
        })
    }

    changeActiveCurrency = (newCurrency) =>{
        this.setState({
          currencyId : newCurrency
        })
    }

    changeActiveImage = (item) =>{
        this.setState({
            image : item
        })
    }

    changeActiveAttribute = (e) =>{
        document.getElementsByClassName("active_attribute")[0].className = "non_active_attribute";
        e.target.className = 'active_attribute';
        const element = {name : e.target.id, value : e.target.textContent}
        this.addToAttribute(element)
    }

    changeActiveAttributeOfTwo = (e) =>{
        e.target.className = "active_attribute";
        document.getElementById(e.target.id.replace(e.target.id[0], e.target.id[0] == 0 ? 1 : 0)).className = "non_active_attribute";
        const element = {name : e.target.id. substr(1), value: e.target.textContent}
        this.addToAttribute(element)
    }

    changeActiveColor = (e) =>{
        e.target.className = "div_active_color";
        document.getElementById(this.state.lastActiveColor).className = 'non_active_color';
        document.getElementById(this.state.lastActiveColor).style.backgroundColor == "rgb(255, 255, 255)" 
                        && document.getElementById(this.state.lastActiveColor).classList.add("div_white");
        this.setState({
            lastActiveColor : e.target.id
        });
        document.getElementById("#030BFF").classList.add("mrg-lf2");

        const element = {name : "Color", value : e.target.id};
        this.addToAttribute(element);
    }

    addToAttribute = (element) =>{
        const indexOfElemt = this.state.attributesCart.findIndex((item)=> item.name === element.name);
        if(indexOfElemt!==-1){
                let newArray = this.state.attributesCart;
                newArray.splice(indexOfElemt, 1);
                newArray = [...this.state.attributesCart, element];
                this.setState({
                     attributesCart : newArray,
                });
        }
        else{
            const newArray = [...this.state.attributesCart, element]
            this.setState({
                attributesCart : newArray,
            });
        }
    }
    prevHandler = () =>{
        this.setState({
            offset : Math.min(this.state.offset + 130, 0)
        })
    }
    nextHandler = ()=>{
        this.setState({
            offset : Math.max(this.state.offset - 130, -260)
        })
    }
    putInfoToCart = () =>{
        const productInfo = ({
            name : this.state.product.name,
            brand : this.state.product.brand,
            gallery : this.state.product.gallery,
            prices : this.state.product.prices,
            checkedAttributes : this.state.attributesCart,
            allAttributes : this.state.product.attributes,
            attributes : this.state.attributesCart,
            count : 1
        })

        this.setState({
            putingInfoToCart : productInfo,
            attributesCart : [],
            isIncrement : true,
            isChangedCount : !JSON.parse(localStorage.getItem("isChangedCount")),
        })
        localStorage.setItem("isChangedCount", !JSON.parse(localStorage.getItem("isChangedCount")))
        //console.log(this.state.product)
        this.setActiveToAttributesCart(productInfo, true);
    }

    changeActiveCategory = (newCategory) => {
        this.setState({
          category : newCategory
        })
      }
    
    render(){
        return(
            <div className="container">
                <Navbar isIncrement={this.state.isIncrement} isChangedCount={this.state.isChangedCount} cartInfo={this.state.putingInfoToCart} changeActiveCategory={this.changeActiveCategory} changeActiveCurrency={this.changeActiveCurrency}></Navbar>
            <div className="div_product_page">
            <div className="div_small_images">

                <div className="div_slider_track">
                {
                    this.state.product.gallery?.length > 5
                    &&
                    <div className="div_buttons">
                        <button className="button_arrow button_arrow_prev" onClick={this.prevHandler}><img src={Arrow}/></button>
                        <button className="button_arrow button_arrow_next" onClick={this.nextHandler}><img src={Arrow}/></button>
                    </div>
                }
                {
                    this.state.product.gallery?.length !=1
                    && <div id="gallery" style={{transform : `translateY(${this.state.offset}px)`}}>
                        {
                            this.state.product.gallery?.map((item, index)=>
                            <img onClick={()=> this.changeActiveImage(item)} key={index} src={item} className="img_small"/>
                            )
                        }
                        </div>
                }
                </div>

            </div>
           
            <div className="div_central_image">
            {
                !this.state.product.inStock  && <div className="div_big_blure"><span className="fnt-sz24 fnt-wgh4">Out of stock</span></div>
            }
                <img src={this.state.image} className="img_big"/>
            </div>

            <div className="div_info">
                <span className="fnt-wgh6 fnt-sz30">{this.state.product.brand}</span>
                <span className="fnt-wgh4 fnt-sz30 mrg-btm43">{this.state.product.name}</span>
                {
                    this.state.product.attributes?.map((item, elindex)=>
                    <div key={elindex}>
                        {
                            item.id != "Color"
                                ?
                                <div>
                                    <span className="fnt-wgh7 fnt-sz18 fnt-fml-rbt-con upperCase mrg-btm8">{item.name}:</span>
                                    <div className="div_attributes">
                                    {   
                                        item.items.map((info, index)=>
                                        <div key={index}>
                                            {
                                                item.items.length === 2 ?
                                                <div id={index + item.id} onClick={this.changeActiveAttributeOfTwo} className={this.state.attributesCart.filter(att => att.value == info.value && att.name == item.id)[0]?.value == info.value ? "active_attribute" : "non_active_attribute"}>
                                                    {info.value}                         
                                                </div>
                                                :
                                                <div id={item.id} onClick={this.changeActiveAttribute} className={this.state.attributesCart.filter(att => att.value == info.value)[0]?.value == info.value ? "active_attribute" : "non_active_attribute"}>
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
                                    <span className="fnt-wgh7 fnt-sz18 fnt-fml-rbt-con upperCase mrg-btm8">Color:</span>
                                    <div className="div_colors">
                                    {
                                        item.items.map((info, index)=>
                                        <div id={info.value} onClick={this.changeActiveColor} key={index} style={{backgroundColor : info.value}} className={[this.state.attributesCart.filter(att => att.value == info.value)[0]?.value == info.value ? "div_active_color " : "non_active_color", info.value == "#FFFFFF" && "div_white"].join(' ')}>
                                        </div>)
                                    }
                                    </div>
                                </div>
                        }
                        </div>
                        )
                    }
                    
                    <span className="fnt-wgh7 fnt-sz18 fnt-fml-rbt-con upperCase mrg-btm8">Price:</span>
                        {this.state.product.prices?.map((item, index)=>
                        <div key={index}>
                            {
                                index == this.state.currencyId
                                && 
                                <div className="div_price">
                                    <span className="fnt-wgh7 fnt-sz24">{item.currency.symbol}</span>
                                    <span className="fnt-wgh7 fnt-sz24">{item.amount.toFixed(2)}</span>
                                </div>
                            }
                        </div>)}
                        {
                            this.state.product.inStock ?
                            <button onClick={this.putInfoToCart} className={ "green_button" }><span className="fnt-wgh6 fnt-sz16 upperCase fnt-fml-rlw">{"Add to cart"}</span></button>
                            :
                            <button className={"gray_button"}><span className="fnt-wgh6 fnt-sz16 upperCase fnt-fml-rlw">{"Out of stock"}</span></button>

                        }
                        {
                            this.state.product.description?.length <= 300
                            && <Markup className="fnt-sz16 fnt-wgh4 fnt-fml-rbt" content={this.state.product.description}></Markup>
                        }
            </div>
           
        </div>
        {
            this.state.product.description?.length >= 300
            &&  <div className="fnt-sz16 fnt-wgh4 fnt-fml-rbt big_description">
                    <Markup className="fnt-sz16 fnt-wgh4 fnt-fml-rbt" content={this.state.product.description}></Markup>
                </div>
            }
            </div>
        )
    }
}

export default ProductPage;