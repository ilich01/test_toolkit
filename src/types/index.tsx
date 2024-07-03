export interface Repository {
  [x: string]: any
  id: string
  name: string
  stargazersCount: number
  updatedAt: string
  owner: {
    htmlUrl: string | undefined
    avatarUrl: string
    login: string
    url: string
  }
  htmlUrl: string
}

export interface RepositoryDetails extends Repository {
  languages: {
    nodes: { id: string; name: string }[]
  }
  description: string
}
export interface PageInfo {
  hasNextPage: boolean
  endCursor: string | null
}
