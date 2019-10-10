({
    doInit: function(component, event, helper){
        var action = component.get('c.getProductPoster');

        console.log(component.get('v.recordId'));

        action.setParams({productId: component.get('v.recordId')});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var posterURL = response.getReturnValue();
                console.log(posterURL);
                component.set('v.posterURL', posterURL);
            }
        });
        $A.enqueueAction(action);
    },
})