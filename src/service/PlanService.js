import { request} from '../axios_helper';

class PlanService{

    registerPlan(code, description, name, numPeople, requestDate, startDate,  endDate, cost, clientId, userId){
        return request("POST","api/v1/plans/create",{id: Date.now(), code:code, description:description, name:name, numberOfPeople:numPeople,  status: 'Active', requestDate:requestDate, tripStartDate:startDate,  tripEndDate:endDate, totalCost:cost, client:clientId, user:userId}).then((response => response.data));
    }
}


export default new PlanService();