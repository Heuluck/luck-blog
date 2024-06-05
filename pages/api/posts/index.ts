import { Article, PostResponseData } from "@/pages/types/api";
import dbQuery from "@/utils/connection";
import dayjs from "dayjs";
import type { NextApiRequest, NextApiResponse } from "next";

export default function posts(request: NextApiRequest, response: NextApiResponse<PostResponseData>) {
    if (request.method === "GET") {
        dbQuery(
            "SELECT * FROM articles",
            [],
            (results, fields) => {
                response.json({ code: 200, message: "查询成功", data: results as Article[] });
            },
            (err) => {
                response.status(500).json({ code: 500, message: "[DATABASE ERROR] - Please check the logs" });
            }
        );
    } else if (request.method === "POST") {
        const { username, title, content, titleURL } = request.body;
        dbQuery(
            "INSERT INTO articles (id, lastUpdate, username, title, content, titleURL) VALUES (NULL, ?, ?, ?, ?, ?)",
            [dayjs().format(), username, title, content, titleURL],
            () => {
                response.json({ code: 200, message: "发布成功" });
            },
            (err) => {
                response.status(500).json({ code: 500, message: "[DATABASE ERROR] - Please check the logs" });
            }
        );
    } else {
        response.status(404).json({ code: 404, message: "Not Found" });
    }
}
