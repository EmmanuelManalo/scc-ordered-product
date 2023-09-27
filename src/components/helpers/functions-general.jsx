import React from "react";
import { StoreContext } from "../../store/StoreContext";

// CYCY url // cyrenemlumabas@gmail.com
// export const urlPathTm = "http://localhost/training/tm-practice";
// export const imgUrlPathTm = "http://localhost/training/tm-practice/public/img";

// // cy url
// export const imgUrlPathTm = "http://localhost/projects/sccv1/public/img";
// export const urlPathTm = "http://localhost/projects/sccv1";

// Emms
// export const urlPathTm = "http://localhost/project/sccv1";
// export const imgUrlPathTm = "http://localhost/project/sccv1/public/img";

// rhico
export const urlPathTm = "http://localhost/training/sccv1";
export const imgUrlPathTm = "http://localhost/training/sccv1/public/img";

// // Patrick
// const urlPathTm = `https://tmcrm.frontlinebusiness.com.ph`;
// const imgUrlPathTm = `https://tmcrm.frontlinebusiness.com.ph/img`;

// // Local Dev and Online Dev URL
export const devApiUrl = `${urlPathTm}/rest`;
export const devBaseUrl = `${urlPathTm}`;
export const devBaseImgUrl = `${imgUrlPathTm}`;
export const devNavUrl = "";

// ONLINE PRODUCTION START HERE //

export const devKey =
  "$2a$12$47wDvbLInZif/PVS8B6P3.7WxyJvUpBzZAWCsnWJUKq3nrn4qgmeO";
// export const devKey = "";

export const isDemoMode = 1;

export const pesoSign = <span>&#8369;</span>;

// Copyright year
export const copyrightYear = () => {
  return new Date().getFullYear();
};

// format the numbers separated by comma
export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// get the url id parameter
export const getUrlParam = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams;
};

// storage after login
export function setStorageRoute(jwt) {
  localStorage.setItem("tmv1token", JSON.stringify({ token: jwt }));
}

// formatting date
export const formatDate = (dateVal) => {
  const d = new Date(dateVal);
  const year = d.getFullYear();
  const month = d.getMonth();
  const date = d.getDate();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${months[month]} ${date}, ${year}`;
};

// get focus on a button
export const GetFocus = (id) => {
  React.useEffect(() => {
    const obj = document.getElementById(id);
    obj.focus();
  }, []);
};

// console log values
export const consoleLog = (values, param2 = null) => {
  console.log(values, param2);
};

// get user type
export const getUserType = () => {
  const { store } = React.useContext(StoreContext);

  // let link = `${devNavUrl}/system`;
  let link = "";

  store.credentials.data.role_is_developer === 1
    ? (link = `${devNavUrl}/system`)
    : store.credentials.data.role_is_admin === 1
    ? (link = `${devNavUrl}/${store.credentials.data.role_name.toLowerCase()}`)
    : store.credentials.data.role_is_trainer === 1
    ? (link = `${devNavUrl}/${store.credentials.data.role_name.toLowerCase()}`)
    : store.credentials.data.role_is_accounting === 1
    ? (link = `${devNavUrl}/${store.credentials.data.role_name.toLowerCase()}`)
    : (link = `${devNavUrl}/${store.credentials.data.role_name.toLowerCase()}`);

  return link;
};

// export const closeModal = (setShow, dispatch) => {
//   setShow("");
//   setTimeout(() => {
//     dispatch(setIsAdd(false));
//   }, 200);
// };

export const handleEscape = (handleClose) => {
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.keyCode === 27) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  });
};

export const ordinal = (n) => {
  let result = "";
  let s = ["th", "st", "nd", "rd"];
  let v = n % 100;

  result = n + (s[(v - 20) % 10] || s[v] || s[0]);

  return result.replaceAll(",", "");
};

export const getDateNow = () => {
  return new Date(new Date().toString().split("GMT")[0] + " UTC")
    .toISOString()
    .split("T")[0];
};

// fetch for uploading photo or file
export const fetchFormData = (url, fd = {}) => {
  const data = fetch(url, {
    method: "post",
    body: fd,
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error + " api endpoint error");
    });
  return data;
};

// formatting date and time
export const formatTime = (dateVal) => {
  const d = new Date(dateVal);

  if (isNaN(d.getTime())) {
    return `00:00:00`;
  } else {
    const hour = d.getHours();
    const minute = d.getMinutes();
    const second = d.getSeconds();

    const hourFormatted = hour % 12 || 12; // hour returned in 24 hour format
    const morning = hour < 12 ? "AM" : "PM";
    return `${hourFormatted}:${minute}:${second} ${morning} `;
  }
};

// formatting time diff
export const formatTimeDiff = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // console.log(start);
  // console.log(end);

  let timeDiff = end.getTime() - start.getTime();

  if (isNaN(timeDiff)) {
    return `00:00:00`;
  } else {
    let seconds = Math.floor(timeDiff / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
};

export const convertSecondsToTime = (seconds) => {
  return new Date(Number(seconds) * 1000).toISOString().substring(11, 19);
};
