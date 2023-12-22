
export const Pagination = ({ handlePageFilter, pagination }) => {
  return (
    <nav aria-label="Page navigation example">
        <ul className="pagination">
            <li className={ "page-item" + (pagination.current_page == 1 ? " disabled": "") }  onClick={ () => handlePageFilter(1) }><a className="page-link" href="#">&lt;&lt;</a></li>
            <li className={ "page-item" + (pagination.current_page <= 1 ? " disabled": "") } onClick={ () => handlePageFilter(pagination.current_page-1) }><a className="page-link" href="#">&lt;</a></li>
            { (pagination.current_page-3 >= 1) && <li className={ "page-item" } onClick={ () => handlePageFilter(pagination.current_page-3) }><a className="page-link" href="#">{ pagination.current_page-3 }</a></li> }
            { (pagination.current_page-2 >= 1) && <li className={ "page-item" } onClick={ () => handlePageFilter(pagination.current_page-2) }><a className="page-link" href="#">{ pagination.current_page-2 }</a></li> }
            { (pagination.current_page-1 >= 1) && <li className={ "page-item" } onClick={ () => handlePageFilter(pagination.current_page-1) }><a className="page-link" href="#">{ pagination.current_page-1 }</a></li> }
            <li className={ "page-item active" } onClick={ () => handlePageFilter(pagination.current_page) }><a className="page-link" href="#">{ pagination.current_page }</a></li>
            { (pagination.current_page+1 <= pagination.last_page) && <li className={ "page-item" } onClick={ () => handlePageFilter(pagination.current_page+1) }><a className="page-link" href="#">{ pagination.current_page+1 }</a></li> }
            { (pagination.current_page+2 <= pagination.last_page) && <li className={ "page-item" } onClick={ () => handlePageFilter(pagination.current_page+2) }><a className="page-link" href="#">{ pagination.current_page+2 }</a></li> }
            { (pagination.current_page+3 <= pagination.last_page) && <li className={ "page-item" } onClick={ () => handlePageFilter(pagination.current_page+3) }><a className="page-link" href="#">{ pagination.current_page+3 }</a></li> }
            <li className={ "page-item" + (pagination.current_page >= pagination.last_page ? " disabled": "") } onClick={ () => handlePageFilter(pagination.current_page+1) }><a className="page-link" href="#">&gt;</a></li>
            <li className={ "page-item" + (pagination.current_page == pagination.last_page ? " disabled": "") } onClick={ () => handlePageFilter(pagination.last_page) }><a className="page-link" href="#">&gt;&gt;</a></li>
        </ul>
    </nav>
  )
}
