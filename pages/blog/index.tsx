import axios from "axios";
import Head from "next/head";
import { Article } from "@/pages/types/api";
import { Preview } from "@/Components/BlogIndex/preview";
import "./style.css"; //import tailwind
import Header from "@/Components/Header/header";

interface BlogProps {
    posts: Article[];
    errMsg: string;
}

function Blog({ posts, errMsg }: BlogProps) {
    return (
        <div className="flex min-h-screen flex-col items-center w-full justify-center bg-slate-300">
            <Head>
                <title>虚假的博客</title>
            </Head>
            <Header></Header>
            <div className="w-full md:w-1/2">
                {/* 错误信息 */}
                {errMsg && <div className="text-red-500 text-center">{errMsg}</div>}
                {typeof posts === "object" &&
                    posts.constructor === Array &&
                    posts.map((post, index) => <Preview titleURL={post.titleURL} key={index} title={post.title} content={post.content} />)}
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
        if (axios.isAxiosError(err))
            return {
                props: {
                    errMsg: err.message + ": " + err.response?.data.message ?? err.message,
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
