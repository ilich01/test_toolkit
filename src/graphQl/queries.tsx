import { ApolloError, gql } from '@apollo/client'
import { client } from './apollo-client'

export const fetchRepositoriesAPI = async (searchTerm: string, page: number, after?: string | null | undefined) => {
  try {
    const { data } = await client.query({
      query: gql`
        query SearchRepositories($query: String!, $first: Int!, $after: String) {
          search(query: $query, type: REPOSITORY, first: $first, after: $after) {
            repositoryCount
            edges {
              cursor
              node {
                ... on Repository {
                  id
                  name
                  stargazers {
                    totalCount
                  }
                  updatedAt
                  owner {
                    login
                    url
                  }
                  url
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `,
      variables: {
        query: searchTerm || 'react',
        first: 10,
        after: after || null,
      },
    })
    console.log('Page:', page)
    return {
      repositories: data.search.edges.map((edge: any) => ({
        ...edge.node,
        cursor: edge.cursor,
      })),
      pageInfo: data.search.pageInfo,
    }
  } catch (error) {
    if (error instanceof ApolloError) {
    }
    throw new Error('Error fetching repositories')
  }
}

export const fetchRepositoryDetailsAPI = async (owner: string, name: string) => {
  try {
    const { data } = await client.query({
      query: gql`
        query ($owner: String!, $name: String!) {
          repository(owner: $owner, name: $name) {
            id
            name
            stargazers {
              totalCount
            }
            updatedAt
            owner {
              login
              avatarUrl
              url
            }
            languages(first: 10) {
              nodes {
                id
                name
              }
            }
            description
          }
        }
      `,
      variables: { owner, name },
    })
    return data.repository
  } catch (error) {
    throw new Error('Error fetching repository details')
  }
}
