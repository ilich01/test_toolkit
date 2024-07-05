import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { fetchRepositoriesAPI, fetchRepositoryDetailsAPI } from '../../graphQl/queries'
import { PageInfo, Repository, RepositoryDetails } from '../../types'

export interface RepositoriesState {
  repositories: Repository[]
  repositoryDetails: RepositoryDetails | null
  loading: boolean
  error: string | null
  currentPage: number
  searchTerm: string
  pageInfo: PageInfo | null
}

const initialState: RepositoriesState = {
  repositories: [],
  repositoryDetails: null,
  loading: false,
  error: null,
  currentPage: 1,
  searchTerm: '',
  pageInfo: null,
}
export const fetchRepositories = createAsyncThunk<
  { repositories: Repository[]; pageInfo: any },
  { searchTerm: string; page: number; after?: string | null },
  { state: RootState }
>('repositories/fetchRepositories', async ({ searchTerm, page, after }, { rejectWithValue }) => {
  try {
    console.log(`Вызов fetchRepositoriesAPI с searchTerm: ${searchTerm}, page: ${page}`)
    const { repositories, pageInfo } = await fetchRepositoriesAPI(searchTerm, page, after)
    return { repositories, pageInfo }
  } catch (error: any) {
    console.error('Ошибка fetchRepositories:', error)
    return rejectWithValue(error.message)
  }
})

export const fetchRepositoryDetails = createAsyncThunk<RepositoryDetails, { owner: string; name: string }, { state: RootState }>(
  'repositories/fetchRepositoryDetails',
  async ({ owner, name }, { rejectWithValue }) => {
    try {
      return await fetchRepositoryDetailsAPI(owner, name)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRepositories.fulfilled, (state, action) => {
        state.loading = false
        state.repositories = action.payload.repositories
        state.pageInfo = action.payload.pageInfo
      })
      .addCase(fetchRepositories.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchRepositoryDetails.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRepositoryDetails.fulfilled, (state, action: PayloadAction<RepositoryDetails>) => {
        state.loading = false
        state.repositoryDetails = action.payload
      })
      .addCase(fetchRepositoryDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { setCurrentPage, setSearchTerm } = repositoriesSlice.actions
export default repositoriesSlice.reducer

export const selectRepositories = (state: RootState) => state.repositories.repositories
export const selectRepositoryDetails = (state: RootState) => state.repositories.repositoryDetails
export const selectLoading = (state: RootState) => state.repositories.loading
export const selectError = (state: RootState) => state.repositories.error
export const selectCurrentPage = (state: RootState) => state.repositories.currentPage
export const selectSearchTerm = (state: RootState) => state.repositories.searchTerm
export const selectPageInfo = (state: RootState) => state.repositories.pageInfo
