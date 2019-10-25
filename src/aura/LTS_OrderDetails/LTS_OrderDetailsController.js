({
    doInit: function (component, event, helper) {
        helper.getOrderProducts(component);
    },
    rateProduct: function (component, event, helper) {
        helper.rateProduct(component, event);
    },
    showSupportForm: function (component, event, helper) {
        helper.showSupportForm(component);
    }
})