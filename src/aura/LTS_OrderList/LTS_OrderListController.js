({
    doInit: function (component, event, helper) {
        helper.getUserOrders(component);
    },
    goToDetails: function (component, event, helper) {
        helper.goToDetails(component, event);
    }
})