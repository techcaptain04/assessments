"use client";

import { useBlogs } from "@/hooks/blog";
import FeedCard from "./feed-card";

const BlogFeed = () => {
    const { data, isLoading } = useBlogs();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6">
            {data.map((blog: any) => (
                <FeedCard key={blog.id} post={blog} />
            ))}
        </div>
    );
}

export default BlogFeed;