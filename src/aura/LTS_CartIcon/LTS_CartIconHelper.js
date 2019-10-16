({
    checkProductsInCartNumber: function(component){
        var action = component.get('c.getProductsInCartNumber');
        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                component.set('v.productsNO', response.getReturnValue());
            }
            else{
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Failure",
                    "message": "An error has occurred while retrieving number of products in the cart"
                });
                toastEvent.fire();
            }
        });

        $A.enqueueAction(action);
    },
    goToCart: function () {
        var navEvt = $A.get('e.force:navigateToURL');
        navEvt.setParams({url: '/lts-cart'});
        navEvt.fire();
    }
})