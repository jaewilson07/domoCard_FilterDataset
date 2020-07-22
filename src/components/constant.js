export const HAS_ERROR = 'HAS_ERROR';

export const API = 'API';
export const API_START = 'API_START';
export const API_END = 'API_END';
export const API_ERROR = 'API_ERROR';

export const SET_STORES = 'SET_STORES';
export const GET_STORES = 'GET_STORES';

export const SET_DATE = 'SET_DATE';
export const POST_DATE = 'POST_DATE';

export const COLLECTION = {
  APP_STATE: 'app_state',
};

COLLECTION.DOCUMENTS = `/domo/datastores/v1/collections/${COLLECTION.APP_STATE}/documents/`;
COLLECTION.UPDATE_TYPE = { POST: 'POST', PUT: 'PUT' };

export const UPDATE_DOCUMENT = 'UPDATE_DOCUMENT';
export const UPDATE_DATE = 'UPDATE_DATE';
export const UPDATE_USER = 'UPDATE_USER';

export const GET_STATE_PENDING = 'GET_STATE_PENDING';
export const GET_STATE_SUCCESS = 'GET_STATE_SUCCESS';
export const GET_STATE_ERROR = 'GET_STATE_ERROR';
export const GET_STATE_END = 'GET_STATE_END';
