export default class UsefulFunction{
    static changeTotalPrice = (cartInfo) =>{
        let myTotalPrice = 0;
        for(let j = 0; j < cartInfo?.length; ++j){
            for(let i = 0; i < cartInfo[j]?.count; ++i)
                myTotalPrice += cartInfo[j]?.prices[localStorage.getItem("currencyId")].amount
        }
        myTotalPrice = parseFloat(myTotalPrice);
        myTotalPrice = myTotalPrice.toFixed(2);
        localStorage.setItem("totalPrice", myTotalPrice);
        return myTotalPrice;
    }

    static incrementCountCart = () =>{
        let count;
        localStorage.getItem("count") !== null || localStorage.getItem("count") != NaN
        ? count = parseInt(localStorage.getItem("count"))
        : count = 0;
        
        count += 1;
        localStorage.setItem("count", count);
    }

    static decrementCountCart = () =>{
        let count;
        if(localStorage.getItem("count") !== null || localStorage.getItem("count") !== "NaN")
        {
            count = parseInt(localStorage.getItem("count"));
            if(count != 0)
                count -=1;
        }
        
        localStorage.setItem("count", count);
    }

    static incrementCountProduct = (product) =>{
        let storageProducts = JSON.parse(localStorage.getItem("cartInfo"));
        if(product.checkedAttributes.length !== 0){
            storageProducts[this.checkedIsThisElementInArray(product)].count++;
        }
        else{
            storageProducts.find(element => 
                element.name == product.name &&
                element.count == product.count).count++;
        }
        localStorage.setItem("cartInfo", JSON.stringify(storageProducts));
    }

    static checkedIsThisElementInArray = (product) =>{
        let storageProducts = JSON.parse(localStorage.getItem("cartInfo"));
        let res = [], indexOfElement = -1;
        for(let i = 0; i < storageProducts.length; ++i){
            if(storageProducts[i].checkedAttributes.length !== 0)
            {
                storageProducts[i].checkedAttributes.forEach(elem => {
                    res.push((product.checkedAttributes.findIndex(attribute => attribute.name === elem.name && attribute.value === elem.value)))})

                if(storageProducts[i].checkedAttributes.length > 0){
                    let myCount = 0;
                    for(let k = 0; k < res.length; ++k){
                        if(res[k] !== -1)
                            myCount++;
                    }

                    if(myCount === storageProducts[i].checkedAttributes.length)
                        indexOfElement = i;
                }
                res = []
            }
        }
        return indexOfElement;
    }

    static decrementCountProduct = (product) => {
        let storageProducts = JSON.parse(localStorage.getItem("cartInfo"));
        if(product.count == 1)
        {   
            storageProducts.splice(storageProducts.findIndex(element => 
                element.name == product.name &&
                element.count == product.count), 1);
        }
        else
        {
            storageProducts.find(element => 
                element.name == product.name &&
                element.count == product.count).count--;
        }
        localStorage.setItem("cartInfo", JSON.stringify(storageProducts));
    }

    static changeCountOfProduct = (products, element) =>{
        if(element.allAttributes?.length == 0 && products.length > 0){
            if(products.findIndex(elem => elem.allAttributes?.length == 0 && elem.name == element.name) !== -1){
                products.find(elem => elem.allAttributes?.length == 0 && elem.name == element.name).count++;
                return products;
            }
            return null;
        }
    }
}