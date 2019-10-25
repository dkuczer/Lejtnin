public with sharing class LTS_CaseHandler {

    public static void createCaseFromWebOrder(String orderId, String subject, String description){
        Case newCase = new Case();
        newCase.Subject = subject;
        newCase.Description = description;
        newCase.Order__c = orderId;
        newCase.RecordTypeId = LTS_CustomSettingsUtils.getCaseTypeOrderId();
        newCase.SuppliedEmail = UserInfo.getUserEmail();
        newCase.Origin = Label.LTS_CaseOriginWeb;
        newCase.SuppliedName = Label.LTS_WebCaseName + ' ' + orderId;

        insert newCase;
    }

    public static List<Case> getUserCases(){
        String userId = UserInfo.getUserId();
        List<Case> casesList = [SELECT Id, Subject, Description, CaseNumber, Order__r.OrderNumber, Status FROM Case WHERE CreatedById = :userId ORDER BY CaseNumber DESC ];

        return casesList;
    }
}