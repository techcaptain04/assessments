import { API } from '.'

export const getArticles = async () => {
    try {
        const response = await API.get('/blogs/')
        if (response.data) {
            const data = response.data as any;
            return data.data;
        }
    } catch (error) {
        console.error(error)
    }
}

export const getArticle = async (id: string) => {
    try {
        const response = await API.get<IArticle>(`/blogs/${id}`)
        if (response.status === 404) {
            return null;
        }

        if (response.data) {
            const data = response.data;
            return data;
        }
    } catch (error) {
        console.error(error)
    }
}

export const postArticle = async (data: IArticle) => {
    try {
        const response = await API.post('/blogs/', data)
        if (response.data) {
            const data = response.data as any;
            return data.data;
        }
    } catch (error) {
        console.error(error)
    }
}

export const putArticle = async (data: IArticle) => {
    try {
        const response = await API.put(`/blogs/${data.id}`, data)
        if (response.data) {
            const data = response.data;
            return data as IArticle;
        }
    } catch (error) {
        console.error(error)
    }
}