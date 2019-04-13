import { adalApiFetch } from './adalConfig.js';
import { UserInput } from './types/User'

const apiUrl = (endpoint:string) => `https://abw1-g5anlr-api.azurewebsites.net/api/v1/${endpoint}`;//applications;`

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


export const getApplications = () => callApi('applications').then(json => json.applications);
export const getApp = (appId:string) => callApi(`applications/${appId}`);
export const getWorkflow = (appId:string) => callApi(`applications/workflows/${appId}`);
export const getContract = (workflowId:string) => callApi(`contracts?workflowId=${workflowId}`);
export const getActions = (contractId:string) => callApi(`contracts/${contractId}/actions`);
export const postAction = (contractId:string, wfFunctionId:string, params:any) => postApi(`contracts/${contractId}/actions`, {
  workflowFunctionId:wfFunctionId,
  workflowActionParameters: params
});

// USERS
export const getUsers = () => callApi('users');
export const getUserById = (userId: number) => callApi(`users/${userId}`);
export const addUser = (user: UserInput) => postApi('users', user);
export const usersMe = () => callApi('users/me');

// CONTRACTS
export const getContracts = () => callApi('contracts');