({
    doInit: function (component, event, helper) {
        helper.getProductsFromCart(component);
    },
    recalculate: function (component, event, helper) {
        helper.changeQuantity(component, event);
        helper.calculateTotal(component);
    },
    removeProduct: function (component, event, helper) {
        helper.removeProduct(component, event);
        helper.calculateTotal(component);
    }
})