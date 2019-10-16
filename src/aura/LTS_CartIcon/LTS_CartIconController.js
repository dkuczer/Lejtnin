({
    doInit: function(component, event, helper){
        console.log('helping ajkon');
        helper.checkProductsInCartNumber(component);
    },
    countProductsInOrder: function(component, event, helper){
        component.set('v.productsNO', event.getParam("productsInCart"));
    },
    goToCart: function (component, event, helper) {
        helper.goToCart();
    }
})