import { useEffect } from 'react'
import RepositoryCard from '../components/ReposytoryCard'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRepositoryDetails, selectRepositoryDetails } from '../redux/slices/repositoriesSlice'
import { AppDispatch } from '../redux/store'

const RepositoryPage = () => {
  const { owner, name } = useParams<{ owner: string; name: string }>()
  const dispatch: AppDispatch = useDispatch()
  const repositoryDetails = useSelector(selectRepositoryDetails)
  useEffect(() => {
    if (owner && name) {
      dispatch(fetchRepositoryDetails({ owner, name }))
    }
  }, [dispatch, owner, name])
  return <div>{repositoryDetails ? <RepositoryCard repository={repositoryDetails} /> : 'Loading...'}</div>
}

export default RepositoryPage
