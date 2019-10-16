({
    handleShowPictures: function(component){
        component.set('v.showPictures', true);
        var action = component.get('c.getProductImages');
        action.setParams({productId: component.get('v.recordId')});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var images = response.getReturnValue();
                console.log(images);
                component.set('v.contentDistributionImages', images);
            }
            else{
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Failure",
                    "message": "An error has occurred while retrieving product pictures"
                });
                toastEvent.fire();
            }

        });
        $A.enqueueAction(action);
    },
    handleMakePoster: function (component, event) {
        var images = component.get("v.contentDistributionImages");
        var resultIndex = event.target.id;

        var action = component.get('c.makeProductPoster');
        action.setParams({
            imgUrl: images[resultIndex].ContentDownloadUrl,
            productId: component.get('v.recordId')
        });

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var images = response.getReturnValue();
                component.set('v.showPictures', false);
                var posterChangedEvt =  $A.get("e.c:LTS_PosterChangedEvt");
                posterChangedEvt.fire();
            }
            else{
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Failure",
                    "message": "An error has occurred while saving product poster"
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);

    }
})
