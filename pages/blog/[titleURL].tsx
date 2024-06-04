import axios from "axios";
import Head from "next/head";
import { Article } from "@/pages/types/api";
import { Preview } from "@/Components/BlogIndex/preview";
import "./style.css"; //import tailwind
import Header from "@/Components/Header/header";
import Markdown from "react-markdown";
import dayjs from "dayjs";

interface BlogProps {
    post: Article;
    errMsg: string;
}

function Blog({ post, errMsg }: BlogProps) {
    return (
        <div className="flex min-h-screen flex-col items-center w-full justify-center bg-slate-300">
            <Head>
                <title>虚假的博客</title>
            </Head>
            <Header isFixed={false} className="mt-20"></Header>
            <div className="w-full md:w-9/12 mb-auto">
                {/* 错误信息 */}
                {errMsg && <div className="text-red-500 text-center">{errMsg}</div>}
                {typeof post === "object" && (
                    <div className="flex flex-col bg-slate-200 opacity-85 rounded-xl m-9 p-8 transition-all mb-10">
                        <div className="">
                            <div className="">
                                <h2 className="text-2xl font-bold text-center">{post.title}</h2>
                                <h2 className="text-gray-500 text-sm mt-4 text-center">
                                    <Markdown
                                        className="inline-block"
                                        components={{
                                            a: ({ children, href }) => (
                                                <a href={href} target="blank" className="text-blue-500 hover:underline">
                                                    {children}
                                                </a>
                                            ),
                                        }}>
                                        {post.username}
                                    </Markdown>
                                    &nbsp;&nbsp;{dayjs(post.lastUpdate).format("YYYY年MM月DD日 HH:mm")}
                                </h2>
                            </div>
                            <div className="w-full mt-2 px-9">
                                <Markdown
                                    components={{
                                        h1: ({ children }) => <h1 className="text-3xl font-bold my-9">{children}</h1>,
                                        h2: ({ children }) => <h2 className="text-2xl font-bold my-9">{children}</h2>,
                                        h3: ({ children }) => <h3 className="text-xl font-bold my-9">{children}</h3>,
                                        h4: ({ children }) => <h4 className="text-lg font-bold my-9">{children}</h4>,
                                        h5: ({ children }) => <h5 className="text-base font-bold my-9">{children}</h5>,
                                        p: ({ children }) => <p className="my-7 indent-8">{children}</p>,
                                        a: ({ children, href }) => (
                                            <a target="blank" href={href} className="text-blue-500 hover:underline">
                                                {children}
                                            </a>
                                        ),
                                    }}>
                                    {post.content}
                                </Markdown>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export async function getStaticPaths() {
    try {
        const res = await axios.get(`http://localhost:3000/api/posts/allTitleURL`);
        const blogTitles = res.data.data;
        const paths = blogTitles.map((blogTitle: { titleURL: string }) => ({
            params: { titleURL: blogTitle.titleURL },
        }));
        return { paths, fallback: "blocking" };
    } catch (err) {
        if (axios.isAxiosError(err)) console.log(err.message + ": " + err.response?.data.message ?? err.message);
        else {
            console.log(err);
        }
        return { paths: [], fallback: true };
    }
}

interface param {
    params: { titleURL: string };
}

// 此函数在构建时被调用
export async function getStaticProps({ params }: param) {
    try {
        const res = await axios.get(`http://localhost:3000/api/posts/${params.titleURL}`);
        const posts = res.data.data;

        return {
            props: {
                post: posts ?? { title: "页面走丢啦", content: "返回文章列表看看其他的呗" },
            },
        };
    } catch (err) {
        if (axios.isAxiosError(err))
            return {
                props: {
                    errMsg: err.message + ": " + err.response?.data.message ?? err.message,
                },
            };
        else
            return {
                props: {
                    errMsg: err,
                },
            };
    }
}

export default Blog;
