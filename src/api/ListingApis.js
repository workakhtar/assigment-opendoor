import {apiRequest} from "../services/apiRequest";

export const PropertListing = {
    getListing: async () =>  await apiRequest('get', "/get-listings"),
    
   
  };