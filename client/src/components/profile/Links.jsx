import { NavLink } from 'react-router-dom'

const Links = ({ username }) => {
    return (
        <div className="flex items-center text-center h-12 text-[#999999] font-semibold w-full">
            <NavLink end to={`/${username}`} className="w-full border-b dark:border-[#777777] dark:border-opacity-30 pb-3">Visual</NavLink>
            <NavLink end to={`/${username}`} className="w-full border-b dark:border-[#777777] dark:border-opacity-30 pb-3">Audio</NavLink>
        </div>
    )
}

export default Links