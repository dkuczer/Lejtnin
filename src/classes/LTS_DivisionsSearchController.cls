public with sharing class LTS_DivisionsSearchController {

    @AuraEnabled
    public static List<Account> searchForAccounts(String divisionName, String city, String street){

        List<Account> accounts = new List<Account>();

        LTS_SoqlUtil soqlUtil = new LTS_SoqlUtil('Account')
                .withAddResultField('Id')
                .withAddResultField('Name')
                .withAddResultField('BillingAddress')
                .withAddResultField('BillingStreet')
                .withAddResultField('BillingCity')
                .withAddResultField('BillingCountry')
                .withAddSearchPickFieldWithValue('Type', 'Division')
                .withAddSearchTextFieldWithValue('Name', divisionName)
                .withAddSearchTextFieldWithValue('BillingCity', city)
                .withAddSearchTextFieldWithValue('BillingStreet', street)
                .build();
        accounts = Database.query(soqlUtil.getQueryString());

        System.debug(accounts);

        return accounts;
    }
}