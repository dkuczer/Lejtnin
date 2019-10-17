public with sharing class LTS_OrderListPageController {
    @AuraEnabled
    public static List<Order> getUserOrders(){
        return LTS_OrdersHandler.getCurrentUserOrders();
    }
}