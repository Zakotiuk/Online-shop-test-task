import React, { Component } from "react";
import './DropMenuIcon.css';
import '../main_styles.css'
import Arrow from '../../image/Arrow.png';

class DropMenuIcon extends Component{

    state = {
        currency : '$ '
    }

    componentDidMount(){
        if(localStorage.getItem("currency")!== null){
            this.setState({
                currency : localStorage.getItem("currency")
            })
        }
    }


    componentDidUpdate(prevProps) {
        if (prevProps.currency !== this.props.currency) {
          this.setState({
            currency : this.props.currency});
        }
    }

    setCurrencyActive = (isCurrencyActive) => {
        this.props.setCurrencyActive(isCurrencyActive);
    }

    render(){
        return(
            <div onClick={()=> this.setCurrencyActive(true)} className="main_currency">
                    <span className="fnt-sz18 fnt-wgh5">{this.state.currency}</span>
                    <img id="arrow" className={this.props.active ? "img_arrow_rotate" : "img_arrow"} src={Arrow}/>
            </div>
        )
    }
}

export default DropMenuIcon;