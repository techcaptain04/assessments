import * as blogAPI from "@/services/core/blog"
import { QueryKeys } from "@/utils/use-query"
import { useMutation, useQuery } from "@tanstack/react-query"


export const useBlogs = () => {
    const blogsRes = useQuery({
        queryKey: [QueryKeys.BLOGS],
        queryFn: blogAPI.getArticles
    })

    return blogsRes
}


export const usePostBlog = () => useMutation({
    mutationFn: async (data: IArticle) => await blogAPI.postArticle(data),
    onSuccess: (data) => {
        console.log("Blog created")
        return data;
    },
    onError: (error) => {
        console.error(error)
    }
})

export const useUpdateBlog = () => useMutation({
    mutationFn: async (data: IArticle) => await blogAPI.putArticle(data),
    onSuccess: (data) => {
        console.log("Blog updated")
        return data;
    },
    onError: (error) => {
        console.error(error)
    }
})