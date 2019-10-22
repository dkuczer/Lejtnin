({
    handleInit: function(component){
        var action = component.get('c.getProductsFamilies');
        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                var results = response.getReturnValue();
                component.set('v.productsFamilies', results);
            }
            else{
                var failedToast = $A.get("e.force:showToast");
                failedToast.setParams({
                    "title": "Failed",
                    "message": "An unexpected error has occurred during component initialization",
                    'type': 'error'
                });
                failedToast.fire();
                $A.get('e.force:refreshView').fire();
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
            }
            else{
                var failedToast = $A.get("e.force:showToast");
                failedToast.setParams({
                    "title": "Failed",
                    "message": "An unexpected error has occurred while retrieving existing price books",
                    'type': 'error'
                });
                failedToast.fire();
                $A.get('e.force:refreshView').fire();
            }
        });
        $A.enqueueAction(action);
    },
    createNewPricebook: function (component) {
        component.set('v.showCreatingForm', true);
        component.set('v.pricebookId', '');
        component.set('v.newPricebookName', '');
        component.set('v.newPricebookStartDate', '');
        component.set('v.newPricebookEndDate', '');
        component.set('v.editorHeader', $A.get("$Label.c.LTS_NewPricebook"));
        var selectedProducts = component.get('v.selectedProducts');
        selectedProducts.splice(0, selectedProducts.length);
        component.set('v.selectedProducts', selectedProducts);
    },
    selectPricebook: function(component, event){
        var pbIndex = event.target.id;
        var pbList = component.get('v.pricebookList');
        var selectedPricebookId = pbList[pbIndex].Id;

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
                        component.set('v.editorHeader', $A.get("$Label.c.LTS_EditPB"));
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
                var failedToast = $A.get("e.force:showToast");
                var errors = response.getError();
                var errorsMessage = '';
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    errorsMessage = errors[0].message;
                }
                failedToast.setParams({
                    "title": "Failed",
                    "message": "An unexpected error has occurred while opening selected price book; " + errorsMessage,
                    'type': 'error'
                });
                failedToast.fire();
                $A.get('e.force:refreshView').fire();
            }
        });
        $A.enqueueAction(action);
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
                var successToast = $A.get("e.force:showToast");
                successToast.setParams({
                    "title": "Success",
                    "message": "Discount created successfully",
                    'type': 'success'
                });
                successToast.fire();
                $A.get('e.force:refreshView').fire();
            }
            else{
                var failedToast = $A.get("e.force:showToast");
                var errors = response.getError();
                var errorsMessage = '';
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    errorsMessage = errors[0].message;
                }
                failedToast.setParams({
                    "title": "Failed",
                    "message": "An unexpected error has occurred while saving this price book; " + errorsMessage,
                    'type': 'error'
                });
                failedToast.fire();
                $A.get('e.force:refreshView').fire();
            }
        });
        $A.enqueueAction(action);
    }
})