import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from '../components/SearchBar'
import ReposytoryList from '../components/ReposytoryList'
import Paginator from '../components/Paginator'
import {
  fetchRepositories,
  selectCurrentPage,
  selectError,
  selectLoading,
  selectPageInfo,
  selectRepositories,
  selectSearchTerm,
  setCurrentPage,
  setSearchTerm,
} from '../redux/slices/repositoriesSlice'
import { AppDispatch } from '../redux/store'

const HomePage = () => {
  const dispatch: AppDispatch = useDispatch()
  const repositories = useSelector(selectRepositories)
  const page = useSelector(selectCurrentPage)
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)
  const searchTerm = useSelector(selectSearchTerm)
  const pageInfo = useSelector(selectPageInfo)

  useEffect(() => {
    dispatch(fetchRepositories({ searchTerm, page }))
  }, [searchTerm, page, dispatch])

  useEffect(() => {}, [repositories, loading, error])

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage))
    const after = repositories.length > 0 ? repositories[repositories.length - 1].cursor : null
    dispatch(fetchRepositories({ searchTerm, page: newPage, after }))
  }

  const totalPages = pageInfo ? Math.ceil(1000 / 10) : 1

  return (
    <div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={(term) => dispatch(setSearchTerm(term))} />
      {loading ? <h3>Loading..</h3> : <ReposytoryList repositories={repositories} />}
      <Paginator page={page} totalPages={totalPages} setPage={handlePageChange} />
    </div>
  )
}

export default HomePage
