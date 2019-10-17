({
    getUserOrders: function (component) {
        var action = component.get('c.getUserOrders');

        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                var orders = response.getReturnValue();
                component.set('v.ordersList', orders);
            }
            else{
                console.log('Hey, at least js is working');
            }
        });
        $A.enqueueAction(action);
    },
    goToDetails: function (component, event) {
        var orderIndex = event.getSource().get('v.name');
        var orders = component.get('v.ordersList');

        console.log('Index: ' + orderIndex);
        console.log('Order Id: ' + orders[orderIndex].Id);

        var navEvt = $A.get('e.force:navigateToURL');
        navEvt.setParams({url: '/lts-orderdetails?orderId=' + orders[orderIndex].Id});
        navEvt.fire();
    }
})