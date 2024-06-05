import { GETArticleURLResponseData } from "@/pages/types/api";
import dbQuery from "@/utils/connection";
import pool from "@/utils/database";
import type { NextApiRequest, NextApiResponse } from "next";

export default function posts(request: NextApiRequest, response: NextApiResponse<GETArticleURLResponseData>) {
    if (request.method === "GET") {
        dbQuery(
            "SELECT * FROM articles",
            [],
            (results, fields) => {
                response.json({ code: 200, message: "查询成功", data: results as { titleURL: string }[] });
            },
            (err) => {
                response.status(500).json({ code: 500, message: "[DATABASE ERROR] - Please check the logs" });
            }
        );
    } else {
        response.status(404).json({ code: 404, message: "Not Found" });
    }
}
