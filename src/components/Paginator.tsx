import React from 'react'

interface PaginatorProps {
  page: number
  totalPages: number
  setPage: (page: number) => void
}

const Paginator: React.FC<PaginatorProps> = ({ page, totalPages, setPage }) => {
  const maxPagesToShow = 10
  const startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2))
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

  return (
    <div>
      <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>
        Previous
      </button>
      {pages.map((p) => (
        <button key={p} onClick={() => setPage(p)} style={{ fontWeight: p === page ? 'bold' : 'normal' }}>
          {p}
        </button>
      ))}
      <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
        Next
      </button>
    </div>
  )
}

export default Paginator
