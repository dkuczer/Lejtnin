({
    doInit : function(component, event, helper) {
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
        });
        $A.enqueueAction(action);
    },
    changeMain: function (component, event, helper) {
        var images = component.get("v.imageDistributions");
        var resultIndex = event.target.id;

        component.set('v.mainImage', images[resultIndex].ContentDownloadUrl);
    }
})