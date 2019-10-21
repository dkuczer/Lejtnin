public with sharing class LTS_DiscountManagerController {

    @AuraEnabled
    public static List<String> getProductsFamilies(){
        return LTS_ProductsHandler.getProductsFamilies();
    }

    @AuraEnabled
    public static List<LTS_PricebookHandler.ProductPricebookWrapper> searchForProducts(String prodName, String prodFamily, List<String> chosenProdsIds){
        return LTS_PricebookHandler.searchForProducts(prodName, prodFamily, chosenProdsIds);
    }

    @AuraEnabled
    public static List<Pricebook2> getPricebookNames(){
        return LTS_PricebookHandler.getPricebookNames();
    }

    @AuraEnabled
    public static void saveNewPricebook(String pbId, String pbName, Date pbStartDate, Date pbEndDate, List<LTS_PricebookHandler.ProductPricebookWrapper> pbEntries){
        LTS_PricebookHandler.saveNewPricebook(pbId, pbName, pbStartDate, pbEndDate, pbEntries);
    }

    @AuraEnabled
    public static List<LTS_PricebookHandler.ProductPricebookWrapper> getPricebookEntries(String pricebookId){
//        System.debug(LTS_PricebookHandler.getPricebookEntries(pricebookId));
        return LTS_PricebookHandler.getPricebookEntries(pricebookId);
    }
}