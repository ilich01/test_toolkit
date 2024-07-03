import React from 'react'
import { RepositoryDetails } from '../types'
interface RepositoryCardProps {
  repository: RepositoryDetails
}
const RepositoryCard: React.FC<RepositoryCardProps> = ({ repository }) => {
  console.log('Репозиторий', repository)
  return (
    <div>
      <h2>
        {repository.name} - {repository.stargazers.totalCount} stars - {new Date(repository.updatedAt).toLocaleDateString()}
      </h2>
      <div>
        {repository.owner.avatarUrl && <img src={repository.owner.avatarUrl} alt={repository.owner.login} />}
        <a href={repository.owner.url}>{repository.owner.login}</a>
      </div>
      <div>
        <h3>Languages</h3>
        <ul>
          {repository.languages.nodes.map((language) => (
            <li key={language.id}>{language.name}</li>
          ))}
        </ul>
      </div>
      <h4>Des</h4>
      <p>{repository.description}</p>
    </div>
  )
}

export default RepositoryCard
