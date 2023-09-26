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
      <header className="flex py-4 px-2 lg:px-2 items-center justify-between relative z-50 bg-primary">
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
      </header>
    </>
  );
};

export default Header;
