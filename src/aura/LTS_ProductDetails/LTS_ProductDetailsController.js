({
    doInit : function(component, event, helper) {
        // console.log(component.get("v.pageReference").state.productId);
        var parsedUrl = new URL(window.location.href);
        var productId = parsedUrl.searchParams.get("productId");
        component.set('v.productId', productId);
        // component.find('poster').set('recordId', productId);
        // component.find('poster').set('v.recordId', productId);

        var action = component.get('c.getProductById');

        action.setParams({
            productId: productId
        });

        console.log('ProductDetailsCMP productId: ' + productId);

        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                var results = response.getReturnValue();
                component.set('v.productDetailsWrapper', results);
                console.log('Standard price = ' + results);
            }
            else{
                console.log('Hey, at least js is working');
            }
        });

        $A.enqueueAction(action);
    }
})