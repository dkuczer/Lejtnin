({
    handleInit : function(component) {
        var parsedUrl = new URL(window.location.href);
        var productId = parsedUrl.searchParams.get("productId");
        console.log('productID: ' + productId);

        var action = component.get('c.getProductImages');

        action.setParams({productId: productId});

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var images = response.getReturnValue();
                console.log(images);
                component.set('v.imageDistributions', images);
            }
            else{
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Failure",
                    "message": "An error has occurred while retrieving product images"
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);
    },
    handleChangeMain: function (component, event) {
        var images = component.get("v.imageDistributions");
        var resultIndex = event.target.id;
        component.set('v.mainImage', images[resultIndex].ContentDownloadUrl);
    }
})