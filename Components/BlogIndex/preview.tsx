import { useRouter } from "next/router";
import Markdown from "react-markdown";

export function Preview(props: { title: string; content: string; titleURL: string }) {
    const router = useRouter();
    return (
        <div
            onClick={() => {
                router.push(`/blog/${props.titleURL}`);
            }}
            className="flex flex-col bg-slate-200 opacity-85 rounded-xl m-9 p-8 hover:shadow-lg hover:opacity-70 transition-all cursor-pointer">
            <div className="">
                <div className="">
                    <h2 className="text-2xl font-bold">{props.title}</h2>
                </div>
                <div className="overflow-hidden overflow-ellipsis whitespace-nowrap w-full line-clamp-1">
                    <Markdown>{props.content}</Markdown>
                </div>
            </div>
        </div>
    );
}
