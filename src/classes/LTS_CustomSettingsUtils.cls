public with sharing class LTS_CustomSettingsUtils {
    public static final String STANDARD_PRICEBOOK_ID_SETTING_NAME = 'StandardPriceBookId';

    public static String getStandardPricebookId(){
        return LTS_CS__c.getInstance(STANDARD_PRICEBOOK_ID_SETTING_NAME).Value__c;
    }
}