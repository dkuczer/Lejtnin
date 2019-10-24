({
    handleInit: function(component){
        var parsedUrl = new URL(window.location.href);
        var productId = parsedUrl.searchParams.get("productId");
        component.set('v.productId', productId);

        var action = component.get('c.getProductById');
        action.setParams({
            productId: productId
        });
        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                var results = response.getReturnValue();
                component.set('v.productDetailsWrapper', results);
            }
            else{
                var errorsMessage = '';
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    errorsMessage = errors[0].message;
                }
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Failure",
                    "message": "An error has occurred while retrieving product details; " + errorsMessage
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);
    },

    addToCart: function (component) {
        var productDetailsWrapper = component.get('v.productDetailsWrapper');
        var price;

        if(productDetailsWrapper.specialPrice){
            price = productDetailsWrapper.specialPrice.UnitPrice;
            console.log('special price: ' + price);
        }
        else{
            price = productDetailsWrapper.standardPrice.UnitPrice;
            console.log('standard price: ' + price);
        }

        var action = component.get('c.addToCart');
        action.setParams({
            productId: productDetailsWrapper.productRecord.Id,
            productName: productDetailsWrapper.productRecord.Name,
            posterUrl: productDetailsWrapper.productRecord.PosterUrl__c,
            unitPrice: price,
            standardPricebookEntryId: productDetailsWrapper.standardPrice.Id
        });
        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                var addedToCartEvt =  $A.get("e.c:LTS_AddedToCartEvt");
                console.log(response.getReturnValue());
                addedToCartEvt.setParams({
                    productsInCart: response.getReturnValue()
                });
                addedToCartEvt.fire();
            }
            else{
                var errorsMessage = '';
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    errorsMessage = errors[0].message;
                }
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Failure",
                    "message": "An error has occurred while adding this product to the cart; " + errorsMessage
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);
    }
})