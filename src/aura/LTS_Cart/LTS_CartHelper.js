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
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Failure",
                    "message": "An error has occurred while retrieving products from the cart"
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);
    },
    changeQuantity: function(component, event){
        var products = component.get('v.products');
        var productIndex = event.getSource().get('v.name');
        var quantity = event.getParam('value');

        var removeProductAction = component.get('c.changeProductQuantity');
        removeProductAction.setParams({
            productId: products[productIndex].productId,
            quantity: quantity
        });
        removeProductAction.setCallback(this, function(response){
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
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Failure",
                    "message": "An error has occurred while changing product quantity"
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(removeProductAction);

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

        var removeProductAction = component.get('c.removeProductFromCart');
        removeProductAction.setParams({
            productId: products[resultIndex].productId,
        });
        removeProductAction.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                products.splice(resultIndex, 1);
                component.set('v.products', products);
                var productsInCartNumber = 0;
                var addedToCartEvt =  $A.get("e.c:LTS_AddedToCartEvt");
                for(var i = 0; i < products.length; i++){
                    productsInCartNumber = (parseInt(productsInCartNumber) + parseInt(products[i].quantity));
                }
                addedToCartEvt.setParams({
                    productsInCart: productsInCartNumber
                });
                addedToCartEvt.fire();
            }
            else{
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Failure",
                    "message": "An error has occurred while removing products from the cart"
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(removeProductAction);
        

    },
    handleCreateOrder: function(component){
        var createOrderAction = component.get('c.createOrderFromCart');
        createOrderAction.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                var addedToCartEvt =  $A.get("e.c:LTS_AddedToCartEvt");
                addedToCartEvt.setParams({
                    productsInCart: 0
                });
                addedToCartEvt.fire();

                var navEvt = $A.get('e.force:navigateToURL');
                navEvt.setParams({url: '/lts-orders'});
                navEvt.fire();
            }
            else{
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Failure",
                    "message": "An error has occurred while finalizing Your order"
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(createOrderAction);
    }
})