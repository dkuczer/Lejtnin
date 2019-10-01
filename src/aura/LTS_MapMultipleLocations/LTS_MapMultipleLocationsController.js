({
    updateMarkersList : function(cmp, event, helper){
        var locationsList = [];
        var divisionsList = event.getParam("divisionsList");
        for(var i = 0; i < divisionsList.length; i++){
            locationsList.push({
                location: {
                        Street: divisionsList[i].BillingStreet,
                        City: divisionsList[i].BillingCity,
                        Country: divisionsList[i].BillingCountry
                   }
            });
        }
        cmp.set('v.mapMarkers', locationsList);
        cmp.set('v.zoomLevel', 0);
    },
    updateMarker : function(cmp, event, helper){
        var locationList = [];
        var divisionRecord = event.getParam("accountRecord");

        locationList.push({
            location: {
                    Street: divisionRecord.BillingStreet,
                    City: divisionRecord.BillingCity,
                    Country: divisionRecord.BillingCountry
               }
        });
        cmp.set('v.mapMarkers', locationList);
        cmp.set('v.zoomLevel', 14);
    },
    clearMarkers : function(cmp, event, helper){
        var emptyList = [];
        cmp.set('v.mapMarkers', emptyList);
        cmp.set('v.zoomLevel', 0);
    }

})