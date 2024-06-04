import pool from "@/utils/database";
import axios, { AxiosError } from "axios";
import Head from "next/head";
import { Article } from "@/pages/types/api";
import { Preview } from "@/Components/BlogIndex/preview";
import "./style.css";

interface BlogProps {
    posts: Article[];
    errMsg: string;
}

function Blog({ posts,errMsg }: BlogProps) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-300">
            <Head>
                <title>虚假的博客</title>
            </Head>
            <h1 className="text-3xl transition-all hover:font-bold font-sans">最近文章</h1>
            <div className="w-full">
                {errMsg && <div className="text-red-500">{errMsg}</div>}
                {posts.constructor === Array &&
                    posts.map((post, index) => <Preview key={index} title={post.title} content={post.content} />)}
            </div>
        </div>
    );
}

// 此函数在构建时被调用
export async function getStaticProps() {
    try {
        const res = await axios.get("http://localhost:3000/api/posts");
        const posts = res.data.data;

        return {
            props: {
                posts: posts,
            },
        };
    } catch (err) {
        if(axios.isAxiosError(err))
            return {
                props: {
                    errMsg: err.message,
                },
            };
        // console.log(err);
        return {
            props: {
                posts: err,
            },
        };
    }
}

export default Blog;
