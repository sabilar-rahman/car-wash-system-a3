"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const buildQuery = (modelQuery, query, searchAbleFields) => __awaiter(void 0, void 0, void 0, function* () {
    // searchQuery
    let queryConstructor = modelQuery.find();
    let searchTerm = '';
    if (query === null || query === void 0 ? void 0 : query.searchTerm) {
        searchTerm = query === null || query === void 0 ? void 0 : query.searchTerm;
        queryConstructor = queryConstructor.find({
            $or: searchAbleFields.map(field => ({
                [field]: { $regex: searchTerm, $options: 'i' },
            })),
        });
    }
    //filter query
    const queryObj = Object.assign({}, query);
    const excludesFields = [
        'searchTerm',
        'sort',
        'limit',
        'page',
        'skip',
        'fields',
    ];
    excludesFields.forEach(ele => delete queryObj[ele]);
    queryConstructor = queryConstructor.find(queryObj);
    //sort query
    let sort = '-createdAt';
    if (query === null || query === void 0 ? void 0 : query.sort) {
        sort = (query === null || query === void 0 ? void 0 : query.sort).split(',').join(' ');
        queryConstructor = queryConstructor.sort(sort);
    }
    //paginate query
    let limit = 1;
    let page = 1;
    let skip = 0;
    if (query === null || query === void 0 ? void 0 : query.limit) {
        limit = Number(query === null || query === void 0 ? void 0 : query.limit);
        queryConstructor = queryConstructor.limit(limit);
    }
    if (query === null || query === void 0 ? void 0 : query.page) {
        page = Number(query === null || query === void 0 ? void 0 : query.page);
        skip = (page - 1) * limit;
        queryConstructor = queryConstructor.skip(skip);
    }
    //fields filtering
    let fields = '-__v';
    if (query === null || query === void 0 ? void 0 : query.fields) {
        fields = (query === null || query === void 0 ? void 0 : query.fields).split(',').join(' ');
        queryConstructor = queryConstructor.select(fields);
    }
    return queryConstructor;
});
exports.default = buildQuery;
