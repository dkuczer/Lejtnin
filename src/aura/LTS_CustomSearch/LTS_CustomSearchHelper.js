({
    searchPhrase: function(component){
        var searchText = component.get('v.searchText');
        var action = component.get('c.searchForIds');
        action.setParams({searchText: searchText});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var ids = response.getReturnValue();
                sessionStorage.setItem('customSearch--recordIds', JSON.stringify(ids));
                var navEvt = $A.get('e.force:navigateToURL');
                navEvt.setParams({url: '/lts-search-results'});
                navEvt.fire();
            }
            else{
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Failure",
                    "message": "An error has occurred while retrieving searching for given phrase"
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);
    }
})