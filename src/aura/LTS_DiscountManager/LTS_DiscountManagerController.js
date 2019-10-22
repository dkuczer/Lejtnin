({
    doInit: function(component, event, helper){
        helper.handleInit(component);
        helper.getPricebookList(component);
    },
    createNewPricebook: function (component, event, helper) {
        helper.createNewPricebook(component);
        helper.getProducts(component);
    },
    selectPricebook: function(component, event, helper) {
        helper.selectPricebook(component, event);
    },
    cancelCreatePB: function (component, event, helper) {
        component.set('v.showCreatingForm',false);
    },
    savePricebook: function(component, event, helper){
        helper.savePricebook(component);
    }
})