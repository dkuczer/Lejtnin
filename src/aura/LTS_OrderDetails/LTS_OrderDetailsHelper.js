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
                console.log('Hey, at least js is working');
            }
        });
        $A.enqueueAction(action);
    }
})