import { getArticle } from "@/services/core/blog";
import BlogUpdateForm from "../../_components/BlogUpdateForm";
import { redirect } from "next/navigation";

const UpdateBlogPage = async ({
    params: { id },
}: {
    params: {
        id: string;
    };
}) => {
    const data = await getArticle(id);
    if (!data) {
        redirect("/blogs");
    }
    return (
        <div>
            <BlogUpdateForm post={data} />
        </div>
    );
}

export default UpdateBlogPage;