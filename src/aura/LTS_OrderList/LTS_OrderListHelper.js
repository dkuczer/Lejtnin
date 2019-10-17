({
    getUserOrders: function (component) {
        var action = component.get('c.getUserOrders');

        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                var orders = response.getReturnValue();
                component.set('v.ordersList', orders);
            }
            else{
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Failure",
                    "message": "An error has occurred while retrieving your orders"
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);
    },
    goToDetails: function (component, event) {
        var orderIndex = event.getSource().get('v.name');
        var orders = component.get('v.ordersList');

        var navEvt = $A.get('e.force:navigateToURL');
        navEvt.setParams({url: '/lts-orderdetails?orderId=' + orders[orderIndex].Id});
        navEvt.fire();
    }
})