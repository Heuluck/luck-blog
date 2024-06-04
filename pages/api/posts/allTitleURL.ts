import { GETArticleURLResponseData } from "@/pages/types/api";
import pool from "@/utils/database";
import type { NextApiRequest, NextApiResponse } from "next";

export default function posts(request: NextApiRequest, response: NextApiResponse<GETArticleURLResponseData>) {
    if (request.method === "GET") {
        pool.query("SELECT titleURL FROM articles", function (err, results, fields) {
            if (err) {
                console.log("\x1B[31m%s\x1B[0m", "[SQL ERROR]", err.message);
                response.status(500).json({ code: 500, message: "[DATABASE ERROR] - Please check the logs" });
                return;
            }
            response.json({ code: 200, message: "查询成功", data: results as { titleURL: string }[] });
            return;
        });
    } else {
        response.status(404).json({ code: 404, message: "Not Found" });
    }
}
