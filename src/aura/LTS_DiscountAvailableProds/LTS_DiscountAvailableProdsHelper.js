({
    getProducts: function (component) {
        var selectedProducts = component.get('v.selectedProducts');
        var productFamily = component.find('selectFamily').get('v.value');
        var productName = component.get('v.productName');
        var prodsId = [];

        for(var i = 0; i < selectedProducts.length; i++){
            prodsId.push(selectedProducts[i].prodId);
        }
        productName = (productName == null? '': productName);

        var action = component.get('c.searchForProducts');
        action.setParams({
            prodName: productName,
            prodFamily: productFamily,
            chosenProdsIds: prodsId
        });
        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                var results = response.getReturnValue();
                component.set('v.availableProducts', results);
            }
            else{
                var errors = response.getError();
                var errorsMessage = '';
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    errorsMessage = errors[0].message;
                }
                var failedToast = $A.get("e.force:showToast");
                failedToast.setParams({
                    "title": "Failed",
                    "message": "An unexpected error has occurred while retrieving available products; " + errorsMessage,
                    'type': 'error'
                });
                failedToast.fire();
                $A.get('e.force:refreshView').fire();
            }
        });
        $A.enqueueAction(action);
    },
    selectProduct: function (component, event) {
        var availableProducts = component.get('v.availableProducts');
        var availableProdIndex = event.target.id;
        var selectedProducts = component.get('v.selectedProducts');

        selectedProducts.push(availableProducts[availableProdIndex]);
        availableProducts.slice(availableProdIndex, 1);

        component.set('v.selectedProducts', selectedProducts);
    },
    selectAll: function(component){
        var availableProducts = component.get('v.availableProducts');
        var selectedProducts = component.get('v.selectedProducts');

        for(var i = 0; i < availableProducts.length; i++){
            selectedProducts.push(availableProducts[i]);
        }
        component.set('v.selectedProducts',selectedProducts);
    }
})