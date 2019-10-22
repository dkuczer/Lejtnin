({
    doInit: function (component, event, helper) {
        helper.getOrderProducts(component);
    },
    rateProduct: function (component, event, helper) {
        helper.rateProduct(component, event);
    }

})