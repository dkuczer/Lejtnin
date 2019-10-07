public with sharing class LTS_SoqlUtil {


    private List<String> resultFieldsNames;
    private List<String> sortFieldsNames;
    private Map<String, String> searchTextFieldsWithValues;
    private Map<String, String> searchPickFieldsWithValues;
    private Map<String, List<String>> searchPickFieldsWithValuesList;


    private String tableName;
    private String queryString = '';
    private String sortOrder = 'ASC';

    public LTS_SoqlUtil(String tableName) {
        this.resultFieldsNames = new List<String>();
        this.searchTextFieldsWithValues = new Map<String, String>();
        this.searchPickFieldsWithValues = new Map<String, String>();
        this.searchPickFieldsWithValuesList = new Map<String, List<String>>();
        this.sortFieldsNames = new List<String>();
        this.tableName = tableName;
    }

    public String getQueryString() {
        return this.queryString;
    }
    public LTS_SoqlUtil withAddResultField(String fieldName) {
        this.resultFieldsNames.add(fieldName);
        return this;
    }
    public LTS_SoqlUtil withAddSearchTextFieldWithValue(String fieldName, String value) {
        this.searchTextFieldsWithValues.put(fieldName, value);
        return this;
    }
    public LTS_SoqlUtil withAddSearchPickFieldWithValue(String fieldName, String value) {
        this.searchPickFieldsWithValues.put(fieldName, value);
        return this;
    }
    public LTS_SoqlUtil withAddSearchPickFieldWithValuesList(String fieldName, List<String> values) {
        this.searchPickFieldsWithValuesList.put(fieldName, values);
        return this;
    }
    public LTS_SoqlUtil withAddSortField(String fieldName) {
        this.sortFieldsNames.add(fieldName);
        return this;
    }
    public LTS_SoqlUtil withAddSortOrder(String sortOrder) {
        this.sortOrder = sortOrder;
        return this;
    }
    public LTS_SoqlUtil build() {
        buildResultFields();
        buildFromTable();
        buildSearchFields();
        buildSortFields();

        return this;
    }
    private void buildResultFields() {
        String fieldsText = '';

        for (String fieldName : resultFieldsNames) {
            fieldsText += ', ' + fieldName;
        }
        this.queryString += 'SELECT' + fieldsText.substring(1);
    }
    private void buildFromTable() {
        this.queryString += ' ' + 'FROM' + ' ' + tableName;
    }
    private void buildSearchFields() {
        String searchText = '';

        searchText += buildTextSearchFields();
        searchText += buildPickSearchFields();
        searchText += buildPickSearchFieldsWithValuesList();
        this.queryString += ' WHERE' + searchText.removeEnd(' AND');
    }
    private String buildTextSearchFields() {
        String searchText = '';

        for (String fieldName : searchTextFieldsWithValues.keySet()) {
            if (!String.isEmpty(searchTextFieldsWithValues.get(fieldName))) {
                searchText += ' ' + fieldName + ' LIKE \'' + searchTextFieldsWithValues.get(fieldName) + '%\' AND';
            } else {
                searchText += ' (' + fieldName + ' LIKE \'%%\' OR ' + fieldName + ' = null) AND';
            }
        }
        return searchText;
    }
    private String buildPickSearchFields() {
        String searchText = '';

        for (String fieldName : searchPickFieldsWithValues.keySet()) {
            searchText += ' ' + fieldName + ' IN (\'' + searchPickFieldsWithValues.get(fieldName) + '\') AND';
        }
        return searchText;
    }
    private String buildPickSearchFieldsWithValuesList() {
        String searchText = '';
        for (String fieldName : searchPickFieldsWithValuesList.keySet()) {
            searchText += ' ' + fieldName + ' IN (\'';
            searchText += String.join(searchPickFieldsWithValuesList.get(fieldName), '\',\'');
            searchText += '\') AND';
        }

        return searchText;
    }
    private void buildSortFields() {
        String sortText = '';

        if (sortFieldsNames.isEmpty()) {
            return;
        }
        for (String fieldName : sortFieldsNames) {
            sortText += fieldName + ' ' + sortOrder + ', ';
        }
        this.queryString += ' ORDER BY ' + sortText.removeEnd(', ') + ' LIMIT 1000';
    }
}