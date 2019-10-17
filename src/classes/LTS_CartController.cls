public with sharing class LTS_CartController {

    @AuraEnabled
    public static List<LTS_OrdersHandler.ProductWrapper> getProductsFromCart(){
        System.debug(LTS_OrdersHandler.getProductsFromCart());
        return LTS_OrdersHandler.getProductsFromCart();
    }
    @AuraEnabled
    public static List<LTS_OrdersHandler.ProductWrapper> changeProductQuantity(String productId, Integer quantity){
        System.debug('changing quantity of ' + productId + ' to: ' + quantity);
        return LTS_OrdersHandler.changeProductQuantity(productId, quantity);
    }
    @AuraEnabled
    public static List<LTS_OrdersHandler.ProductWrapper> removeProductFromCart(String productId){
        return LTS_OrdersHandler.removeProductFromCart(productId);
    }
    @AuraEnabled
    public static void createOrderFromCart(){
        LTS_OrdersHandler.createOrderFromCart();
    }

}