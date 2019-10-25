({
    getOrderProducts: function(component){
        var parsedUrl = new URL(window.location.href);
        var orderId = parsedUrl.searchParams.get("orderId");
        component.set('v.orderId', orderId);

        var action = component.get('c.getOrderProducts');
        action.setParams({
            orderId: orderId
        });
        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                var orderProducts = response.getReturnValue();
                if(orderProducts.length > 0)
                {
                    var totalPrice = 0;
                    for(var i = 0; i < orderProducts.length; i++){
                        totalPrice += (orderProducts[i].UnitPrice * orderProducts[i].Quantity);
                    }
                    component.set('v.orderProducts', orderProducts);
                    component.set('v.totalPrice', totalPrice);
                }
                else{
                    component.set('v.orderProducts', null);
                }
            }
            else{
                var errors = response.getError();
                var errorsMessage = '';
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    errorsMessage = errors[0].message;
                }
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Failure",
                    "message": "An error has occurred while retrieving details of your order" + errorsMessage
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);
    },
    rateProduct: function (component, event) {
        var orderItems = component.get('v.orderProducts');
        var orderItemIndex = event.target.id;
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            'url': '/lts-rate-product?prodId=' + orderItems[orderItemIndex].Product2.Id
            + '&orderId=' + orderItems[orderItemIndex].Order.Id
            + '&orderItemId=' + orderItems[orderItemIndex].Id
        });
        urlEvent.fire();
    },
    showSupportForm: function (component) {
        component.set('v.showSupportForm', true)
    }
})