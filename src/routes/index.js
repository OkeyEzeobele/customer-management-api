import signup from './signup';
import login from './login';
import securitypin from './securitypin'

import createAdmin from './createAdmin';
import adminLogin from './adminLogin';


import personalInfo from './personalInfo';
import manageDocumentInfo from './manageDocumentInfo';
import addressInfo from './addressInfo';
import employerInfo from './employerInfo';
import checkRequiredInfo from './checkRequiredInfo';

import checkAuthStatus from './checkAuthStatus';
import checkAdminAuthStatus from './checkAdminAuthStatus';
import getAddressInfo from './getAddressInfo';
import getDocumentInfo from './getDocumentInfo';
import getPersonalInfo from './getPersonalInfo';
import getEmployerInfo from './getEmployerInfo';
import expireUserInfo from './expireUserInfo';
import blockUser from './blockUser';


import getCountries from './getCountries';



import adminDownload from './adminDownload';

import adminExpireProfileSegment from './adminExpireProfileSegment';

import adminCountCustomers from './adminCountCustomers';
import adminFetchCustomers from './adminFetchCustomers';
import adminGetCustomerDetails from './adminGetCustomerDetails';

import adminFetchAdmins from './adminFetchAdmins';

import deleteUser from './adminDeleteUser';

export default (router) => {
  // AUTH
  signup(router);
  login(router);
  securitypin(router);
  getCountries(router);
  checkAuthStatus(router);


  // Profile
  personalInfo(router);
  manageDocumentInfo(router);
  addressInfo(router);
  employerInfo(router);
  checkRequiredInfo(router);
  getAddressInfo(router);
  getDocumentInfo(router);
  getPersonalInfo(router);
  getEmployerInfo(router);
  expireUserInfo(router);

  // Admin
  adminDownload(router);
  createAdmin(router);
  adminLogin(router);
  checkAdminAuthStatus(router);

  adminFetchCustomers(router);
  adminFetchAdmins(router);

  adminGetCustomerDetails(router);

  adminCountCustomers(router);
  blockUser(router);
  adminExpireProfileSegment(router);

  deleteUser(router)
};
