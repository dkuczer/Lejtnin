({
    showDetails: function(component, event, helper){
        var divisionsRec = event.getParam("accountRecord");
            component.set('v.accountRecord', divisionsRec);
    },
    clearContent : function(component, event, helper){
            component.set('v.accountRecord', null);
    }
})