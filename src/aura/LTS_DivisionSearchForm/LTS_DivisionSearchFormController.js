({
    clickSearch: function(component, event, helper){
        var compDivisionName = component.get('v.divisionName');
        var compCity = component.get('v.divisionCity');
        var compStreet = component.get('v.divisionStreet');;



        var action = component.get('c.searchForAccounts');

        action.setParams({
            divisionName: '' + compDivisionName? compDivisionName: '',
            city: '' + compCity? compCity: '',
            street: '' + compStreet? compStreet: ''
        });

        action.setCallback(this, function(response){
           if(response.getState() === 'SUCCESS'){
               var accountsList = response.getReturnValue();
               if(accountsList){
                   var searchDivisionsEvent =  $A.get("e.c:LTS_DivisionsSearchEvent");
                   searchDivisionsEvent.setParams({
                       divisionsList: accountsList
                   });
                   searchDivisionsEvent.fire();
               }
           }
           else{
               console.log('Hey, at least js is working');
           }
        });
        $A.enqueueAction(action);
    },
    clickClear: function(component, event, helper){
            component.set('v.divisionName', '');
            component.set('v.divisionCity', '');
            component.set('v.divisionStreet', '');
        }
})