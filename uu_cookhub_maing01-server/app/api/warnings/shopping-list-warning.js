const Errors = require("../errors/shopping-list-error");

const Warnings = {
  Create: {
    UnsupportedKeys: {
      code: `${Errors.Create.UC_CODE}unsupportedKeys`,
      message: "DtoIn contains unsupported keys.",
    },
  },
  Get: {
    UnsupportedKeys: {
      code: `${Errors.Get.UC_CODE}unsupportedKeys`,
      message: "DtoIn contains unsupported keys.",
    },
  },
  Update: {
    UnsupportedKeys: {
      code: `${Errors.Update.UC_CODE}unsupportedKeys`,
      message: "DtoIn contains unsupported keys.",
    },
  },
};

module.exports = Warnings;
