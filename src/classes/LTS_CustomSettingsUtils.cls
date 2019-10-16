public with sharing class LTS_CustomSettingsUtils {
    public static final String STANDARD_PRICEBOOK_ID_SETTING_NAME = 'StandardPriceBookId';
    public static final String ORDERS_ACCOUNT_ID_SETTING_NAME = 'OrdersAccountId';
    public static final String ORDERS_CONTRACT_ID_SETTING_NAME = 'OrdersContractId';
    public static final String NEW_ORDER_STATUS_SETTING_NAME = 'NewOrderStatusFromPicklist';

    public static String getStandardPricebookId(){
        return LTS_CS__c.getInstance(STANDARD_PRICEBOOK_ID_SETTING_NAME).Value__c;
    }
    public static String getOrdersAccountId(){
        return LTS_CS__c.getInstance(ORDERS_ACCOUNT_ID_SETTING_NAME).Value__c;
    }
    public static String getOrdersContractId(){
        return LTS_CS__c.getInstance(ORDERS_CONTRACT_ID_SETTING_NAME).Value__c;
    }
    public static String getNewOrderStatus(){
        return LTS_CS__c.getInstance(NEW_ORDER_STATUS_SETTING_NAME).Value__c;
    }
}