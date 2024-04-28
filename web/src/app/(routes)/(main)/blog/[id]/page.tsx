import { getArticle } from "@/services/core/blog";
import { NextPage } from "next";
import { redirect } from "next/navigation"
import { toast } from "sonner";


const BlogPage = async ({ params }: {
    params: {
        id: string;
    }
}) => {
    const data = await getArticle(params.id);

    return (
        <div>
            <h1 className="text-7xl">{data?.title}</h1>
            <hr className="mb-4"/>
            <div dangerouslySetInnerHTML={{
                __html: data?.content ?? ""
            }}/>
        </div>
    )
}

export default BlogPage;