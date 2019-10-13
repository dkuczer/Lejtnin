/**
 * Created by BRITENET on 11.10.2019.
 */

public with sharing class LTS_ProductPageController {

    public class ProductDetailsWrapper{
        @AuraEnabled Product2 productRecord {get;set;}
        @AuraEnabled List<String> picturesUrls {get;set;}
        @AuraEnabled PricebookEntry standardPrice {get;set;}
        @AuraEnabled PricebookEntry specialPrice {get;set;}
    }

    @AuraEnabled
    public static ProductDetailsWrapper getProductById(String productId){
        ProductDetailsWrapper prodWrapper = new ProductDetailsWrapper();
        LTS_PriceBookUtils.PricesWrapper pricesWrapper = new LTS_PriceBookUtils.PricesWrapper();
        prodWrapper.picturesUrls = new List<String>();

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


        System.debug('Standard price: ' + prodWrapper.standardPrice.UnitPrice);
        System.debug('Special price: ' + prodWrapper.specialPrice.UnitPrice);
        return prodWrapper;
    }
}