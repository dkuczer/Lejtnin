public with sharing class LTS_CommentsAndRatingHandler {
    @AuraEnabled
    public static Product2 getProductInfo(String prodId){
        List<Product2> prodsList = [SELECT Id, Name, PosterUrl__c FROM Product2 WHERE Id = :prodId];
        if(!prodsList.isEmpty()){
            return prodsList[0];
        }
        else{
            return null;
        }
    }

    @AuraEnabled
    public static void postComment(Integer rating, String commentBody, String productId, String orderItemId){
        List<OrderItem> orderItems = [SELECT Id, Comment__c FROM OrderItem WHERE Id = : orderItemId];
        if(!orderItems.isEmpty()){
            Comment__c newComment = new Comment__c();
            newComment.CommentBody__c = commentBody;
            newComment.Product__c = productId;
            newComment.Rating__c = rating;
            insert newComment;

            orderItems[0].Comment__c = newComment.Id;
            update orderItems[0];
        }
    }
}