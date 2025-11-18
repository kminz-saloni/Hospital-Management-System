var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BASE_URL = "http://localhost:4000/api/";
export function get(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(BASE_URL + url);
        return yield res.json();
    });
}
export function post(url, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(BASE_URL + url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        if (!res.ok) {
            const err = yield res.json();
            throw err;
        }
        return yield res.json();
    });
}
export function del(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fetch(BASE_URL + url, { method: "DELETE" });
    });
}
