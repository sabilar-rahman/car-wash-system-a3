"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (err) => {
    const statusCode = 400;
    const message = 'Validation Error';
    const errorSources = Object.values(err === null || err === void 0 ? void 0 : err.errors).map(val => {
        return {
            path: val === null || val === void 0 ? void 0 : val.path,
            message: val === null || val === void 0 ? void 0 : val.message,
        };
    });
    return {
        statusCode,
        message,
        errorSources,
    };
};
exports.default = handleValidationError;
