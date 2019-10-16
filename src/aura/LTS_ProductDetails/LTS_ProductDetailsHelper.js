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
                console.log('Hey, at least js is working');
            }
        });
        $A.enqueueAction(action);
    },

    addToCart: function (component) {
        var productDetailsWrapper = component.get('v.productDetailsWrapper');
        var price;
        if(productDetailsWrapper.specialPrice){
            price = productDetailsWrapper.specialPrice.UnitPrice;
        }
        else{
            price = productDetailsWrapper.standardPrice.UnitPrice;
        }

        var action = component.get('c.addToCart');
        action.setParams({
            productId: productDetailsWrapper.productRecord.Id,
            productName: productDetailsWrapper.productRecord.Name,
            posterUrl: productDetailsWrapper.productRecord.PosterUrl__c,
            unitPrice: price
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
                console.log('Hey, at least js is working');
            }
        });
        $A.enqueueAction(action);
    }
})