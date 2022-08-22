import React, { Component } from "react";
import './DropDownMenu.css';
import '../main_styles.css';
import ProductsService from "../../services/ProductsServices";

class DropDownMenu extends Component{

    state= {
        currencies : []
    }

    setCurrency = (e) => {
        localStorage.setItem("currency", e.target.textContent.substring(0, 2));
        localStorage.setItem("currencyId", e.target.id);
        this.props.setCurrencyActive(false, e.target.textContent.substring(0, 2), e.target.id);
    }

    componentDidMount(){
        ProductsService.getCurrencies()
        .then((response)=> {
            this.setState({
                currencies : response
            })

        }, error=> {
            console.log("Error: ", error.response);
        })
        .catch(error => {
            console.log("Server error: ", error)
        });
    }

    render(){
        return(
            <div className={this.props.active ? "div_drop_menu active" : "div_drop_menu"} onClick={e =>this.props.setCurrencyActive(false, "")}>
                    <ul onClick={e => e.stopPropagation()} className="sublist_currency">
                    {this.state.currencies.map((item, index) => 
                        <li id={index} key={index} onClick={this.setCurrency} className="sub_item fnt-sz18 fnt-wgh5">{item.symbol} {item.label}</li>
                    )}
                    </ul>
            </div>
        )
    }
}

export default DropDownMenu;