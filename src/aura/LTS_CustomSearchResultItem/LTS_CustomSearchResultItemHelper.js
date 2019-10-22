({
    init: function(component){
        var productId = component.get('v.recordId');
        var action = component.get('c.getProductById');
        action.setParams({
            productId: productId
        });
        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                var results = response.getReturnValue();
                component.set('v.productDetailsWrapper', results);
            }
            else{
                console.log('Hey, at least js is working');
            }
        });
        $A.enqueueAction(action);
    },
    handleItemClick: function (component) {
        var navEvt = $A.get('e.force:navigateToURL');
        navEvt.setParams({url: '/lts-product-page?productId=' + component.get('v.recordId')});
        navEvt.fire();
    }
})


