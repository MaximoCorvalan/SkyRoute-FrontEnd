import './Search.css'
import { SearchFilter } from '../SearchFilter/SearchFilter'
import { TableFlight } from '../TableFlight/TableFlight'

export const Search = () => {
  return (
    <div className='Search-container'>
        <SearchFilter></SearchFilter>
        <TableFlight></TableFlight>
    </div>
  )
}
