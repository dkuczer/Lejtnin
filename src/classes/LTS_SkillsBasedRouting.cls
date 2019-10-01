/**
 * Created by BRITENET on 17.09.2019.
 */

Global class LTS_SkillsBasedRouting {
    @ InvocableMethod
    public static void routeUsingSkills(List<String> cases) {

        List<Case> caseObjects = [SELECT Id, Description FROM Case WHERE Id in :cases];

        System.debug('TUTAJ JESZCZE DZIALAM');
        System.debug('CASES IDS: ' + cases);
        System.debug('CASE OBJS' + caseObjects);

        for (Case caseObj : caseObjects) {
            // Add SkillsBased PendingServiceRouting
            System.debug(' a tutaj????');
            PendingServiceRouting psrObj = new PendingServiceRouting(
                    CapacityWeight = 1,
                    IsReadyForRouting = FALSE,
                    RoutingModel  = 'MostAvailable',
                    RoutingPriority = 1,
                    RoutingType = 'SkillsBased',
                    ServiceChannelId = getChannelId('Omni_Setup_Flow_Cases'),
                    WorkItemId = caseObj.Id
            );
            System.debug('TUTAJ JESZCZE TEZ');
            insert psrObj;
            psrObj = [select id, IsReadyForRouting from PendingServiceRouting where id = : psrObj.id];

            // Now add SkillRequirement(s)
            SkillRequirement srObj = new SkillRequirement(
                    RelatedRecordId = psrObj.id,
                    SkillId = getSkillId(caseObj.Description),
                    SkillLevel = 5
            );
            insert srObj;

            // Update PendingServiceRouting as IsReadyForRouting
            psrObj.IsReadyForRouting = TRUE;
            update psrObj;
        }
        return;
    }

    public static String getChannelId(String channelName) {
        System.debug('METODA SIE WYKONUJE JOL');
        ServiceChannel channel = [Select Id From ServiceChannel Where DeveloperName = :channelName];
        System.debug('BEDZIE RETURN Z METODY');
        return channel.Id;
    }

    public static String getSkillId(String caseDescription) {
        String skillName = 'Multiskill';
        if (caseDescription != null) {
            if (caseDescription.contains('claim')) {
                skillName = 'Claims';
            } else if (caseDescription.contains('?')) {
                skillName = 'Technical';
            }
        }

        Skill skill = [Select Id From Skill Where DeveloperName = :skillName];
        return skill.Id;
    }
}