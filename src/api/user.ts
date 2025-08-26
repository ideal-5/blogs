import { http } from '@/utils/request'

export function fetchBlogList() {
    return http.get<string>('/user', { id: 1 })
}
