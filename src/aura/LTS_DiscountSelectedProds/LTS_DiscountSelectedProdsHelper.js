({
    deselectProduct: function(component, event){
        var selectedProdIndex = event.target.id;
        var selectedProducts = component.get('v.selectedProducts');

        selectedProducts.splice(selectedProdIndex, 1);
        component.set('v.selectedProducts', selectedProducts);
        var deselectedEvt =  $A.get("e.c:LTS_ProductsDeselectedEvt");
        deselectedEvt.fire();
    },
    deselectAll: function(component, event){
        var selectedProdIndex = event.target.id;
        var selectedProducts = component.get('v.selectedProducts');

        selectedProducts.splice(0, selectedProducts.length);
        component.set('v.selectedProducts', selectedProducts);
        var deselectedEvt =  $A.get("e.c:LTS_ProductsDeselectedEvt");
        deselectedEvt.fire();
    },
    calculatePercent: function (component, event) {
        var selectedProducts = component.get('v.selectedProducts');
        var selectedProdIndex = event.target.id;

        selectedProducts[selectedProdIndex].newPrice = (selectedProducts[selectedProdIndex].price - ((selectedProducts[selectedProdIndex].price * selectedProducts[selectedProdIndex].percentage) / 100));
        component.set('v.selectedProducts', selectedProducts);
    },
    templatePercent: function (component) {
        var selectedProducts = component.get('v.selectedProducts');
        var templatePercent = component.get('v.setForAllPercentage');

        for(var i = 0; i < selectedProducts.length; i++){
            selectedProducts[i].newPrice = (selectedProducts[i].price - ((selectedProducts[i].price * templatePercent) / 100));
            selectedProducts[i].percentage = templatePercent;
        }
        component.set('v.selectedProducts', selectedProducts);

    },
    templatePrice: function (component) {
        var selectedProducts = component.get('v.selectedProducts');
        var templatePrice = component.get('v.setForAllPrice');

        for(var i = 0; i < selectedProducts.length; i++){
            selectedProducts[i].newPrice = templatePrice;
            selectedProducts[i].percentage = 0;
        }
        component.set('v.selectedProducts', selectedProducts);
    }
})