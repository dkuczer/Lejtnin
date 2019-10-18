public with sharing class LTS_PricebookHandler {
    public class ProductPricebookWrapper{
        @AuraEnabled public String prodName {get;set;}
        @AuraEnabled public String prodId {get;set;}
        @AuraEnabled public Double price {get;set;}
    }
    @AuraEnabled
    public static List<ProductPricebookWrapper> searchForProducts(String prodName, String prodFamily, List<String> alreadyOnListIds){
        String standardPBId = LTS_CustomSettingsUtils.getStandardPricebookId();
        prodFamily = '%' + prodFamily;
        prodName = '%' + prodName + '%';

        System.debug('Ids already on list: ' + alreadyOnListIds);

        List<PricebookEntry> foundProducts = [SELECT Id, Name, UnitPrice, Product2.Id, Product2.Name, Product2.Family FROM PricebookEntry
                                                    WHERE Pricebook2Id = :standardPBId
                                                    AND Product2.Id NOT IN :alreadyOnListIds
                                                    AND Product2.Family LIKE :prodFamily
                                                    AND Product2.Name Like :prodName];

        List<ProductPricebookWrapper> pbWrappersList = new List<ProductPricebookWrapper>();
        for(PricebookEntry pbEntry: foundProducts){
            ProductPricebookWrapper pbWrapper = new ProductPricebookWrapper();
            pbWrapper.prodName = pbEntry.Product2.Name;
            pbWrapper.prodId = pbEntry.Product2.Id;
            pbWrapper.price = pbEntry.UnitPrice;
            pbWrappersList.add(pbWrapper);
        }

        System.debug('Returning prods: ' + pbWrappersList);

        return pbWrappersList;
    }
}