public with sharing class LTS_CartController {

    @AuraEnabled
    public static List<LTS_OrdersHandler.ProductWrapper> getProductsFromCart(){
        return LTS_OrdersHandler.getProductsFromCart();
    }
    @AuraEnabled
    public static List<LTS_OrdersHandler.ProductWrapper> changeProductQuantity(String productId, Integer quantity){
        return LTS_OrdersHandler.changeProductQuantity(productId, quantity);
    }
}