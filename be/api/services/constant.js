module.exports = {
    PASSWORD_REGEX: /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/, //Mật khẩu phải bao gồm cả chữ và số đồng thời ít nhất 6 ký tự!
    ACCOUNT_REGEX: /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9])+[a-zA-Z0-9]$/, //Tài khoản chứa ký tự không hợp lệ hoặc chưa đủ 3 ký tự!
    ALLOW_LANGUAGE: ['vi', 'en'],
    PHONE_REGEX: /^(09|08|07|03|05)\d{8}$|^02\d{9}$|^\+\d{1,3}\d{9,10}$/
}

// '0912345678',     // Số di động Việt Nam
//   '02123456789',    // Số cố định Việt Nam
//   '+84123456789',   // Số quốc tế
//   '0812345678',     // Số di động Việt Nam
//   '0712345678',     // Số di động Việt Nam
//   '+12025550123',   // Số quốc tế