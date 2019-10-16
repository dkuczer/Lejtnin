public with sharing class LTS_OrdersHandler {
    public static final String CACHE_PARTITION_NAME = 'LTSCache';
    public static final String CACHE_ORDER_PRODUCTS = 'orderProducts';

    public class ProductWrapper{
        @AuraEnabled public String productId;
        @AuraEnabled public String productName;
        @AuraEnabled public String posterUrl;
        @AuraEnabled public Double productPrice;
        @AuraEnabled public Integer quantity;
    }

    @AuraEnabled
    public static Integer addToCart(String productId, String productName, String posterUrl, Double unitPrice){
        Cache.SessionPartition sessionPart = Cache.Session.getPartition(CACHE_PARTITION_NAME);
        Map<String, ProductWrapper> orderProducts = (Map<String, ProductWrapper>)sessionPart.get(CACHE_ORDER_PRODUCTS);

        if(orderProducts == null){
            orderProducts = new Map<String, ProductWrapper>();
            orderProducts.put(productId, createWrapper(productId, productName, posterUrl, unitPrice));
        }
        else if(!orderProducts.containsKey(productId)){
            orderProducts.put(productId, createWrapper(productId, productName, posterUrl, unitPrice));
        }
        else{
            ProductWrapper temp = orderProducts.get(productId);
            temp.quantity = (temp.quantity + 1);
            orderProducts.put(productId, temp);
        }
        sessionPart.put(CACHE_ORDER_PRODUCTS, orderProducts);
//        sessionPart.remove(CACHE_ORDER_PRODUCTS);

        return countProducts(orderProducts);

        //AccountId
        //EffectiveDate
        //Status
        //ContractId
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

    public static ProductWrapper createWrapper(String productId, String productName, String posterUrl, Double unitPrice){
        ProductWrapper newProdWrapper = new ProductWrapper();
        newProdWrapper.productId = productId;
        newProdWrapper.productName = productName;
        newProdWrapper.productPrice = unitPrice;
        newProdWrapper.posterUrl = posterUrl;
        newProdWrapper.quantity = 1;
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
}