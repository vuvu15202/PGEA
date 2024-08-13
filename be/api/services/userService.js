const _ = require("@sailshq/lodash");
let checkRoleEqual = function (role1, role2) {
  return (
    JSON.stringify(role1.sort((a, b) => a - b)) ===
    JSON.stringify(role2.sort((a, b) => a - b))
  );
};
module.exports = {
  checkPermissionOnCreateUser: async function (
    sessionUser,
    userTypeId,
    userRoleId
  ) {
    try {
      let sessionUserType = sessionUser.userType;
      if (typeof sessionUserType === "number") {
        sessionUserType = await UserType.findOne({
          id: sessionUserType,
        });
      }

      if (!sessionUserType || typeof sessionUserType !== "object") {
        //Người dùng đang đăng nhập không xác định được hạng người dùng
        return false;
      }

      if (
        !userTypeId ||
        !sessionUserType.ruleViewUserType.includes(userTypeId)
      ) {
        // check buộc người dùng tạo mới phải thuộc 1 dạng người dùng nào đó để có 1 list role default
        return false;
      }
      if (_.intersection(sessionUserType.ruleIgnoreRole, userRoleId).length) {
        //check xem role add thêm có hợp lệ không. Hợp lệ là các role nằm ngoài ruleIgnoreRole
        return false;
      }

      return true;
    } catch (error) {
      log.error(error);
      return false;
    }
  },

  checkPermissionOnUpdateUser: async function (
    sessionUser,
    modifyUserId,
    newModifyUserTypeId,
    newModifyUserRoleId
  ) {
    try {
      let modifyUser = await User.findOne({
        id: modifyUserId,
        isDelete: false,
      });
      let sessionUserType = sessionUser.userType;
      if (typeof sessionUserType === "number") {
        sessionUserType = await UserType.findOne({
          id: sessionUserType,
        });
      }
      if (
        !sessionUserType ||
        typeof sessionUserType !== "object" ||
        !modifyUser
      ) {
        //Người dùng đang đăng nhập/người dùng cần cập nhật không xác định được đủ thông tin cần thiết
        return false;
      }

      if (!newModifyUserRoleId) {
        newModifyUserRoleId = [];
      }

      if (
        newModifyUserRoleId.length &&
        !checkRoleEqual(newModifyUserRoleId, modifyUser.roleId) &&
        _.intersection(sessionUserType.ruleIgnoreRole, newModifyUserRoleId)
          .length
      ) {
        //role mới và role cũ khác nhau và role mới có phần nằm trong danh sách cấm cấp quyền của người dùng đang đăng  nhập
        return false;
      }
      if (
        sessionUserType.ruleOnlyViewCreatedBy &&
        modifyUser.createdBy !== sessionUser.id
      ) {
        //NGười dùng đang đăng nhập chỉ được phép sửa thông tin những người dùng do chính mình tạo ra.
        // console.log({ modifyUser, sessionUser })
        return false;
      }
      if (!newModifyUserTypeId) {
        newModifyUserTypeId = modifyUser.userType;
      }
      if (
        newModifyUserTypeId !== modifyUser.userType &&
        !sessionUser.userType.ruleViewUserType.includes(newModifyUserTypeId)
      ) {
        //Quyền cấp mới nắm ngoài quyền người đăng nhập được phép cấp và quyền cấp mới khác quyền cũ
        return false;
      }
      return true;
    } catch (error) {
      log.error(error);
      return false;
    }
  },
};
