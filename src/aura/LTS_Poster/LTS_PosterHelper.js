<<<<<<< HEAD
({
    handleInit: function(component){
        var action = component.get('c.getProductPoster');

        console.log('PosterCMP recordId: ' + component.get('v.recordId'));

        action.setParams({productId: component.get('v.recordId')});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var posterURL = response.getReturnValue();
                console.log('PosterCMP poster url: ' + posterURL);
                component.set('v.posterURL', posterURL);
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
