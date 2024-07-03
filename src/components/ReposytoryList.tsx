import React from 'react'
import { Repository } from '../types'

interface RepositoryListProps {
  repositories: Repository[]
}
const ReposytoryList: React.FC<RepositoryListProps> = ({ repositories }) => {
  console.log('Репозитоии:', repositories)
  return (
    <div>
      <h1>Repositories: </h1>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>
            <a href={`/repository/${repo.owner.login}/${repo.name}`}>{repo.name}</a> - {repo.stargazers.totalCount} * stars -
            {new Date(repo.updatedAt).toLocaleDateString()} - <a href={repo.url}>GitHub</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ReposytoryList
