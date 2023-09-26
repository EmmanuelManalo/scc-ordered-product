import React, { useLayoutEffect } from "react";
import { BsGear, BsPersonVcard } from "react-icons/bs";
import { LiaToolsSolid, LiaBusinessTimeSolid } from "react-icons/lia";
import { BiUserCircle } from "react-icons/bi";
import {
  setIsSearch,
  setIsSettingsOpen,
  setIsToolsOpen,
  setNavHeight,
} from "../../store/StoreAction";
import { PiCaretRight } from "react-icons/pi";
import { devNavUrl } from "../helpers/functions-general";
import { StoreContext } from "../../store/StoreContext";
import { Link } from "react-router-dom";

const Navigation = ({ menu, submenu = null, val }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const urlRolePath = `${devNavUrl}`;
  const ref = React.useRef(null);
  const handleDropDownTools = (e) => {
    dispatch(setIsToolsOpen(!store.isToolsOpen));
  };

  const handleDropDownSettings = (e) => {
    dispatch(setIsSettingsOpen(!store.isSettingsOpen));
  };

  const handleSearchReset = (e) => {
    dispatch(setIsSearch(false));
  };

  //   const handleDropDownTimeEntry = (e) => {
  //     dispatch(setIsTimeEntryOpen(!store.isTimeEntryOpen));
  //   };
  const handleScroll = (e) => {
    console.log(e.target.scrollTop);
    dispatch(setNavHeight(e.target.scrollTop));
  };

  React.useEffect(() => {
    const nav = document.querySelector(".navigation").pageYOffset;
    console.log(nav);
  }, []);

  return (
    <div
      className="navigation px-2 py-4 bg-tm-gradient h-full custom__scroll overflow-y-auto"
      ref={ref}
      onScroll={handleScroll}
    >
      <ul className="">
        <li className="nav__link has__dropdown">
          <button
            className={`${menu === "tools" ? "bg-[#436c8a]" : ""}`}
            onClick={() => handleDropDownTools()}
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-3 items-center ">
                <LiaToolsSolid className="text-lg" /> Tools
              </div>
              <PiCaretRight
                className={!store.setIsToolsOpen ? "rotate-0" : "rotate-90"}
              />
            </div>
          </button>
        </li>
        <div className={store.isToolsOpen ? "showdropdown" : "hidden"}>
          <ul className="ml-9 ">
            <li
              className={` ${
                submenu === "toolsWorkLoadChart"
                  ? "bg-[#436c8a]/80 rounded-md"
                  : ""
              }`}
            >
              <Link
                to={`${urlRolePath}/tools/workloadchart`}
                className={`text-white border-l-2 hover:!border-accent duration-150 hover:!border-l-2 border-transparent pl-2 w-fit inline-block py-1 ${
                  submenu === "toolsWorkLoadChart" ? "active__submenu" : ""
                }`}
              >
                WorkLoad Chart
              </Link>
            </li>
            <li
              className={` ${
                submenu === "toolsTaskControl"
                  ? "bg-[#436c8a]/80 rounded-md"
                  : ""
              }`}
            >
              <Link
                to={`${urlRolePath}/tools/taskcontrol`}
                className={`text-white border-l-2 hover:!border-accent duration-150 hover:!border-l-2 border-transparent pl-2 w-fit inline-block py-1 ${
                  submenu === "toolsWorkLoadChart" ? "active__submenu" : ""
                }`}
              >
                Task Control
              </Link>
            </li>
            <li
              className={` ${
                submenu === "toolsIndividual"
                  ? "bg-[#436c8a]/80 rounded-md"
                  : ""
              }`}
            >
              <Link
                to={`${urlRolePath}/tools/individual`}
                className={`text-white border-l-2 hover:!border-accent duration-150 hover:!border-l-2 border-transparent pl-2 w-fit inline-block py-1 ${
                  submenu === "toolsIndividual" ? "active__submenu" : ""
                }`}
              >
                Individual
              </Link>
            </li>
          </ul>
        </div>
        <li className="nav__link  has__dropdown">
          <button
            className={`${menu === "timeEntry" ? "bg-[#436c8a]" : ""}`}
            // onClick={() => handleDropDownTimeEntry()}
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-3 items-center ">
                <LiaBusinessTimeSolid className="text-lg" /> Time Entry
              </div>
              {/* <PiCaretRight
                className={!store.isTimeEntryOpen ? "rotate-0" : "rotate-90"}
              /> */}
            </div>
          </button>
        </li>
        <Link className="nav__link" to={`${urlRolePath}/staff`}>
          <button
            className={`${menu === "staff" ? "bg-[#436c8a]" : ""}`}
            onClick={() => handleSearchReset()}
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-3 items-center ">
                <BiUserCircle className="text-lg" /> Staff
              </div>
              {/* <PiCaretRight
                className={!store.isTimeEntryOpen ? "rotate-0" : "rotate-90"}
              /> */}
            </div>
          </button>
        </Link>
        <Link className="nav__link" to={`${urlRolePath}/client`}>
          <button
            className={`${menu === "client" ? "bg-[#436c8a]" : ""}`}
            onClick={() => handleSearchReset()}
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-3 items-center ">
                <BsPersonVcard className="text-lg" /> Client
              </div>
              {/* <PiCaretRight
                className={!store.isClientOpen ? "rotate-0" : "rotate-90"}
              /> */}
            </div>
          </button>
        </Link>
        <li className="nav__link  has__dropdown">
          <button
            className={`${menu === "settings" ? "bg-[#436c8a]" : ""}`}
            onClick={() => handleDropDownSettings()}
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-3 items-center ">
                <BsGear className="text-lg" /> Settings
              </div>
              <PiCaretRight
                className={!store.isClientOpen ? "rotate-0" : "rotate-90"}
              />
            </div>
          </button>
        </li>
        <div className={store.isSettingsOpen ? "showdropdown" : "hidden"}>
          <ul className="ml-9 ">
            <li
              className={` ${
                submenu === "settingsAccessLevel"
                  ? "bg-[#436c8a]/80 rounded-md"
                  : ""
              }`}
            >
              <Link
                to={`${urlRolePath}/settings/access-level`}
                className={`text-white border-l-2 hover:!border-accent duration-150 hover:!border-l-2 border-transparent pl-2 w-fit inline-block py-1 ${
                  submenu === "settingsAccessLevel" ? "active__submenu" : ""
                }`}
                onClick={() => handleSearchReset()}
              >
                Access Level
              </Link>
            </li>
            <li
              className={` ${
                submenu === "settingsUsers" ? "bg-[#436c8a]/80 rounded-md" : ""
              }`}
            >
              <Link
                to={`${urlRolePath}/settings/users`}
                className={`text-white border-l-2 hover:!border-accent duration-150 hover:!border-l-2 border-transparent pl-2 w-fit inline-block py-1 ${
                  submenu === "settingsUsers" ? "active__submenu" : ""
                }`}
                onClick={() => handleSearchReset()}
              >
                Users
              </Link>
            </li>
            <li
              className={` ${
                submenu === "settingsActivity"
                  ? "bg-[#436c8a]/80 rounded-md"
                  : ""
              }`}
            >
              <Link
                to={`${urlRolePath}/settings/activity`}
                className={`text-white border-l-2 hover:!border-accent duration-150 hover:!border-l-2 border-transparent pl-2 w-fit inline-block py-1 ${
                  submenu === "settingsActivity" ? "active__submenu" : ""
                }`}
                onClick={() => handleSearchReset()}
              >
                Activity
              </Link>
            </li>
            <li
              className={` ${
                submenu === "settingsRates" ? "bg-[#436c8a]/80 rounded-md" : ""
              }`}
            >
              <Link
                to={`${urlRolePath}/settings/rates`}
                className={`text-white border-l-2 hover:!border-accent duration-150 hover:!border-l-2 border-transparent pl-2 w-fit inline-block py-1 ${
                  submenu === "settingsRates" ? "active__submenu" : ""
                }`}
                onClick={() => handleSearchReset()}
              >
                Rates
              </Link>
            </li>
            <li
              className={` ${
                submenu === "settingsEngagement"
                  ? "bg-[#436c8a]/80 rounded-md"
                  : ""
              }`}
            >
              <Link
                to={`${urlRolePath}/settings/engagement`}
                className={`text-white border-l-2 hover:!border-accent duration-150 hover:!border-l-2 border-transparent pl-2 w-fit inline-block py-1 ${
                  submenu === "settingsEngagement" ? "active__submenu" : ""
                }`}
                onClick={() => handleSearchReset()}
              >
                Engagement
              </Link>
            </li>
            <li
              className={` ${
                submenu === "settingsOffice" ? "bg-[#436c8a]/80 rounded-md" : ""
              }`}
            >
              <Link
                to={`${urlRolePath}/settings/office`}
                className={`text-white border-l-2 hover:!border-accent duration-150 hover:!border-l-2 border-transparent pl-2 w-fit inline-block py-1 ${
                  submenu === "settingsOffice" ? "active__submenu" : ""
                }`}
                onClick={() => handleSearchReset()}
              >
                Office
              </Link>
            </li>
            <li
              className={` ${
                submenu === "settingsDepartment"
                  ? "bg-[#436c8a]/80 rounded-md"
                  : ""
              }`}
            >
              <Link
                to={`${urlRolePath}/settings/department`}
                className={`text-white border-l-2 hover:!border-accent duration-150 hover:!border-l-2 border-transparent pl-2 w-fit inline-block py-1 ${
                  submenu === "settingsDepartment" ? "active__submenu" : ""
                }`}
              >
                Department
              </Link>
            </li>
            <li
              className={` ${
                submenu === "settingsEntities"
                  ? "bg-[#436c8a]/80 rounded-md"
                  : ""
              }`}
            >
              <Link
                to={`${urlRolePath}/settings/entities`}
                className={`text-white border-l-2 hover:!border-accent duration-150 hover:!border-l-2 border-transparent pl-2 w-fit inline-block py-1 ${
                  submenu === "settingsEntities" ? "active__submenu" : ""
                }`}
                onClick={() => handleSearchReset()}
              >
                Entities
              </Link>
            </li>
            <li
              className={` ${
                submenu === "settingsReferralType"
                  ? "bg-[#436c8a]/80 rounded-md"
                  : ""
              }`}
            >
              <Link
                to={`${urlRolePath}/settings/referral-type`}
                className={`text-white border-l-2 hover:!border-accent duration-150 hover:!border-l-2 border-transparent pl-2 w-fit inline-block py-1 ${
                  submenu === "settingsReferralType" ? "active__submenu" : ""
                }`}
              >
                Referral Type
              </Link>
            </li>
            <li
              className={` ${
                submenu === "settingsReferralSource"
                  ? "bg-[#436c8a]/80 rounded-md"
                  : ""
              }`}
            >
              <Link
                to={`${urlRolePath}/settings/referral-source`}
                className={`text-white border-l-2 hover:!border-accent duration-150 hover:!border-l-2 border-transparent pl-2 w-fit inline-block py-1 ${
                  submenu === "settingsReferralSource" ? "active__submenu" : ""
                }`}
              >
                Referral Source
              </Link>
            </li>
            <li
              className={` ${
                submenu === "settingsLostReason"
                  ? "bg-[#436c8a]/80 rounded-md"
                  : ""
              }`}
            >
              <Link
                to={`${urlRolePath}/settings/lost-reason`}
                className={`text-white border-l-2 hover:!border-accent duration-150 hover:!border-l-2 border-transparent pl-2 w-fit inline-block py-1 ${
                  submenu === "settingsLostReason" ? "active__submenu" : ""
                }`}
              >
                Lost Reason
              </Link>
            </li>
            <li
              className={` ${
                submenu === "settingsLostTo" ? "bg-[#436c8a]/80 rounded-md" : ""
              }`}
            >
              <Link
                to={`${urlRolePath}/settings/lost-to`}
                className={`text-white border-l-2 hover:!border-accent duration-150 hover:!border-l-2 border-transparent pl-2 w-fit inline-block py-1 ${
                  submenu === "settingsLostTo" ? "active__submenu" : ""
                }`}
              >
                Lost To
              </Link>
            </li>
            <li
              className={` ${
                submenu === "settingsWonReason"
                  ? "bg-[#436c8a]/80 rounded-md"
                  : ""
              }`}
            >
              <Link
                to={`${urlRolePath}/settings/won-reason`}
                className={`text-white border-l-2 hover:!border-accent duration-150 hover:!border-l-2 border-transparent pl-2 w-fit inline-block py-1 ${
                  submenu === "settingsWonReason" ? "active__submenu" : ""
                }`}
              >
                Won Reason
              </Link>
            </li>
            <li
              className={` ${
                submenu === "settingsClientClass"
                  ? "bg-[#436c8a]/80 rounded-md"
                  : ""
              }`}
            >
              <Link
                to={`${urlRolePath}/settings/client-class`}
                className={`text-white border-l-2 hover:!border-accent duration-150 hover:!border-l-2 border-transparent pl-2 w-fit inline-block py-1 ${
                  submenu === "settingsClientClass" ? "active__submenu" : ""
                }`}
              >
                Client Class
              </Link>
            </li>
            <li
              className={` ${
                submenu === "settingsForm1099SpecialCharacter"
                  ? "bg-[#436c8a]/80 rounded-md"
                  : ""
              }`}
            >
              <Link
                to={`${urlRolePath}/settings/form1099-special-character`}
                className={`text-white border-l-2 hover:!border-accent duration-150 hover:!border-l-2 border-transparent pl-2 w-fit inline-block py-1 ${
                  submenu === "settingsForm1099SpecialCharacter"
                    ? "active__submenu"
                    : ""
                }`}
              >
                Form 1099 Special Character
              </Link>
            </li>
          </ul>
        </div>
      </ul>
    </div>
  );
};

export default Navigation;
