import './App.css';
import CatalogPage from './components/pages/catalog-page/CatalogPage';
import Navbar from './components/navbar/Navbar';
import { Component } from 'react';

class App extends Component {
  state = {
    category : 'all',
  }

  changeActiveCategory = (newCategory) => {
    this.setState({
      category : newCategory
    })
  }

  changeActiveCurrency = (newCurrency) =>{
    this.setState({
      currencyId : newCurrency
    })
  }

  changeIsCountChanged = (isChangedCount) =>{
    this.setState({
      isChangedCount : !isChangedCount
    })
  }

  render(){
    return(
      <div className="App">   
        <Navbar isIncrement={true} isChangedCount={this.state.isChangedCount} changeActiveCurrency={this.changeActiveCurrency} changeActiveCategory={this.changeActiveCategory}></Navbar>
        <CatalogPage changeIsCountChanged={this.changeIsCountChanged}  category={this.state.category}></CatalogPage> 
      </div>
    );
  }
}

export default App;
