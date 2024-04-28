import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import * as time from "@/lib/time";
import Link from "next/link";
import { useMemo, useState } from "react"; // Import useState

const FeedCard = ({
    post
}: {
    post: IArticle;
}) => {

    const date = useMemo(() => {
        return time.dateToString(post.updated_at ?? new Date(), "DD MMM YYYY");
    }, [post.updated_at]);

    return (
        <Card className={`hover:shadow-xl transition-shadow`}>
            <CardHeader>
                <span className="text-sm font-bold">{date}</span>
            </CardHeader>
            <CardContent>
                <div className="mb-3">
                    <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                    <CardDescription>{post.headline}</CardDescription>
                </div>
                <Link href={`/blog/${post.id}`}>
                    <Button>Read more</Button>
                </Link>
            </CardContent>
        </Card>
    );
};

export default FeedCard;