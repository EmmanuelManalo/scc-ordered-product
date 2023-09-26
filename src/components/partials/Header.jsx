import React from "react";
import { BiSolidUserCircle, BiUserCircle } from "react-icons/bi";
import { setIsAvatar, setIsMenuOpen } from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";
import { CiMail } from "react-icons/ci";
import Logo from "../svg/Logo";
import { MdOutlineLogout } from "react-icons/md";

const Header = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  // const [avatarShow, setAvatarShow] = React.useState(false);

  const handleShowAvatar = () => dispatch(setIsAvatar(!store.isAvatar));
  const handleBurgerBtn = () => dispatch(setIsMenuOpen(!store.isMenuOpen));
  return (
    <>
      {store.isMenuOpen && (
        <div
          className="absolute lg:static top-0 left-0 right-0 bottom-0 z-40 bg-black/50"
          onClick={handleBurgerBtn}
        ></div>
      )}
      <header className="flex py-4 px-2 lg:px-2 items-center justify-between relative z-50 bg-white">
        <div className="flex items-center gap-4">
          <div
            className={`toggle__btn lg:hidden ${
              store.isMenuOpen ? "open" : ""
            }`}
            onClick={handleBurgerBtn}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="w-20">
            <Logo />
          </div>
        </div>

        <div>
          <div
            className="flex items-center gap-2 text-right lg:pr-7 relative cursor-pointer group"
            onClick={handleShowAvatar}
          >
            <div className="m-0 text-sm hidden lg:block">
              <p className="m-0 leading-none font-bold">Emms</p>
              <p className="m-0">Developer</p>
            </div>
            <div
              className={`relative before:top-0 before:left-0 before:content-[''] before:absolute group-hover:before:border-4 active:before:border-4  before:w-full before:h-full before:rounded-full before:border-success/20 ${
                store.isAvatar ? "before:border-4" : ""
              }`}
            >
              <BiSolidUserCircle className="text-5xl text-gray-400" />
            </div>
          </div>
          {store.isAvatar && (
            <div className="absolute bg-white px-3 -bottom-[6.3rem] right-3 lg:right-8 border-2 inline-block rounded-md shadow-sm">
              <ul>
                <li className="grid grid-cols-[20px_1fr] items-center gap-1 text-sm border-b-2 last:border-b-0 text-left py-2 hover:text-success cursor-pointer">
                  <CiMail />
                  <p className="m-0">
                    emmanuel.manalo@frontlinebusiness.com.ph
                  </p>
                </li>
                <li className="grid grid-cols-[20px_1fr] items-center gap-1 text-sm border-b-2 last:border-b-0 text-left py-2 hover:text-success cursor-pointer">
                  <BiUserCircle />
                  <p className="m-0">Account</p>
                </li>
                <li className="grid grid-cols-[20px_1fr] items-center gap-1 text-sm border-b-2 last:border-b-0 text-left py-2 hover:text-success cursor-pointer">
                  <MdOutlineLogout />
                  <p className="m-0">Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
