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
                console.log('results');
            }
            else{
                console.log('Hey, at least js is working');
            }
        });
        $A.enqueueAction(action);
    },
    getPricebookList: function(component){
        var action = component.get('c.getPricebookNames');
        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                var results = response.getReturnValue();
                component.set('v.pricebookList', results);
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
        var availableProdIndex = event.target.id;
        var selectedProducts = component.get('v.selectedProducts');

        console.log(availableProducts.length);
        console.log(availableProdIndex);
        console.log(availableProducts[availableProdIndex].prodName);

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
    },
    deselectProduct: function(component, event){
        var selectedProdIndex = event.target.id;
        var selectedProducts = component.get('v.selectedProducts');

        selectedProducts.splice(selectedProdIndex, 1);
        component.set('v.selectedProducts', selectedProducts);
    },
    deselectAll: function(component, event){
        var selectedProdIndex = event.target.id;
        var selectedProducts = component.get('v.selectedProducts');

        selectedProducts.splice(0, selectedProducts.length);
        component.set('v.selectedProducts', selectedProducts);
    },
    createNewPricebook: function (component) {
        component.set('v.showCreatingForm', true);
        component.set('v.pricebookId', '');
        component.set('v.newPricebookName', '');
        component.set('v.newPricebookStartDate', '');
        component.set('v.newPricebookEndDate', '');
        var selectedProducts = component.get('v.selectedProducts');
        selectedProducts.splice(0, selectedProducts.length);
        component.set('v.selectedProducts', selectedProducts);
    },
    savePricebook: function (component) {
        var pricebookId = component.get('v.pricebookId');
        var pricebookName = component.get('v.newPricebookName');
        var pricebookStartDate = component.get('v.newPricebookStartDate');
        var pricebookEndDate = component.get('v.newPricebookEndDate');
        var pricebookEntries = component.get('v.selectedProducts');

        var action = component.get('c.saveNewPricebook');
        action.setParams({
            pbId: pricebookId,
            pbName: pricebookName,
            pbStartDate: pricebookStartDate,
            pbEndDate: pricebookEndDate,
            pbEntries: pricebookEntries
        });

        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                var results = response.getReturnValue();
                console.log('PB SAVED');
            }
            else{
                console.log('Hey, at least js is working');
            }
        });
        $A.enqueueAction(action);
    },
    calculatePercent: function (component, event) {
        var selectedProducts = component.get('v.selectedProducts');
        var selectedProdIndex = event.target.id;

        selectedProducts[selectedProdIndex].newPrice = ((selectedProducts[selectedProdIndex].price * selectedProducts[selectedProdIndex].percentage) / 100);
        component.set('v.selectedProducts', selectedProducts);
    },
    templatePercent: function (component) {
        var selectedProducts = component.get('v.selectedProducts');
        var templatePercent = component.get('v.setForAllPercentage');

        for(var i = 0; i < selectedProducts.length; i++){
            selectedProducts[i].newPrice = ((selectedProducts[i].price * templatePercent) / 100);
            selectedProducts[i].percentage = templatePercent;
        }
        component.set('v.selectedProducts', selectedProducts);

    },
    templatePrice: function (component) {
        var selectedProducts = component.get('v.selectedProducts');
        var templatePrice = component.get('v.setForAllPrice');

        for(var i = 0; i < selectedProducts.length; i++){
            selectedProducts[i].newPrice = templatePrice;
            selectedProducts[i].percentage = 0;
        }
        component.set('v.selectedProducts', selectedProducts);
    },
    selectPricebook: function(component){
        var selectedPricebookId = component.find('selectPricebook').get('v.value');
        if(selectedPricebookId === ''){
            return;
        }
        var action = component.get('c.getPricebookEntries');
        action.setParams({
            pricebookId: selectedPricebookId
        });
        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                var results = response.getReturnValue();
                var pricebooks = component.get('v.pricebookList');
                for(var i = 0; i < pricebooks.length; i++){
                    if(pricebooks[i].Id === selectedPricebookId){
                        component.set('v.pricebookId', selectedPricebookId);
                        component.set('v.newPricebookName', pricebooks[i].Name);
                        component.set('v.newPricebookStartDate', pricebooks[i].StartDate__c);
                        component.set('v.newPricebookEndDate', pricebooks[i].EndDate__c);
                        component.set('v.showCreatingForm', true);
                        component.set('v.selectedProducts', results);
                        break;
                    }
                }
            }
            else{
                console.log('Hey, at least js is working');
            }
        });
        $A.enqueueAction(action);
    }
})