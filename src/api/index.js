import request from "@/utils/request";

// 列表
export function queryList(params) {
    return request({
        url: "/api",
        method: "get",
        params
    });
}
