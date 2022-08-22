import React, { Component } from "react";
import './Navbar.css';
import Logo from '../../image/Logo.png'
import DropDownMenu from "../drop-down-menu/DropDownMenu";
import CartIcon from "../cart_icon/CartIcon";
import CartModal from "../cart_modal/CartModal"
import DropMenuIcon from "../drop-menu_icon/DropMenuIcon";
import ProductsService from "../../services/ProductsServices";
import { Link } from "react-router-dom";

class Navbar extends Component{

    state = {
        lastElementId : 'li0',
        modalActive : '',
        currencyActive : '',
        currency : '',
        categories : [],
        cartInfo : [],
        count : 0,
        currencyId : 0,
        isChanged : false,
        isIncrement : true,
        isChangedCount : JSON.parse(localStorage.getItem("isChangedCount"))
    }

    componentDidMount(){
        ProductsService.getCategories()
        .then((response)=> {
            this.setState({
                categories : response
            })
        }, error=> {
            console.log("Error: ", error.response);
        })
        .catch(error => {
            console.log("Server error: ", error)
        });
        if(localStorage.getItem("currency") == null && localStorage.getItem("currencyId") == null && localStorage.getItem("count") == null){
            localStorage.setItem("currency", "$");
            localStorage.setItem("currencyId", 0);
            localStorage.setItem("count", 0);
            localStorage.setItem("isChangedCount", false);
        }
    }

    changeActiveClass = (e) =>{
        e.target.className = 'li_type_text_active';
        document.getElementById(this.state.lastElementId).className = 'li_type_text';
        this.setState({
            lastElementId : e.target.id
        });
        this.props.changeActiveCategory(e.target.textContent);
    }

    setModalActive = (isModalActive) =>{
        this.setState(
            {
                modalActive : isModalActive
            }
        )
    }

    setCurrencyActive = (isMenuActive, newCurrency, index) => {
        if(isMenuActive !== ""){
            this.setState(
                {
                    currencyActive : isMenuActive
                }
            )
        }
        if(newCurrency !== undefined && newCurrency !== ''){
            this.setState(
                {
                    currency : newCurrency,
                }
            )
            this.props.changeActiveCurrency(index);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.cartInfo !== this.props.cartInfo) {
            this.calculateCountOfEveryElement();
        }
        if(prevProps.isChangedCount !== this.props.isChangedCount){
            this.setCoutnAndIncrement(this.props.isIncrement, this.props.isChangedCount);
        }
    }

    calculateCountOfNoAttribute (newCartInfo){
            if(newCartInfo.findIndex((item)=>
                    item.name == this.props.cartInfo.name) !== -1){
                newCartInfo.find(elem => elem.allAttributes?.length == 0 && elem.name == this.props.cartInfo.name).count++;
            }
            else{
                newCartInfo.push(this.props.cartInfo);
            }

            this.setState({
                cartInfo : newCartInfo
            })
            
            localStorage.setItem("cartInfo", JSON.stringify(newCartInfo));                     
    }

    calculateCountOfEveryElement(){
        let indexOfElement = -1;
        let newCartInfo = null;
        let myCount = 0, res = [];
        if(localStorage.getItem("cartInfo") == null)
            newCartInfo = this.state.cartInfo;
        else 
            newCartInfo = JSON.parse(localStorage.getItem("cartInfo"));

        if(this.props.cartInfo.checkedAttributes.length == 0){
            this.calculateCountOfNoAttribute(newCartInfo);
            return;
        }

        for(let i = 0; i < newCartInfo.length; ++i){
            if(newCartInfo[i].checkedAttributes.length !== 0)
            {
                newCartInfo[i].checkedAttributes.forEach(elem => {
                    res.push((this.props.cartInfo.checkedAttributes.findIndex(attribute => attribute.name === elem.name && attribute.value === elem.value)))})

                if(newCartInfo[i].checkedAttributes.length > 0){
                    let myCount = 0;
                    for(let k = 0; k < res.length; ++k){
                        if(res[k] !== -1)
                            myCount++;
                    }

                    if(myCount === newCartInfo[i].checkedAttributes.length)
                        indexOfElement = i;
                }
                res = []
            }
        }

        console.log(indexOfElement);

        if(newCartInfo.length !== 0 && indexOfElement !== -1){ 
                newCartInfo[indexOfElement].count++;
                        
        }
        else if(newCartInfo.length !== 0 && this.props.cartInfo.allAttributes?.length == 0 && myCount > 0){
            newCartInfo.find(elem => elem.allAttributes?.length == 0 && elem.name == this.props.cartInfo.name).count++;
        }
        else{
            newCartInfo.push(this.props.cartInfo);
        }
        this.setState({
            cartInfo : newCartInfo
        })
        localStorage.setItem("cartInfo", JSON.stringify(newCartInfo));
    }

    setCoutnAndIncrement = (isIncrement, isChangedCount) =>{
        this.setState({
            isIncrement : isIncrement,
            isChangedCount : isChangedCount
        })
    }

    render(){
        return (
            <div className="div_navbar">
                <ul className="ul_list">
                    {
                        this.state.categories.map((item, index) =>
                        <li key={index} className="li_type">
                            <Link to="/">
                                <span id={"li" + index} onClick={this.changeActiveClass} className={index == 0 ? 'li_type_text_active' : 'li_type_text'}>{item.name}</span>
                            </Link>
                        </li>
                        )
                    }
                </ul>
                <img className="img_logo" src={Logo}/>
                <div className="div_right">
                    <DropMenuIcon currency = {this.state.currency} active={this.state.currencyActive} setCurrencyActive={this.setCurrencyActive}/>
                    <DropDownMenu active={this.state.currencyActive} setCurrencyActive={this.setCurrencyActive}/>
                    <CartIcon isIncrement={this.state.isIncrement} isChangedCount={this.state.isChangedCount} setModalActive={this.setModalActive}/>
                    <CartModal setCoutnAndIncrement={this.setCoutnAndIncrement} currencyId={localStorage.getItem("currencyId")} cartInfo={this.state.cartInfo} active={this.state.modalActive} setActive={this.setModalActive}/>
                </div>
            </div>
        )
    }
}

export default Navbar;