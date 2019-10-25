public with sharing class LTS_ComplainsController {

    @AuraEnabled
    public static void createNewCase(String orderId, String caseSubject, String caseDescription){
        System.debug('orderId' + orderId);
        System.debug('caseSubject' + caseSubject);
        System.debug('caseDescription' + caseDescription);
        LTS_CaseHandler.createCaseFromWebOrder(orderId, caseSubject, caseDescription);
    }

    @AuraEnabled
    public static List<Case> getUserCases(){
        return LTS_CaseHandler.getUserCases();
    }
}