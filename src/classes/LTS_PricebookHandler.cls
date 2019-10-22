public with sharing class LTS_PricebookHandler {
    public class ProductPricebookWrapper{
        @AuraEnabled public String prodName {get;set;}
        @AuraEnabled public String prodId {get;set;}
        @AuraEnabled public Double price {get;set;}
        @AuraEnabled public Double newPrice {get;set;}
        @AuraEnabled public Integer percentage {get;set;}
    }
    @AuraEnabled
    public static List<ProductPricebookWrapper> searchForProducts(String prodName, String prodFamily, List<String> alreadyOnListIds){
        String standardPBId = LTS_CustomSettingsUtils.getStandardPricebookId();
        prodFamily = '%' + prodFamily;
        prodName = '%' + prodName + '%';

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
        return pbWrappersList;
    }

    @AuraEnabled
    public static List<Pricebook2> getPricebookNames(){
        String standardPBId = LTS_CustomSettingsUtils.getStandardPricebookId();
        List<Pricebook2> pricebooks = [SELECT Id, Name, StartDate__c, EndDate__c FROM Pricebook2 WHERE Id != :standardPBId];
        return pricebooks;
    }

    @AuraEnabled
    public static void saveNewPricebook(String pbId, String pbName, Date pbStartDate, Date pbEndDate, List<ProductPricebookWrapper> pbWrappers){
        if(String.isBlank(pbId)){
            Pricebook2 newPB = new Pricebook2();
            newPB.Name = pbName;
            newPB.StartDate__c = pbStartDate;
            newPB.EndDate__c = pbEndDate;

            Database.SaveResult result = Database.insert(newPB);

            List<PricebookEntry> pbEntriesList = new List<PricebookEntry>();
            for(ProductPricebookWrapper pbWrapper: pbWrappers){
                PricebookEntry pbEntry = new PricebookEntry();
                pbEntry.Product2Id = pbWrapper.prodId;
                pbEntry.Pricebook2Id = newPb.Id;
                pbEntry.UnitPrice = pbWrapper.newPrice;
                pbEntriesList.add(pbEntry);
            }
            insert pbEntriesList;
        }
        else{
            List<Pricebook2> pbList = [SELECT Id, Name, StartDate__c, EndDate__c FROM Pricebook2 WHERE Id = :pbId];
            if(!pbList.isEmpty()){
                pbList[0].Name = pbName;
                pbList[0].StartDate__c = pbStartDate;
                pbList[0].EndDate__c = pbEndDate;

                Database.SaveResult result = Database.update(pbList[0]);
                List<PricebookEntry> pbEntriesList = [SELECT Id FROM PricebookEntry WHERE Pricebook2Id = :pbId];
                delete pbEntriesList;
                pbEntriesList = new List<PricebookEntry>();
                for(ProductPricebookWrapper pbWrapper: pbWrappers){
                    PricebookEntry pbEntry = new PricebookEntry();
                    pbEntry.Product2Id = pbWrapper.prodId;
                    pbEntry.Pricebook2Id = pbList[0].Id;
                    pbEntry.UnitPrice = pbWrapper.newPrice;
                    pbEntriesList.add(pbEntry);
                }
                insert pbEntriesList;
            }
        }
    }

    @AuraEnabled
    public static List<ProductPricebookWrapper> getPricebookEntries(String pricebookId){
        List<PricebookEntry> pbEntriesList = [SELECT Id, Name, Product2Id, Pricebook2Id, Product2.Name, UnitPrice FROM PricebookEntry WHERE Pricebook2Id = :pricebookId];
        Map<String, ProductPricebookWrapper> pbWrappersMap = new Map<String, ProductPricebookWrapper>();
        String standardPBId = LTS_CustomSettingsUtils.getStandardPricebookId();

        List<String> productIds = new List<String>();
        for(PricebookEntry pbEntry: pbEntriesList){
            ProductPricebookWrapper pbWrapper = new ProductPricebookWrapper();
            pbWrapper.prodName = pbEntry.Product2.Name;
            pbWrapper.prodId = pbEntry.Product2Id;
            pbWrapper.newPrice = pbEntry.UnitPrice;
            pbWrappersMap.put(pbEntry.Product2Id, pbWrapper);
            productIds.add(pbEntry.Product2Id);
        }

        List<PricebookEntry> standardPBEntriesList = [SELECT Id, Product2Id, Pricebook2Id, UnitPrice FROM PricebookEntry WHERE Product2Id IN :productIds AND Pricebook2Id = :standardPBId];

        for(PricebookEntry pbEntry: standardPBEntriesList){
            ProductPricebookWrapper temp = pbWrappersMap.get(pbEntry.Product2Id);
            temp.price = pbEntry.UnitPrice;
            pbWrappersMap.put(pbEntry.Product2Id, temp);
        }
        return pbWrappersMap.values();
    }
}