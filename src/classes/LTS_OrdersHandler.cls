public with sharing class LTS_OrdersHandler {
    public static final String CACHE_PARTITION_NAME = 'LTSCache';
    public static final String CACHE_ORDER_PRODUCTS = 'orderProducts';

    public class ProductWrapper{
        @AuraEnabled public String productId;
        @AuraEnabled public String productName;
        @AuraEnabled public String posterUrl;
        @AuraEnabled public Double productPrice;
        @AuraEnabled public Integer quantity;
        @AuraEnabled public String standardPriceBookEntryId;
    }

    @AuraEnabled
    public static Integer addToCart(String productId, String productName, String posterUrl, Double unitPrice, String standardPricebookEntryId){
        Cache.SessionPartition sessionPart = Cache.Session.getPartition(CACHE_PARTITION_NAME);
        Map<String, ProductWrapper> orderProducts = (Map<String, ProductWrapper>)sessionPart.get(CACHE_ORDER_PRODUCTS);

        if(orderProducts == null){
            orderProducts = new Map<String, ProductWrapper>();
            orderProducts.put(productId, createWrapper(productId, productName, posterUrl, unitPrice, standardPricebookEntryId));
        }
        else if(!orderProducts.containsKey(productId)){
            orderProducts.put(productId, createWrapper(productId, productName, posterUrl, unitPrice, standardPricebookEntryId));
        }
        else{
            ProductWrapper temp = orderProducts.get(productId);
            temp.quantity = (temp.quantity + 1);
            orderProducts.put(productId, temp);
        }
        sessionPart.put(CACHE_ORDER_PRODUCTS, orderProducts);
        return countProducts(orderProducts);


    }

    @AuraEnabled
    public static Integer getProductsInCartNumber(){
        Cache.SessionPartition sessionPart = Cache.Session.getPartition(CACHE_PARTITION_NAME);
        Map<String, ProductWrapper> orderProducts = (Map<String, ProductWrapper>)sessionPart.get(CACHE_ORDER_PRODUCTS);
        if(orderProducts == null){
            return 0;
        }
        else{
            return countProducts(orderProducts);
        }
    }

    public static ProductWrapper createWrapper(String productId, String productName, String posterUrl, Double unitPrice, String standardPricebookEntryId){
        ProductWrapper newProdWrapper = new ProductWrapper();
        newProdWrapper.productId = productId;
        newProdWrapper.productName = productName;
        newProdWrapper.productPrice = unitPrice;
        newProdWrapper.posterUrl = posterUrl;
        newProdWrapper.quantity = 1;
        newProdWrapper.standardPriceBookEntryId = standardPricebookEntryId;
        return newProdWrapper;
    }

    public static Integer countProducts(Map<String, ProductWrapper> productsInCartMap){
        Integer productsNO = 0;

        for(ProductWrapper product: productsInCartMap.values()){
            productsNO += product.quantity;
            System.debug(product.productName + ': ' + product.quantity);
        }
        return productsNO;
    }

    @AuraEnabled
    public static List<ProductWrapper> getProductsFromCart(){
        Cache.SessionPartition sessionPart = Cache.Session.getPartition(CACHE_PARTITION_NAME);
        Map<String, ProductWrapper> orderProducts = (Map<String, ProductWrapper>)sessionPart.get(CACHE_ORDER_PRODUCTS);
        if(orderProducts == null){
            System.debug('No cache found');
            return null;
        }
        else{
            System.debug('Found: ' + orderProducts);
            return orderProducts.values();
        }
    }

    @AuraEnabled
    public static List<ProductWrapper> changeProductQuantity(String productId, Integer quantity){
        Cache.SessionPartition sessionPart = Cache.Session.getPartition(CACHE_PARTITION_NAME);
        Map<String, ProductWrapper> orderProducts = (Map<String, ProductWrapper>)sessionPart.get(CACHE_ORDER_PRODUCTS);

        if(orderProducts == null){
            System.debug('No cache found');
            return null;
        }
        else{
            ProductWrapper temp = orderProducts.get(productId);
            temp.quantity = quantity;
            orderProducts.put(productId, temp);
        }

        sessionPart.put(CACHE_ORDER_PRODUCTS, orderProducts);
        return orderProducts.values();
    }
    @AuraEnabled
    public static List<ProductWrapper> removeProductFromCart(String productId){
        Cache.SessionPartition sessionPart = Cache.Session.getPartition(CACHE_PARTITION_NAME);
        Map<String, ProductWrapper> orderProducts = (Map<String, ProductWrapper>)sessionPart.get(CACHE_ORDER_PRODUCTS);

        if(orderProducts == null){
            System.debug('No cache found');
            return null;
        }
        else{
            orderProducts.remove(productId);
        }

        sessionPart.put(CACHE_ORDER_PRODUCTS, orderProducts);
        return orderProducts.values();
    }


    @AuraEnabled
    public static void createOrderFromCart(){
        Cache.SessionPartition sessionPart = Cache.Session.getPartition(CACHE_PARTITION_NAME);
        Map<String, ProductWrapper> orderProducts = (Map<String, ProductWrapper>)sessionPart.get(CACHE_ORDER_PRODUCTS);
        Order newOrder = new Order();

        if(orderProducts.isEmpty()){
            return;
        }

        newOrder.Pricebook2Id = LTS_CustomSettingsUtils.getStandardPricebookId();
        newOrder.ContractId = LTS_CustomSettingsUtils.getOrdersContractId();
        newOrder.AccountId = LTS_CustomSettingsUtils.getOrdersAccountId();
        newOrder.Status = LTS_CustomSettingsUtils.getNewOrderStatus();
        newOrder.EffectiveDate = date.today();
        newOrder.User__c = UserInfo.getUserId();

        Database.SaveResult result = Database.insert(newOrder);
        System.debug('Creating order success? ' + result.success);
        List<OrderItem> orderItemsList = new List<OrderItem>();

        for(ProductWrapper productWrapper: orderProducts.values()){
            OrderItem newOrderItem = new OrderItem();
            newOrderItem.Product2Id = productWrapper.productId;
            newOrderItem.Quantity = productWrapper.quantity;
            newOrderItem.UnitPrice = productWrapper.productPrice;
            newOrderItem.OrderId = newOrder.Id;
            newOrderItem.PricebookEntryId = productWrapper.standardPriceBookEntryId;
            orderItemsList.add(newOrderItem);
        }

        insert orderItemsList;
        sessionPart.remove(CACHE_ORDER_PRODUCTS);
    }

    @AuraEnabled
    public static List<Order> getCurrentUserOrders(){
        String currentUserId = UserInfo.getUserId();
        List<Order> userOrdersList = [SELECT Id, Name, EffectiveDate, User__c, TotalAmount, OrderNumber, Status FROM Order WHERE User__c = :currentUserId ORDER BY OrderNumber DESC];

        return userOrdersList;
    }

    @AuraEnabled
    public static List<OrderItem> getOrderItems(String orderId){
        String currentUserId = UserInfo.getUserId();
        List<OrderItem> userOrders = [SELECT Id, Order.OrderNumber, Order.Status, Quantity, UnitPrice, Product2.Id, Product2.Name, Product2.PosterUrl__c FROM OrderItem WHERE Order.Id = :orderId AND Order.User__c = :currentUserId];
        if(userOrders.isEmpty()){
            return null;
        }

        return userOrders;
    }
}