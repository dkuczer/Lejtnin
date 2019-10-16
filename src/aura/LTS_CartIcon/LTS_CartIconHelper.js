({
    checkProductsInCartNumber: function(component){
        var action = component.get('c.getProductsInCartNumber');
        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                component.set('v.productsNO', response.getReturnValue());
            }
            else{
                console.log('Hey, at least js is working');
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