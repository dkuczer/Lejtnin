public with sharing class LTS_OrderDetailsController {
    @AuraEnabled
    public static List<OrderItem> getOrderProducts(String orderId){
        return LTS_OrdersHandler.getOrderItems(orderId);
    }
}