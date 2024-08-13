/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  '*': ['getUserInfo', 'isAuthen', 'checkPermissionn', 'pageIdd', 'captcha'],
  'auth/create-captcha': true,
  // 'auth/sign-in/account': true,//['captcha'],
  'auth/sign-in/refresh-token': ['getUserInfo', 'isAuthen'],
  'file/delete-file': true,
  // 'admin/refresh-conf': true,
  // 'admin/reset-cache': true,


  // 'auth/register': true,-
  'auth/sign-in/account-google-federated': true,
  'auth/sign-in/account-google-redirect': true,
  // 'auth/google': true,
  // 'auth/googlecallback': true,



  // // 'file-management/upload-image': ['getUserInfo', 'isAuthen'],
  // // 'file-management/download-file': true,
  // // 'file-management/upload-file': ['getUserInfo', 'isAuthen'],
  // // 'ShortLinkController': {
  // //   'redirect': true
  // // },
  // // 'PageController': {
  // //   'find': true,
  // //   'create': true,
  // //   'update': true,
  // //   'destroy': true
  // // },
  // // 'booking-management/payment-callback': true,

   'admin/get-meta': true,
   'admin/get-fe-conf': true,
  // // 'migrate': true,

  // 'user/*': true,
};