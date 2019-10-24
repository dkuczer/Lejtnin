({
    init: function (component){
        var parsedUrl = new URL(window.location.href);
        var prodId = parsedUrl.searchParams.get("prodId");
        var action = component.get('c.getProductInfo');

        action.setParams({
            prodId: prodId
        });
        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                var details = response.getReturnValue();
                component.set('v.ratedProduct', details);
            }
            else{
                var errorsMessage = '';
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    errorsMessage = errors[0].message;
                }
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Failure",
                    "message": "An error has occurred while retrieving product info" + errorsMessage
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);
    },
    saveComment: function (component) {
        var parsedUrl = new URL(window.location.href);
        var prodId = parsedUrl.searchParams.get("prodId");
        var orderId = parsedUrl.searchParams.get("orderId");
        var orderItemId = parsedUrl.searchParams.get("orderItemId");

        var rating = component.get('v.rating');
        var componentBody = component.get('v.commentBody');

        var action = component.get('c.postComment');

        action.setParams({
            rating: rating,
            commentBody: componentBody,
            productId: prodId,
            orderItemId: orderItemId
        });
        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                var urlEvent = $A.get("e.force:navigateToURL");
                urlEvent.setParams({
                    'url': '/lts-orderdetails?orderId=' + orderId
                });
                urlEvent.fire();

                var successToast = $A.get("e.force:showToast");
                successToast.setParams({
                    "title": "Success",
                    "message": "Your comment has been posted successfully",
                    'type': 'success'
                });
                successToast.fire();
            }
            else{
                var errorsMessage = '';
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    errorsMessage = errors[0].message;
                }
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Failure",
                    "message": "An error has occurred while saving your comment" + errorsMessage
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);
    }
})