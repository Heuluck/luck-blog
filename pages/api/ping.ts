import type { NextApiRequest, NextApiResponse } from "next";
export default function ping(request: NextApiRequest, response: NextApiResponse) {
    response.json({ message: "pong!" });
}
