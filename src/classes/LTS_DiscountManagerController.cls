public with sharing class LTS_DiscountManagerController {

    @AuraEnabled
    public static List<String> getProductsFamilies(){
        return LTS_ProductsHandler.getProductsFamilies();
    }

    @AuraEnabled
    public static List<LTS_PricebookHandler.ProductPricebookWrapper> searchForProducts(String prodName, String prodFamily, List<String> chosenProdsIds){
        System.debug(prodFamily);
        System.debug(prodName);
        return LTS_PricebookHandler.searchForProducts(prodName, prodFamily, chosenProdsIds);
    }
}