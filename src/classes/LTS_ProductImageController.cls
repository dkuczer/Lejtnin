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

            List<ContentVersion> contentVersions = [SELECT Id FROM ContentVersion WHERE ContentDocumentId IN :contentIds AND FileType IN ('PNG', 'JPG', 'JPEG')];
            for (ContentVersion contentVersion : contentVersions) {
                contentVersionPosterId = contentVersion.Id;
                contentVersionIds.add(contentVersion.Id);
            }

            contentDistributionsImages = [SELECT Id, DistributionPublicUrl, ContentDownloadUrl, ContentDocumentId FROM ContentDistribution WHERE ContentVersionId IN :contentVersionIds];

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
}