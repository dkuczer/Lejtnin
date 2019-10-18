({
    handleInit: function(component){
        var action = component.get('c.getProductsFamilies');
        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                var results = response.getReturnValue();
                component.set('v.productsFamilies', results);
            }
            else{
                console.log('Hey, at least js is working');
            }
        });
        $A.enqueueAction(action);
    },
    getProducts: function (component) {

        var productWrappers = component.get('v.availableProducts');
        var productFamily = component.find('selectFamily').get('v.value');
        var productName = component.get('v.productName');
        var prodsId = [];

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
                console.log('results');
            }
            else{
                console.log('Hey, at least js is working');
            }
        });
        $A.enqueueAction(action);
    },
    selectProduct: function (component, event) {
        var availableProducts = component.get('v.availableProducts');
        var selectedProdIndex = event.target.id;
        var selectedProducts = component.get('v.selectedProducts');

        // selectedProducts.push(availableProducts[selectedProdIndex]);
        // availableProducts.slice(selectedProdIndex, 1);

        // component.set('v.selectedProducts', selectedProducts);
    }
})