import { Link, NavLink } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdOutlinePostAdd } from "react-icons/md";
import SettingsDropDown from './SettingsDropDown';
import { FaRegStar } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import CreateContent from '../../modals/CreateContent';

const Navbar = () => {

    const username = useSelector(state => state.user.user.displayName)
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className='h-[74px] w-[81%] mx-auto max-[1247px]:w-full text-[#BBBBBB] dark:text-[#777777]'>
            <header className='flex justify-around items-center h-full max-[1247px]:justify-between max-[1247px]:mx-5 max-sm:justify-center'>
                <div className='max-w-[32px] min-w-[32px] cursor-pointer dark:text-white'>
                    <Link to="/">
                        <FaRegStar className='text-3xl' />
                    </Link>
                </div>
                <nav className='max-sm:hidden'>
                    <ul className='flex'>
                        <NavLink to="/" className='hover:bg-[#F5F5F5] dark:hover:bg-[#1C1C1C] py-[20px] px-[32px] rounded-md my-[4px] mx-[2px] transition-all duration-500 cursor-pointer active:scale-90'>
                            <FaHome className='text-3xl' title='Home' />
                        </NavLink>
                        <div className='hover:bg-[#F5F5F5] dark:hover:bg-[#1C1C1C] py-[20px] px-[32px] rounded-md my-[4px] mx-[2px] transition-all duration-500 cursor-pointer active:scale-90 relative' onClick={() => setOpenModal(true)}>
                            <MdOutlinePostAdd className='text-3xl' title='Create Content' />
                        </div>
                        <NavLink to={`/profile/${username}`} className='hover:bg-[#F5F5F5] dark:hover:bg-[#1C1C1C] py-[20px] px-[32px] rounded-md my-[4px] mx-[2px] transition-all duration-500 cursor-pointer active:scale-90'>
                            <CgProfile className='text-3xl' title='Profile' />
                        </NavLink>

                    </ul>
                </nav>

                {/* settings-dropdown */}
                <SettingsDropDown />

                {/* bottonav */}
                <nav className='hidden max-sm:block fixed bottom-0 left-0 w-full bg-white dark:bg-[#101010] z-10 opacity-95'>
                    <ul className='flex justify-around'>
                        <NavLink to="/" className='hover:bg-[#F5F5F5] py-5 px-8 rounded-md my-[4px] mx-[2px] transition-all duration-500 cursor-pointer max-sm:px-6 active:scale-95 dark:hover:bg-[#1C1C1C]'>
                            <FaHome className='text-3xl' title='Home' />
                        </NavLink>
                        <div className='hover:bg-[#F5F5F5] py-5 px-8 rounded-md my-[4px] mx-[2px] transition-all duration-500 cursor-pointer max-sm:px-6 active:scale-95 dark:hover:bg-[#1C1C1C]' onClick={(prev) => setOpenModal(!prev)}>
                            <MdOutlinePostAdd className='text-3xl' title='Notices' />
                        </div>
                        <NavLink to={`/profile/${username}`} className='hover:bg-[#F5F5F5] py-5 px-8 rounded-md my-[4px] mx-[2px] transition-all duration-500 cursor-pointer max-sm:px-6 active:scale-95 dark:hover:bg-[#1C1C1C]'>
                            <CgProfile className='text-3xl' title='Profile' />
                        </NavLink>
                    </ul>
                </nav>

            </header>

            {openModal && <CreateContent openModal={openModal} setOpenModal={setOpenModal} />}


        </div>
    )
}

export default Navbar