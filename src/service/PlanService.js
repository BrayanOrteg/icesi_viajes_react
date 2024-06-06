import { request} from '../axios_helper';

class PlanService{

    registerPlan(code, description, name, numPeople, requestDate, startDate,  endDate, cost, clientId, userId){
        return request("POST","api/v1/plans/create",{id: Date.now(), code:code, description:description, name:name, numberOfPeople:numPeople,  status: 'Active', requestDate:requestDate, tripStartDate:startDate,  tripEndDate:endDate, totalCost:cost, client:clientId, user:userId}).then((response => response.data));
    }

    registerDetails(food,lodging,transport, transfers, cost,destinationId,modifyDate,daysNum,nightsNum){
        return request("POST","api/v1/plans/createdatails",{id: Date.now(), food:food,lodging:lodging,transport:transport, transfers:transfers, cost:cost,destination:destinationId, modifyate:modifyDate, status:'Active',numberOfNights:nightsNum, numberOfDays: daysNum}).then((response => response.data));
    }

    registerPlanDetails(planId, detailId){
        return request("POST","api/v1/plans/createplandatails",{id: Date.now(), planDetail:detailId, plan:planId}).then((response => response.data));
    }

    getPlans(){
        return request("GET","api/v1/plans/all",{}).then((response => response.data));
    }

    deletePlan(id){
        return request("POST", "api/v1/plans/deletePlan", id).then((response => response.data));

    }
    getSalesNum(){
        return request("GET","api/v1/plans/salesweek",{}).then((response => response.data));
    }

    getClientsNum(){
        return request("GET","api/v1/plans/clientsnum",{}).then((response => response.data));
    }

    getMoney(){
        return request("GET","api/v1/plans/money",{}).then((response => response.data));
    }

    getTopTypes(){
        return request("GET","api/v1/plans/topTypes",{}).then((response => response.data));
    }

    getTopDestinations(){
        return request("GET","api/v1/plans/topDestinations",{}).then((response => response.data));
    }

    getDetails(id){
        return request("POST","api/v1/plans/findDetail",id).then((response => response.data));
    }
}


export default new PlanService();