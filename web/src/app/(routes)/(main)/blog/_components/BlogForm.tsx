'use client'

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import RTEditor from "@/components/ui/rt-editor";
import { usePostBlog } from "@/hooks/blog";
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const blogSchema = z.object({
    title: z.string().min(3),
    headline: z.string().min(5),
    content: z.string().min(10)
})

const BlogForm = () => {
    const router = useRouter();
    const { mutateAsync, isPending, reset: resetQuery } = usePostBlog();
    const form = useForm<z.infer<typeof blogSchema>>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: "",
            headline: "",
            content: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof blogSchema>) => {
        const res = await mutateAsync({
            content: data.content,
            headline: data.headline,
            title: data.title
        })
        resetQuery()
        form.reset()

        router.push("/")
    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="mb-2">
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Title" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="headline"
                    render={({ field }) => (
                        <FormItem className="mb-2">
                            <FormLabel>Headline</FormLabel>
                            <FormControl>
                                <Input placeholder="Headline" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem className="mb-2">
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <RTEditor {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button className="my-5" type="submit" disabled={isPending}>
                    {isPending ? (<>
                        Posting
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    </>) : "Post"}
                </Button>
                </form>
            </Form>
        </div>
    )
}

export default BlogForm;