import React, { Component } from "react";
import Minus from '../../image/Square_minus.png'
import Plus from '../../image/Square_plus.png'

class CartModalItem extends Component{
    state = {
        count : 0
    }
    componentDidUpdate(prevProps){
        if(prevProps.count !== this.props.count){
            this.setState({
                count : this.props.count
            })
        }
    }
    render(){
        return(
            <div className="div_modal_product">
                    <div className="div_left_info">
                        <div className="div_modal_info">
                            <span className="fnt-sz16 fnt-wgh3 mrg-btm8">{this.props.elem.brand}</span>
                            <span className="fnt-sz16 fnt-wgh3 mrg-btm8">{this.props.elem.name}</span>
                            {this.props.elem.prices.map((item, index)=>
                                <div key={index}>
                            {
                                index == this.props.currencyId
                                && 
                                <div className="div_price">
                                    <span className="fnt-sz16 fnt-wgh5 mrg-btm8">{item.currency.symbol}</span>
                                    <span className="fnt-sz16 fnt-wgh5 mrg-btm8">{item.amount.toFixed(2)}</span>
                                </div>
                            }
                                </div>
                            )}
                    {
                    this.props.elem.allAttributes?.map((item, index)=>
                    <div key={index}>
                        {
                            item.id != "Color"
                                ? 
                                <div>
                                    <span className="fnt-sz14 fnt-wgh4 mrg-btm8">{item.name}:</span>
                                    <div className="div_modal_size mrg-btm8">
                                    {   
                                        item.items.map((info, index)=>
                                        <div id="modalAttributes" key={index}>
                                            {
                                                item.items.length === 2 && this.props.elem.allAttributes.length > 2 ?
                                                    <div className={this.props.elem.checkedAttributes
                                                                                                            ?.filter(att => att.value == info.value && att.name == item.id)[0]?.value == info.value ? "div_active_attribute biggerWidth" : "div_non_active_attribute biggerWidth"}>
                                                        {info.value}
                                                    </div> 
                                                :
                                                    <div className={[this.props.elem.checkedAttributes
                                                                                                         ?.filter(att => att.value == info.value)[0]?.value == info.value ? "div_active_attribute " : "div_non_active_attribute ", info.value.length > 3 && "biggerWidth"].join(' ')}>
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
                                    <span className="fnt-sz14 fnt-wgh4 mrg-btm8">Color:</span>
                                    <div className="div_modal_color">
                                    {
                                        item.items.map((info, index)=>
                                        <div key={index} style={{backgroundColor : info.value}} className={[this.props.elem.checkedAttributes
                                                                                                                                ?.filter(att => att.value == info.value)[0]?.value == info.value ? "div_active_color " : "div_no_active_color", info.value == "#FFFFFF" && "div_white"].join(' ')}>
                                        </div>)
                                    }
                                    </div>
                                </div>
                        }
                        </div>
                        )
                    }
                    </div>
                        <div className=" div_small_arrow_count">
                            <img id={this.props.id} onClick={(e) => this.props.incrementCount(e.target.id)} src={Plus}/>
                            <span className="fnt-sz16 fnt-wgh5">{this.props.elem.count}</span>
                            <img id={this.props.id} onClick={(e) => this.props.decrementCount(e.target.id)} src={Minus}/>
                        </div>
                    </div>
                        <img src={this.props.elem.gallery[0]} className="img_cart_modal"/>
                    </div>
        )
    }
}

export default CartModalItem;