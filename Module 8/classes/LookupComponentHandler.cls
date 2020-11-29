public with sharing class LookupComponentHandler {
    public LookupComponentHandler() {

    }

    @AuraEnabled(Cacheable = true)
    public static List<Account> searchAccounts(String searchStr){
        searchStr = searchStr + '%';
        return [SELECT Id, Name, AccountNumber, Type, Industry FROM Account WHERE Name LIKE :searchStr];
    }

    @AuraEnabled(Cacheable = true)
    public static List<Contact> getContacts(String accId){
        return [SELECT Id, Name, Title, Email, Phone FROM Contact WHERE AccountId = :accId];
    }
}
