
({
    handleInit: function(component){
        var action = component.get('c.getProductPoster');

        console.log('PosterCMP recordId: ' + component.get('v.recordId'));

        action.setParams({productId: component.get('v.recordId')});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var posterURL = response.getReturnValue();
                console.log('PosterCMP poster url: ' + posterURL);
                component.set('v.posterURL', posterURL);
            }
            else{
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Failure",
                    "message": "An error has occurred while retrieving poster"
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);
    }
})
