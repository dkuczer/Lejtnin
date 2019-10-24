/**
 * Created by BRITENET on 11.10.2019.
 */

public with sharing class LTS_ProductPageController {

    public class ProductDetailsWrapper{
        @AuraEnabled public Product2 productRecord {get;set;}
        @AuraEnabled public List<String> picturesUrls {get;set;}
        @AuraEnabled public List<Comment__c> comments {get;set;}
        @AuraEnabled public PricebookEntry standardPrice {get;set;}
        @AuraEnabled public PricebookEntry specialPrice {get;set;}
        @AuraEnabled public Double rating {get;set;}
    }

    @AuraEnabled
    public static ProductDetailsWrapper getProductById(String productId){
        ProductDetailsWrapper prodWrapper = new ProductDetailsWrapper();
        LTS_PriceBookUtils.PricesWrapper pricesWrapper = new LTS_PriceBookUtils.PricesWrapper();
        prodWrapper.picturesUrls = new List<String>();
        prodWrapper.rating = 0;

        List<Product2> productsList = [SELECT Name, Description, Family, PosterUrl__c, ProductCode FROM Product2 WHERE Id = :productId];

        for(ContentDistribution contDistr: LTS_ProductImageController.getProductImages(productId)){
            prodWrapper.picturesUrls.add(contDistr.ContentDownloadUrl);
        }

        if(!productsList.isEmpty()){
            prodWrapper.productRecord = productsList[0];
            pricesWrapper = LTS_PriceBookUtils.getStandardAndSpecialPrice(productId);
            prodWrapper.standardPrice = pricesWrapper.standardPrice;
            prodWrapper.specialPrice = pricesWrapper.specialPrice;
        }

        prodWrapper.comments = [SELECT Id, CommentBody__c, Rating__c, CreatedBy.Name FROM Comment__c WHERE Product__c =: productId];
        if(!prodWrapper.comments.isEmpty()){
            for(Comment__c comment: prodWrapper.comments){
                prodWrapper.rating += comment.Rating__c;
            }
            prodWrapper.rating = (prodWrapper.rating / prodWrapper.comments.size());
        }


        System.debug('Standard price: ' + prodWrapper.standardPrice.UnitPrice);
        System.debug('Special price: ' + prodWrapper.specialPrice.UnitPrice);
        return prodWrapper;
    }

    @AuraEnabled
    public static Integer addToCart(String productId, String productName, String posterUrl, Double unitPrice, String standardPricebookEntryId){
        return LTS_OrdersHandler.addToCart(productId, productName, posterUrl, unitPrice, standardPricebookEntryId);
    }

    @AuraEnabled
    public static Integer getProductsInCartNumber(){
        return LTS_OrdersHandler.getProductsInCartNumber();
    }
}