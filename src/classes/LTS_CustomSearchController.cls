public with sharing class LTS_CustomSearchController {
    public static final String PRODUCT_FAMILIES = 'Family';
    
    @AuraEnabled
    public static List<String> searchForIds(String searchText) {
        List<List<SObject>> results = [FIND :searchText IN ALL FIELDS  RETURNING Product2(Id)];
        List<String> ids = new List<String>();
        for (List<SObject> sobjs : results) {
            for (SObject sobj : sobjs) {
                ids.add(sobj.Id);
            }
        }
        System.debug(ids);
        return ids;
    }

    @AuraEnabled
    public static List<String> searchForIdsByFamily(String familyString){
        List<Product2> productsWithFamily = [SELECT Id FROM Product2 WHERE Family LIKE :familyString];
        List<String> productIds = new List<String>();
        for(Product2 prod: productsWithFamily){
            productIds.add(prod.Id);
        }
        return productIds;
    }

    @AuraEnabled
    public static List <String> getProductFamilies() {
        Product2 productObj = new Product2();

        List <String> allOpts = new list <String> ();
        Schema.sObjectType objType = productObj.getSObjectType();
        Schema.DescribeSObjectResult objDescribe = objType.getDescribe();
        map <String, Schema.SObjectField> fieldMap = objDescribe.fields.getMap();
        list <Schema.PicklistEntry> values = fieldMap.get(PRODUCT_FAMILIES).getDescribe().getPickListValues();
        for (Schema.PicklistEntry a: values) {
            allOpts.add(a.getValue());
        }
        allOpts.sort();

        return allOpts;
    }
}