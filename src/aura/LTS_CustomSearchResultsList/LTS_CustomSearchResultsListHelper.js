<<<<<<< HEAD
({
    handleInit: function(component){
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
            else{
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Failure",
                    "message": "An error has occurred while retrieving products families"
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);
    },
    handleSearchByFamily: function(component, event){
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
            else{
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Failure",
                    "message": "An error has occurred while searching for products"
                });
                toastEvent.fire();
            }
        });

        $A.enqueueAction(action);
    }
})
=======
/**
 * Created by BRITENET on 16.10.2019.
 */
({})
>>>>>>> Lejtnin/feature/5-searchForProducts
