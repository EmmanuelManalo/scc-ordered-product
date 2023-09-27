import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import Logo from "../../../svg/Logo";

const CheckoutHeader = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  // const [avatarShow, setAvatarShow] = React.useState(false);

  // const handleShowAvatar = () => dispatch(setIsAvatar(!store.isAvatar));
  // const handleBurgerBtn = () => dispatch(setIsMenuOpen(!store.isMenuOpen));
  return (
    <>
      <header className="flex py-3 px-2 lg:px-2 items-center justify-center relative z-50 bg-primary">
        <div className="w-[50rem] flex items-center justify-center">
          <Logo />
          <p className="pl-5 mb-0 text-white font-semibold ">
            Sambahayan Consumer Cooperative
          </p>
        </div>
      </header>
    </>
  );
};

export default CheckoutHeader;
