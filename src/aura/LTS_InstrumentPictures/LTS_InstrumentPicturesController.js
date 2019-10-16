({
    showPictures: function(component, event, helper){
        helper.handleShowPictures(component);
    },
    makePoster: function (component, event, helper) {
        helper.handleMakePoster(component, event);

    },
    hidePictures: function (component, event, helper) {
        component.set('v.showPictures', false);
    }
})