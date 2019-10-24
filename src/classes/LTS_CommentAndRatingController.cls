public with sharing class LTS_CommentAndRatingController {

    @AuraEnabled
    public static Product2 getProductInfo(String prodId){
        return LTS_CommentsAndRatingHandler.getProductInfo(prodId);
    }

    @AuraEnabled
    public static void postComment(Integer rating, String commentBody, String productId, String orderItemId){
        LTS_CommentsAndRatingHandler.postComment(rating, commentBody, productId, orderItemId);
    }
}