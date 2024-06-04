import { Article, PostResponseData } from "@/pages/types/api";
import pool from "@/utils/database";
import dayjs from "dayjs";
import type { NextApiRequest, NextApiResponse } from "next";

export default function posts(request: NextApiRequest, response: NextApiResponse<PostResponseData>) {
    if (request.method === "GET") {
        pool.query("SELECT * FROM articles", function (err, results, fields) {
            if (err) {
                console.log("\x1B[31m%s\x1B[0m", "[SQL ERROR]", err.message);
                response.status(500).json({ code: 500, message: "[DATABASE ERROR] - Please check the logs" });
                return;
            }
            response.json({ code: 200, message: "查询成功", data: results as Article[] });
            return;
        });
    } else if (request.method === "POST") {
        const { username, title, content } = request.body;
        pool.query(
            "INSERT INTO articles (id, lastUpdate, username, title, content) VALUES (NULL, ?, ?, ?, ?)",
            [dayjs().format(), username, title, content],
            function (err, results, fields) {
                if (err) {
                    console.log("\x1B[31m%s\x1B[0m", "[SQL ERROR]", err.message);
                    response.status(500).json({ code: 500, message: "[DATABASE ERROR] - Please check the logs" });
                    return;
                }
            }
        );
        response.json({ code: 200, message: "success" });
    } else {
        response.status(404).json({ code: 404, message: "Not Found" });
    }
}
