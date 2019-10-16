({
    handleClick : function(component, event, helper) {
        helper.searchPhrase(component);
    },
    keyCheck : function(component, event, helper){
        if (event.which == 13){
            helper.searchPhrase(component);
        }
    }
})