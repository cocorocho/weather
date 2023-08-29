export const useApiFetch = (url: any, opts: any) => {
    const config = useRuntimeConfig()

    return useFetch(url, { baseURL: config.public.API_URL, ...opts })
}