({
    handleUpdateStudents : function(component, event, helper) {
        var divisionsList = event.getParam("divisionsList");
        component.set('v.divisionsList', divisionsList);
	},
	clickDivision : function(component, event, helper){
	    var divisionsList = component.get('v.divisionsList');
        var divisionIndex = event.target.id;

	    var divisionClickedEvt = $A.get("e.c:LTS_DivisionClickedForDetails");
        divisionClickedEvt.setParams({
           accountRecord: divisionsList[divisionIndex]
        });
        divisionClickedEvt.fire();
    },
    clearContent : function(component,event, helper){
        var emptyList = [];
        component.set('v.divisionsList',emptyList);
    }
})