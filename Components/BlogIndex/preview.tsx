import Markdown from "react-markdown";

export function Preview(props: { title: string; content: string }) {
    return (
        <div className="flex flex-col bg-slate-200 rounded-xl m-9 p-16 hover:scale-105 transition-all">
            <div className="">
                <div className="">
                    <h1 className="text-3xl font-bold underline">{props.title}</h1>
                </div>
                <div className="">
                    <Markdown>{props.content}</Markdown>
                </div>
            </div>
        </div>
    );
}
