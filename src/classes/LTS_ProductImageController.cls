public with sharing class LTS_ProductImageController {
    private static final String posterType = 'poster';
    private static final String imageType = 'image';
//
    public class ProductImage {
        @AuraEnabled public List<ContentDistribution> images;
    }

    @AuraEnabled
    public static List<ContentDistribution> getProductImages(String productId) {
        ProductImage productImages = new ProductImage();
        Set<Id> contentIds = new Set<Id>();
        Set<Id> contentVersionIds = new Set<Id>();
        String contentVersionPosterId = '';
        List<ContentDistribution> contentDistributionsImages = new List<ContentDistribution>();

        try {
            List<ContentDocumentLink> contentDocumentLinks = [SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :productId];
            for (ContentDocumentLink link : contentDocumentLinks) {
                contentIds.add(link.ContentDocumentId);
            }

            System.debug('contentDocumentLinks: ' + contentDocumentLinks);

            List<ContentVersion> contentVersions = [SELECT Id FROM ContentVersion WHERE ContentDocumentId IN :contentIds AND FileType IN ('PNG', 'JPG', 'JPEG')];
            for (ContentVersion contentVersion : contentVersions) {
                contentVersionPosterId = contentVersion.Id;
                contentVersionIds.add(contentVersion.Id);
            }

            System.debug('contentVersions: ' + contentVersions);

            contentDistributionsImages = [SELECT Id, DistributionPublicUrl, ContentDownloadUrl, ContentDocumentId FROM ContentDistribution WHERE ContentVersionId IN :contentVersionIds];

            System.debug('contentDistributionsImages: ' + contentDistributionsImages);
            for(ContentDistribution img: contentDistributionsImages){
                System.debug(img.ContentDownloadUrl);
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return contentDistributionsImages;
    }

    @AuraEnabled
    public static void makeProductPoster(String imgUrl, String productId) {
        List<Product2> products = [SELECT Id, PosterUrl__c FROM Product2 WHERE Id = :productId];
        if(!products.isEmpty()){
            products[0].PosterUrl__c = imgUrl;
        }

        update products;
    }
    @AuraEnabled
    public static String getProductPoster(String productId) {
        List<Product2> products = [SELECT PosterUrl__c FROM Product2 WHERE Id = :productId];

        if(products.isEmpty()){
            return '';
        }
        else{
            return products[0].PosterUrl__c;
        }
    }

//    @AuraEnabled
//    public static void setProductImageType(String documentId, String typeOfImage, String laptopId) {
//        try {
//            if (typeOfImage == posterType) {
//                deleteOldPoster(laptopId);
//            }
//
//            List<ContentDocumentLink> contentDocumentLinks = [SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :laptopId AND ContentDocumentId = :documentId];
//
//            Id contentDocumentId = contentDocumentLinks[0].ContentDocumentId;
//            List<ContentVersion> contentVersions = [SELECT Id, Type__c, ContentDocumentId FROM ContentVersion WHERE ContentDocumentId = :contentDocumentId];
//
//            if (typeOfImage == posterType) {
//                contentVersions[0].Type__c = posterType;
//            } else {
//                contentVersions[0].Type__c = imageType;
//            }
//            upsert contentVersions;
//
//            ContentDistribution contentDistribution = new ContentDistribution();
//            if (typeOfImage == posterType) {
//                contentDistribution.Name = posterType;
//            } else {
//                contentDistribution.Name = imageType;
//            }
//            contentDistribution.ContentVersionId = contentVersions[0].Id;
//            contentDistribution.PreferencesAllowViewInBrowser = true;
//            contentDistribution.PreferencesLinkLatestVersion = true;
//            contentDistribution.PreferencesNotifyOnVisit = false;
//            contentDistribution.PreferencesPasswordRequired = false;
//            contentDistribution.PreferencesAllowOriginalDownload = true;
//            insert contentDistribution;
//        } catch (Exception e) {
//            throw new AuraHandledException(e.getMessage());
//        }
//    }

//    @AuraEnabled
//    public static void deleteImage(String imageId) {
//        try {
//            ContentDocument contentDocument = new ContentDocument(Id = imageId);
//            delete contentDocument;
//        } catch (Exception e) {
//            throw new AuraHandledException(e.getMessage());
//        }
//    }
}