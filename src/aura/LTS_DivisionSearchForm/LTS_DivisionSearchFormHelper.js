({
    throwToast: function(toastTitle, toastType, toastMessage){
            var toastParams = {
                title: toastTitle,
                message: toastType,
                type: toastMessage
            };

            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams(toastParams);
            toastEvent.fire();
        }
})