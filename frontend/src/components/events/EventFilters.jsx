import { FiSearch } from 'react-icons/fi'

function EventFilters({ search, onSearch, category, onCategory, categories }) {
  return <div className="grid gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_220px]"><label className="relative"><span className="sr-only">Search events</span><FiSearch className="absolute left-3 top-3.5 text-gray-400" /><input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Search events" className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 outline-none focus:border-blue-500" /></label><select value={category} onChange={(event) => onCategory(event.target.value)} className="rounded-lg border border-gray-300 px-3 py-3 outline-none focus:border-blue-500"><option value="">All Categories</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select></div>
}
export default EventFilters
