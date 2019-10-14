({
    init: function(component, event, helper) {
        var idsJson = sessionStorage.getItem('customSearch--recordIds');
        if (!$A.util.isUndefinedOrNull(idsJson)) {
            var ids = JSON.parse(idsJson);
            component.set('v.recordIds', ids);
            sessionStorage.removeItem('customSearch--recordIds');
        }

        var action = component.get('c.getProductFamilies');
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var families = response.getReturnValue();
                component.set('v.productFamilies', families)
            }
        });
        $A.enqueueAction(action);
    },

    searchByFamily: function (component, event, helper) {
        var families = component.get('v.productFamilies');
        var familyIndex = event.target.id;
        var action = component.get('c.searchForIdsByFamily');
        action.setParams({familyString: families[familyIndex]});

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var ids = response.getReturnValue();
                component.set('v.recordIds', ids)
            }
        });

        $A.enqueueAction(action);
    }
})