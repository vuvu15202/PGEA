export const isHasPermission = (userRoles = [], permissions = []) => {
  return userRoles.some(userRole => permissions.includes(userRole))
}
