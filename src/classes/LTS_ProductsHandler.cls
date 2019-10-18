public with sharing class LTS_ProductsHandler {
    public static final String PRODUCT_FAMILIES = 'Family';

    @AuraEnabled
    public static List<String> getProductsFamilies(){
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