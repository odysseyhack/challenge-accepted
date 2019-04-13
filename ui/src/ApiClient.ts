import { adalApiFetch } from './adalConfig.js';
import { UserInput } from './types/User'
import { ContractPayload } from './types/Contract.js';

const apiUrl = (endpoint:string) => `https://abw3-ednabk-api.azurewebsites.net/api/v1/${endpoint}`;//applications;`

const apiUpload = `https://prod-16.westeurope.logic.azure.com/workflows/80c1cdc2b59845328a6f96d7688d3c6b/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=TIs_hOdfqQ0vlj9vzIDMHnAEpZ-5-a47bYtNuToXnSA`
const apiCreator = `https://prod-03.westeurope.logic.azure.com/workflows/ecd2b75dbfb14657bd5f1558844c1c93/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=VW4Ipcmjif77nykP90GeW2PZj0UmHJTPmu3hqdVcK9Q`

const callApi = (endpoint: string, options = {}) => {
  var url = apiUrl(endpoint);
  console.group('calling ', url);
  return adalApiFetch(fetch, url, options)
    .then(response => {
      console.log('response from fetch:', response);
      return response.json();
    })
    .then(json => {
      console.log('api call result as json:', json);
      console.groupEnd();
      return json;
    })
    .catch(r => {
      console.log('error:', r);
      console.groupEnd();
    });
};

const postApi = (endpoint: string, body: any) => callApi(endpoint, {
  method: 'POST',
  body: body,
  headers: {
    'Content-Type': 'application/json'
  }
});

const uploadApi = (endpoint: string, name:string, body: any) => {
  let data = new FormData();
  data.append('file', body);
  data.append('name', name);
  return fetch(endpoint, {
    method: 'post',
    headers: {'Content-Type':'multipart/form-data'},
    body: data
   })
   .catch((err) => {
    console.error(err);
   })
};

const createContractApi = (endpoint: string, payload: any) => {
  let data = new FormData();
  data.append( "json", JSON.stringify( payload ) );
  return fetch(endpoint, {
    method: 'post',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify( payload )
   })
   .catch((err) => {
    console.error(err);
   })
};


export const getApplications = () => callApi('applications').then(json => json.applications);
export const getApp = (appId:string) => callApi(`applications/${appId}`);
export const getWorkflow = (appId:string) => callApi(`applications/workflows/${appId}`);
export const getContract = (workflowId:string) => callApi(`contracts?workflowId=${workflowId}`);
export const getActions = (contractId:string) => callApi(`contracts/${contractId}/actions`);
export const postAction = (contractId:string, wfFunctionId:string, params:any) => postApi(`contracts/${contractId}/actions`, {
  workflowFunctionId:wfFunctionId,
  workflowActionParameters: params
});

// BLOB
export const uploadFile = (name:string, data: any) => uploadApi(apiUpload, name, data);

// USERS
export const getUsers = () => callApi('users');
export const getUserById = (userId: number) => callApi(`users/${userId}`);
export const addUser = (user: UserInput) => postApi('users', user);
export const usersMe = () => callApi('users/me');

// CONTRACTS
export const getContracts = () => callApi('contracts');
export const createContract = (data: ContractPayload) => createContractApi(apiCreator, data);
