({
    doInit: function(component, event, helper){
        helper.handleInit(component);
        helper.getProducts(component);
    },
    getProducts: function (component, event, helper) {
        helper.getProducts(component);
    },
    selectProduct: function (component, event, helper) {
        helper.selectProduct(component, event);
    }
})