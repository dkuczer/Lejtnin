({
    deselectProduct: function(component, event, helper){
        helper.deselectProduct(component, event);
        helper.getProducts(component);
    },
    deselectAll: function(component, event, helper){
        helper.deselectAll(component, event);
        helper.getProducts(component);
    },
    calculatePercent: function (component, event, helper) {
        helper.calculatePercent(component, event);
    },
    templatePercent: function (component, event, helper) {
        helper.templatePercent(component);
    },
    templatePrice: function (component, event, helper) {
        helper.templatePrice(component);
    }
})