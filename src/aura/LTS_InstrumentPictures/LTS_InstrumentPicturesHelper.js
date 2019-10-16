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
        });
        $A.enqueueAction(action);

    }
})