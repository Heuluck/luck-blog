import { Article, GETArticleResponseData } from "@/pages/types/api";
import dbQuery from "@/utils/connection";
import pool from "@/utils/database";
import type { NextApiRequest, NextApiResponse } from "next";

export default function posts(request: NextApiRequest, response: NextApiResponse<GETArticleResponseData>) {
    const { titleURL } = request.query;
    if (request.method === "GET") {
        dbQuery(
            "SELECT * FROM articles WHERE titleURL = ? LIMIT 1",
            [titleURL],
            (results, fields) => {
                results.constructor === Array && results.length > 0
                ? response.json({ code: 200, message: "查询成功", data: results[0] as Article })
                : response.json({ code: 404, message: "未找到该文章" });
            },
            (err) => {
                response.status(500).json({ code: 500, message: "[DATABASE ERROR] - Please check the logs" });
            }
        );
    } else {
        response.status(404).json({ code: 404, message: "Not Found" });
    }
}
