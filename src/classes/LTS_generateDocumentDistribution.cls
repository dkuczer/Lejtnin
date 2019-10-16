public with sharing class LTS_generateDocumentDistribution {


    public void generateDistribution(){
        List<Product2> products = [SELECT Id FROM Product2];
        Set<Id> productsIds = new Set<Id>();
        Set<Id> contentVersionIds = new Set<Id>();
        Set<Id> contentIds = new Set<Id>();
        for(Product2 product: products){
            productsIds.add(product.Id);
        }

        List<ContentDocumentLink> contentDocumentLinks = [SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId IN :productsIds];
        for (ContentDocumentLink link : contentDocumentLinks) {
            contentIds.add(link.ContentDocumentId);
            link.Visibility = 'AllUsers';
        }

        update contentDocumentLinks;

        List<ContentVersion> contentVersions = [SELECT Id FROM ContentVersion WHERE ContentDocumentId IN :contentIds AND FileType IN ('PNG', 'JPG', 'JPEG')];
        for (ContentVersion contentVersion : contentVersions) {
            contentVersionIds.add(contentVersion.Id);
        }

        List<ContentDistribution> contentDistributions = new List<ContentDistribution>();
        for (ContentVersion contentVersion : (List<ContentVersion>) contentVersions) {

            ContentDistribution cd = new ContentDistribution();
            cd.Name = 'PublicProductImage';
            cd.ContentVersionId = contentVersion.id;
            cd.PreferencesAllowViewInBrowser = true;
            cd.PreferencesLinkLatestVersion = true;
            cd.PreferencesNotifyOnVisit = false;
            cd.PreferencesPasswordRequired = false;
            cd.PreferencesAllowOriginalDownload = true;
            contentDistributions.add(cd);

        }
        insert contentDistributions;
    }
}