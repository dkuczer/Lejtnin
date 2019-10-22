({
    getProducts: function (component, event, helper) {
        helper.getProducts(component);
    },
    selectProduct: function (component, event, helper) {
        helper.selectProduct(component, event);
        helper.getProducts(component);
    },
    selectAll: function(component, event,helper){
        helper.selectAll(component);
        helper.getProducts(component);
    }
})