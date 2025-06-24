import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="relative">
      <nav className='bg-white flex justify-between items-center py-2 shadow-sm w-full px-6 rounded-b-md'>
          <h1 className='text-4xl font-truculenta'><Link to='/'>TEMI</Link></h1>
          <p className="border-2 border-gray-400 rounded-full "><CgProfile className="w-5 h-5 m-3" /></p>
      </nav>
      {/* <div className="absolute flex flex-col bg-[#c6e6b8] right-0 top-16 w-full h-[40] z-10">
          <ul>
            <li>Dark mode</li>
          </ul>
      </div> */}
    </div>
  )
}

export default Navbar
