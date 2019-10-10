({
    handleItemClick: function (component, event, helper) {
        console.log(component.get('v.recordId'));
        var navEvt = $A.get('e.force:navigateToURL');
        navEvt.setParams({url: '/lts-product-page?productId=' + component.get('v.recordId')});
        navEvt.fire();
    }
})