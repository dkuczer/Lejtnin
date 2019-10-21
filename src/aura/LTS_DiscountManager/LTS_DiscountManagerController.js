({
    doInit: function(component, event, helper){
        helper.handleInit(component);
        helper.getPricebookList(component);
    },
    getProducts: function (component, event, helper) {
        helper.getProducts(component);
    },
    selectProduct: function (component, event, helper) {
        helper.selectProduct(component, event);
        helper.getProducts(component);
    },
    selectAll: function(component, event,helper){
        helper.selectAll(component);
        helper.getProducts(component);
    },
    deselectProduct: function(component, event, helper){
        helper.deselectProduct(component, event);
        helper.getProducts(component);
    },
    deselectAll: function(component, event, helper){
        helper.deselectAll(component, event);
        helper.getProducts(component);
    },
    createNewPricebook: function (component, event, helper) {
        helper.createNewPricebook(component);
        helper.getProducts(component);
    },
    cancelCreatePB: function (component, event, helper) {
        component.set('v.showCreatingForm',false);
    },
    savePricebook: function(component, event, helper){
        helper.savePricebook(component);
    },
    calculatePercent: function (component, event, helper) {
        helper.calculatePercent(component, event);
    },
    templatePercent: function (component, event, helper) {
        console.log('w ogole dziala?');
        helper.templatePercent(component);
    },
    templatePrice: function (component, event, helper) {
        helper.templatePrice(component);
    },
    selectPricebook: function(component, event, helper) {
        helper.selectPricebook(component);
    }
})