({
    showToast: function(component, event, helper){
        var parameters = event.getParam('arguments');
                var toastParams = {
                    title: parameters.title,
                    message: parameters.message,
                    type: parameters.type
                };

                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams(toastParams);
                toastEvent.fire();
            }
})