public with sharing class LTS_PriceBookUtils {
    public class PricesWrapper{
        @AuraEnabled public PricebookEntry standardPrice {get;set;}
        @AuraEnabled public PricebookEntry specialPrice {get;set;}
    }

    public static String getStandardPricebookId(){
        List<Pricebook2> priceBooks = [SELECT Id FROM Pricebook2 WHERE isStandard = true LIMIT 1];
        if (priceBooks.isEmpty()) {
            return null;
        }
        else{
            return priceBooks[0].Id;
        }
    }

    public static PricesWrapper getStandardAndSpecialPrice(String singleProductId){
        String standardPriceBookId = getStandardPricebookId();
        PricesWrapper productPriceWrapper = new PricesWrapper();
        List<PricebookEntry> pricesList = new List <PricebookEntry>();

        pricesList = [SELECT Id, Pricebook2Id, UnitPrice FROM PricebookEntry WHERE Product2Id = :singleProductId];
        if(!pricesList.isEmpty()){
            productPriceWrapper.specialPrice = pricesList[0];
        }
        for(PricebookEntry price: pricesList){
            if (price.Pricebook2Id == standardPriceBookId) {
                productPriceWrapper.standardPrice = price;
            }
            if(price.UnitPrice < productPriceWrapper.specialPrice.UnitPrice){
                productPriceWrapper.specialPrice = price;
            }
        }
        if(productPriceWrapper.specialPrice == productPriceWrapper.standardPrice){
            productPriceWrapper.specialPrice = null;
        }

        return productPriceWrapper;
    }
}