import React from "react";
import { setIsAvatar, setIsMenuOpen } from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";
import Logo from "../svg/Logo";

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
      <header className="py-3 px-2 lg:px-2 relative z-50 bg-primary">
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
          <div className="w-[45rem] flex items-center ">
            <Logo />
            <p className="pl-5 mb-0 text-white font-semibold">
              Sambahayan Consumer Cooperative
            </p>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
