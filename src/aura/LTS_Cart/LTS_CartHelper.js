({
    getProductsFromCart: function (component) {
        var action = component.get('c.getProductsFromCart');

        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                var products = response.getReturnValue();
                var totalPrice = 0;

                console.log(products.length);
                for(var i = 0; i < products.length; i++){
                    totalPrice += (products[i].productPrice * products[i].quantity);
                }

                component.set('v.products', products);
                component.set('v.totalPrice', totalPrice);
            }
            else{
                console.log('Hey, at least js is working');
            }
        });
        $A.enqueueAction(action);
    },
    changeQuantity: function(component, event){
        var products = component.get('v.products');
        var productIndex = event.getSource().get('v.name');
        var quantity = event.getParam('value');


        // console.log('productIndex: ' + productIndex);
        // console.log('quantity: ' + quantity);
        // console.log('product id : ' + products[productIndex].productId);
        console.log('quantity: ', quantity);

        var changeQuantityAction = component.get('c.changeProductQuantity');
        changeQuantityAction.setParams({
            productId: products[productIndex].productId,
            quantity: quantity
        });
        changeQuantityAction.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                var addedToCartEvt =  $A.get("e.c:LTS_AddedToCartEvt");
                var productsInCartNumber = 0;
                for(var i = 0; i < products.length; i++){
                    productsInCartNumber = (parseInt(productsInCartNumber) + parseInt(products[i].quantity));
                }
                addedToCartEvt.setParams({
                    productsInCart: productsInCartNumber
                });
                console.log(productsInCartNumber);
                addedToCartEvt.fire();
            }
            else{
                console.log('Hey, at least js is working');
            }
        });
        console.log('jestem tu 3');
        $A.enqueueAction(changeQuantityAction);

    },
    calculateTotal: function(component){
        console.log('calculating');
        var products = component.get('v.products');
        var totalPrice = 0;
        console.log(products.length);
        for(var i = 0; i < products.length; i++){
            totalPrice += (products[i].productPrice * products[i].quantity);
        }
        var action = component.get('c.changeProductQuantity');
        component.set('v.totalPrice', totalPrice);
    },
    removeProduct: function (component, event) {
        var products = component.get('v.products');
        var resultIndex = event.target.id;

        console.log(products.length);
        products.splice(resultIndex, 1);
        console.log(products.length);
        component.set('v.products', products);
    }
})