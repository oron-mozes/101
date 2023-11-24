import date from "date-and-time";
import _ from "lodash";
import locale from "../../locales/he.json";
import { colors } from "../shared-config";
import { timeToDate } from "./date-to-time";
import {
  IAirway,
  IBreathing,
  ICareProvider,
  IMeasurements,
  IMedicationsAndFluid,
  ITreatmentGuide,
  ITreatmentGuideMeasurementsInformation,
  MEDICATION_TREATMENT,
} from "../interfaces";

function convertor(key, value) {
  switch (key) {
    case "injury_time":
    case "care_time":
    case "time":
    case "order_time":
    case "execution_time":
      return timeToDate(value);
    case "date":
      return date.format(new Date(value), "DD/MM/YY");
    default:
      return locale[value] ?? value;
  }
}

export function getLocaleKey(data) {
  if (Array.isArray(data)) {
    return data.map((value) => {
      if (_.isObject(value)) {
        return getLocaleKey(value);
      }

      return locale[value] ?? value;
    });
  }

  const res = {};
  for (const key in data) {
    if (Array.isArray(data[key])) {
      res[locale[key]] = getLocaleKey(data[key]);
    } else if (_.isObject(data[key])) {
      res[locale[key]] = getLocaleKey(data[key]);
    } else {
      res[locale[key]] = convertor(key, data[key]);
    }
  }

  return res;
}

export function returnInfoTable(title: string, data: Record<string, any>[]) {
  return `
  <div style="width:100%; text-align:center; background-color:${
    colors.surface
  }"><strong>${title}</strong></div>
  <table style="width:100%; border-collapse: collapse; margin-bottom: 40px" border="1">
  <tr>
  ${Object.keys(data[0])
    .map(
      (key) =>
        `<th style="border-color: ${colors.surface}; text-align:right">${locale[key]}</th>`
    )
    .join("")}
  </tr>
  ${data
    .map(
      (row) => `<tr>
  
  ${Object.keys(row)
    .map(
      (key) =>
        `<td style="border-color: ${colors.surface};">${convertor(
          key,
          row[key]
        )}</td>`
    )
    .join("")}
  </tr>`
    )
    .join(``)}
  </table>`;
}

export function returnInjuryReasonsTable(data: string[], circumstance) {
  return `
  <div style="width:100%; text-align:center; background-color:${
    colors.surface
  }"><strong>${locale.injuryReason}</strong></div>
  <table style="width:100%; border-collapse: collapse; margin-bottom: 40px" border="1">
  <tr>
  <th style="border-color: ${colors.surface}; text-align:right">${
    locale.reasons
  }</th>
  </tr>
  <td style="border-color: ${colors.surface};">${data
    .map((item) => locale[item])
    .join(", ")}</td>
  </tr>
  <tr>
  <th style="border-color: ${colors.surface}; text-align:right">${
    locale.circumstance
  }</th>
  </tr>
  <td style="border-color: ${colors.surface};">${circumstance ?? "לא דווח"}</td>
  </tr>
  </table>`;
}

export function returnBodyPicker(imagePath, mainInjury = "") {
  return `
  <div style="width:100%; text-align:center; background-color:${colors.surface};"><strong>${locale.injuryReason}</strong></div>
  <div style="display: flex; flex-direction:row; width: 100%">
      <div style="flex:2"> <img src="data:image/png;base64,${imagePath}" width="500" height="500"/></div>
      <div style="flex:1"> 
      <ul style="padding: 10px;border: 1px solid ${colors.textInputBorderColor}">
        <li  style="list-style: none; margin-bottom: 20px; margin-top: 10px">${locale.legend}</li>
        <li style="list-style: none; margin-bottom: 20px"><svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.84727 17C2.84156 17 0 14.2187 0 10.3867C0 8.35239 1.21834 6.16056 1.26988 6.06906C1.37562 5.88073 1.58337 5.77806 1.80015 5.802C2.01481 5.82966 2.19121 5.98447 2.24647 6.19355C2.24966 6.20632 2.57802 7.43629 3.01159 8.11938C3.30276 8.57902 3.59818 8.90407 3.93026 9.12964C3.70551 8.15449 3.53336 6.68724 3.81337 5.18169C4.58274 1.04914 7.8313 0.0601571 7.97051 0.0207893C8.14957 -0.0308144 8.33978 0.0154694 8.4758 0.139425C8.61182 0.264444 8.67399 0.451175 8.63892 0.632586C8.63361 0.661313 8.09696 3.55484 9.23561 6.02012C9.33922 6.24409 9.48321 6.50424 9.63836 6.76438C9.68246 6.40688 9.751 6.02703 9.8562 5.65783C10.2738 4.19537 11.354 3.69582 11.3992 3.67561C11.5793 3.59368 11.7897 3.62028 11.9449 3.74264C12.1 3.86553 12.1749 4.06343 12.1388 4.25814C12.133 4.29432 11.9826 5.28915 12.8285 6.70107C13.5925 7.97574 13.8125 8.80193 13.8125 10.3867C13.8125 14.2187 10.8827 16.9995 6.84621 16.9995L6.84727 17ZM1.65457 7.76347C1.36287 8.50029 1.06213 9.47969 1.06213 10.3867C1.06213 13.6021 3.45631 15.9355 6.84674 15.9355C10.2675 15.9355 12.7498 13.6021 12.7498 10.3862C12.7498 8.99717 12.5782 8.35292 11.9172 7.24797C11.4752 6.51062 11.2568 5.84722 11.1527 5.31948C11.0474 5.49025 10.9497 5.69826 10.8785 5.94936C10.5544 7.08305 10.6362 8.40878 10.6373 8.42262C10.6527 8.65989 10.5087 8.8796 10.2845 8.95887C10.0602 9.03814 9.81051 8.95993 9.67289 8.76522C9.63304 8.7083 8.68781 7.36926 8.27177 6.467C7.40676 4.59543 7.42111 2.57118 7.50984 1.40558C6.63421 1.91629 5.29047 3.0569 4.85903 5.37747C4.43875 7.63526 5.2554 9.89305 5.2639 9.91487C5.33457 10.0989 5.29738 10.308 5.16773 10.4564C5.03756 10.6038 4.83724 10.6692 4.64384 10.623C4.57795 10.607 3.08279 10.2176 2.11417 8.68968C1.94149 8.41623 1.78634 8.0848 1.6551 7.76294L1.65457 7.76347Z" fill="#FF8400"/>
        </svg>
        ${locale.burn}</li>
        <li style="list-style: none; margin-bottom: 20px"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0952 1.92558C11.0541 1.59676 10.7542 1.36353 10.4254 1.40463C10.0966 1.44573 9.86335 1.7456 9.90446 2.07442C9.95391 2.47002 10.0235 3.28835 10.0844 4.24441L9.05125 3.92653C8.73453 3.82908 8.39878 4.00683 8.30133 4.32354C8.20388 4.64026 8.38163 4.97601 8.69835 5.07346L10.1553 5.52177C10.1648 5.72224 10.1734 5.92333 10.1811 6.12289C10.2125 6.94703 10.2259 7.73112 10.2076 8.32846C10.1983 8.62902 10.1815 8.86733 10.158 9.03427C10.1514 9.08165 10.1449 9.11828 10.1392 9.14558C9.87938 9.38614 9.34303 9.81631 8.76158 10.2815L8.71952 10.3151C8.12891 10.7876 7.49591 11.2939 7.21859 11.5693C7.21849 11.5692 7.21754 11.5699 7.2156 11.5713C7.20771 11.5767 7.1835 11.5935 7.13411 11.621C7.06164 11.6612 6.96295 11.7092 6.83789 11.7647C6.58774 11.8755 6.26876 12 5.91561 12.1342C5.81684 12.1718 5.71505 12.2102 5.61156 12.2493C4.99876 12.4805 4.32568 12.7345 3.86809 12.9633C3.72821 13.0333 3.55518 13.1386 3.39114 13.2396L3.30265 13.2941C3.15642 13.3843 3.00623 13.4769 2.85446 13.5653C2.67128 13.6718 2.50241 13.7622 2.35837 13.8247C2.21521 13.8867 2.14776 13.898 2.13764 13.8997C2.13645 13.8999 2.13605 13.9 2.13642 13.9C1.74433 13.9 1.24496 14.0748 0.90133 14.3324C0.729678 14.4611 0.512979 14.6725 0.431417 14.978C0.334601 15.3407 0.465868 15.6783 0.711779 15.9242C0.948152 16.1606 1.27231 16.2077 1.46245 16.2232C1.68393 16.2414 1.93417 16.2283 2.17048 16.2094C2.32878 16.1967 2.48465 16.1814 2.63833 16.1663C2.98092 16.1326 3.31268 16.1 3.63638 16.1H6.13638C6.33059 16.1 6.57616 16.0552 6.80093 16.0102C6.91308 15.9878 7.03512 15.962 7.16161 15.9353L7.19205 15.9288C7.33068 15.8995 7.4763 15.8689 7.62905 15.8383C8.24357 15.7154 8.94691 15.6 9.63638 15.6C10.3086 15.6 10.7488 15.7097 11.159 15.8269C11.2017 15.8391 11.2449 15.8517 11.2887 15.8644C11.6683 15.9751 12.097 16.1 12.6364 16.1C12.7813 16.1 12.9326 16.1073 13.1088 16.1157C13.2237 16.1212 13.3491 16.1272 13.4902 16.1321C13.8231 16.1435 14.2034 16.1455 14.5834 16.0986C15.3429 16.0048 16.2087 15.697 16.673 14.7683C16.9609 14.1926 17.0801 13.6637 17.0801 13.1641C17.0801 12.6692 16.963 12.2363 16.8253 11.8575C16.757 11.6696 16.6811 11.4887 16.6112 11.3228L16.6034 11.3042C16.5348 11.1414 16.4726 10.9935 16.4175 10.8454C16.3042 10.541 16.2364 10.2736 16.2364 10C16.2364 9.36242 16.3373 8.37949 16.4556 7.46031L16.8233 7.57346C17.1401 7.67091 17.4758 7.49316 17.5733 7.17645C17.6707 6.85973 17.493 6.52398 17.1763 6.42653L16.6242 6.25665C16.6621 6.00556 16.6977 5.7815 16.7282 5.59864C16.7827 5.27177 16.5619 4.96264 16.235 4.90816C15.9082 4.85368 15.599 5.07449 15.5445 5.40136C15.5207 5.54421 15.4933 5.71503 15.4637 5.90654C15.1749 5.8629 14.8898 6.03591 14.8013 6.32354C14.7039 6.64026 14.8816 6.97601 15.1983 7.07346L15.2921 7.10232C15.1585 8.11014 15.0364 9.24941 15.0364 10C15.0364 10.4764 15.1561 10.8965 15.2928 11.2639C15.357 11.4366 15.4284 11.6059 15.4943 11.7625L15.5053 11.7885C15.5761 11.9566 15.6408 12.1116 15.6975 12.2675C15.8097 12.5762 15.8801 12.862 15.8801 13.1641C15.8801 13.4613 15.8118 13.8074 15.5997 14.2317C15.3932 14.6446 15.009 14.8369 14.4363 14.9076C14.1501 14.943 13.8437 14.9435 13.5314 14.9328C13.43 14.9293 13.3214 14.9242 13.2117 14.9191C13.0102 14.9096 12.8052 14.9 12.6364 14.9C12.2758 14.9 12.0071 14.8225 11.6159 14.7096L11.4887 14.6731C11.024 14.5403 10.4642 14.4 9.63638 14.4C8.82585 14.4 8.02919 14.5346 7.39371 14.6616C7.23397 14.6936 7.08272 14.7254 6.944 14.7548L6.91513 14.7609C6.78677 14.788 6.67097 14.8124 6.56559 14.8335C6.32161 14.8823 6.19218 14.9 6.13638 14.9H3.63638C3.3627 14.9 3.0665 14.9212 2.78689 14.9464C2.80351 14.9395 2.81975 14.9326 2.83557 14.9257C3.04353 14.8356 3.25956 14.7179 3.45798 14.6024C3.62435 14.5056 3.79002 14.4034 3.93624 14.3132L4.02 14.2616C4.19476 14.1541 4.32104 14.0785 4.40476 14.0366C4.80165 13.8382 5.40234 13.6112 6.02245 13.3769C6.12871 13.3368 6.23554 13.2964 6.34201 13.2559C6.69466 13.1219 7.04108 12.9872 7.32408 12.8618C7.46559 12.7991 7.60041 12.7347 7.7169 12.6699C7.82331 12.6108 7.95551 12.5294 8.06067 12.4242C8.28033 12.2046 8.86817 11.7329 9.5112 11.2185L9.55351 11.1847C10.1487 10.7086 10.7869 10.1981 11.0607 9.92426C11.1974 9.78755 11.2533 9.61745 11.2777 9.53578C11.3089 9.43092 11.3304 9.31502 11.3464 9.20088C11.3787 8.97068 11.3972 8.68243 11.407 8.36528C11.4266 7.72721 11.412 6.9113 11.3802 6.0771C11.3779 6.01703 11.3755 5.95679 11.373 5.89644L11.9483 6.07346C12.2651 6.17091 12.6008 5.99316 12.6983 5.67645C12.7957 5.35973 12.618 5.02398 12.3013 4.92653L11.3095 4.62138C11.2422 3.46083 11.1565 2.4158 11.0952 1.92558ZM10.1226 9.20754C10.1225 9.20728 10.1237 9.20344 10.1265 9.1968C10.1241 9.20447 10.1227 9.20779 10.1226 9.20754Z" fill="#CC1100"/>
        <path d="M4.17625 2.42653C3.85953 2.32908 3.52378 2.50683 3.42633 2.82354C3.32888 3.14026 3.50663 3.47601 3.82335 3.57346L5.44835 4.07346C5.76506 4.17091 6.10082 3.99316 6.19827 3.67645C6.29572 3.35973 6.11797 3.02398 5.80125 2.92653L4.17625 2.42653Z" fill="#CC1100"/>
        </svg>        
        ${locale.cut}</li>
      <li style="list-style: none; margin-bottom: 20px"><svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.84727 17C2.84156 17 0 14.2187 0 10.3867C0 8.35239 1.21834 6.16056 1.26988 6.06906C1.37562 5.88073 1.58337 5.77806 1.80015 5.802C2.01481 5.82966 2.19121 5.98447 2.24647 6.19355C2.24966 6.20632 2.57802 7.43629 3.01159 8.11938C3.30276 8.57902 3.59818 8.90407 3.93026 9.12964C3.70551 8.15449 3.53336 6.68724 3.81337 5.18169C4.58274 1.04914 7.8313 0.0601571 7.97051 0.0207893C8.14957 -0.0308144 8.33978 0.0154694 8.4758 0.139425C8.61182 0.264444 8.67399 0.451175 8.63892 0.632586C8.63361 0.661313 8.09696 3.55484 9.23561 6.02012C9.33922 6.24409 9.48321 6.50424 9.63836 6.76438C9.68246 6.40688 9.751 6.02703 9.8562 5.65783C10.2738 4.19537 11.354 3.69582 11.3992 3.67561C11.5793 3.59368 11.7897 3.62028 11.9449 3.74264C12.1 3.86553 12.1749 4.06343 12.1388 4.25814C12.133 4.29432 11.9826 5.28915 12.8285 6.70107C13.5925 7.97574 13.8125 8.80193 13.8125 10.3867C13.8125 14.2187 10.8827 16.9995 6.84621 16.9995L6.84727 17ZM1.65457 7.76347C1.36287 8.50029 1.06213 9.47969 1.06213 10.3867C1.06213 13.6021 3.45631 15.9355 6.84674 15.9355C10.2675 15.9355 12.7498 13.6021 12.7498 10.3862C12.7498 8.99717 12.5782 8.35292 11.9172 7.24797C11.4752 6.51062 11.2568 5.84722 11.1527 5.31948C11.0474 5.49025 10.9497 5.69826 10.8785 5.94936C10.5544 7.08305 10.6362 8.40878 10.6373 8.42262C10.6527 8.65989 10.5087 8.8796 10.2845 8.95887C10.0602 9.03814 9.81051 8.95993 9.67289 8.76522C9.63304 8.7083 8.68781 7.36926 8.27177 6.467C7.40676 4.59543 7.42111 2.57118 7.50984 1.40558C6.63421 1.91629 5.29047 3.0569 4.85903 5.37747C4.43875 7.63526 5.2554 9.89305 5.2639 9.91487C5.33457 10.0989 5.29738 10.308 5.16773 10.4564C5.03756 10.6038 4.83724 10.6692 4.64384 10.623C4.57795 10.607 3.08279 10.2176 2.11417 8.68968C1.94149 8.41623 1.78634 8.0848 1.6551 7.76294L1.65457 7.76347Z" fill="#FF8400"/>
      </svg>      
      ${locale.hit}</li>
      <li style="list-style: none; margin-bottom: 20px"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_612_14683)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.75 2.03971V0.65C9.75 0.291015 9.41421 0 9 0C8.58579 0 8.25 0.291015 8.25 0.65V2.03971C5.06686 2.37877 2.52126 4.85143 2.07089 8H0.65C0.291015 8 0 8.33579 0 8.75C0 9.16421 0.291015 9.5 0.65 9.5H2.01758C2.25639 12.8837 4.90017 15.6035 8.25 15.9603V17.35C8.25 17.709 8.58579 18 9 18C9.41421 18 9.75 17.709 9.75 17.35V15.9603C12.9331 15.6212 15.4787 13.1486 15.9291 10H17.35C17.709 10 18 9.66421 18 9.25C18 8.83579 17.709 8.5 17.35 8.5H15.9824C15.7436 5.11626 13.0998 2.39652 9.75 2.03971ZM8.25 5.85C8.25 6.20898 8.58579 6.5 9 6.5C9.41421 6.5 9.75 6.20898 9.75 5.85V3.32139C12.396 3.66747 14.4739 5.81969 14.7057 8.5H12.15C11.791 8.5 11.5 8.83579 11.5 9.25C11.5 9.66421 11.791 10 12.15 10H14.6403C14.2099 12.4443 12.2293 14.3543 9.75 14.6786V12.15C9.75 11.791 9.41421 11.5 9 11.5C8.58579 11.5 8.25 11.791 8.25 12.15V14.6786C5.60398 14.3325 3.52606 12.1803 3.29425 9.5H5.85C6.20898 9.5 6.5 9.16421 6.5 8.75C6.5 8.33579 6.20898 8 5.85 8H3.35973C3.79015 5.55566 5.77069 3.64567 8.25 3.32139V5.85Z" fill="#660900"/>
      </g>
      <defs>
      <clipPath id="clip0_612_14683">
      <rect width="18" height="18" fill="white"/>
      </clipPath>
      </defs>
      </svg>      
      ${locale.gunshot}</li>
      <li style="list-style: none; margin-bottom: 20px"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_612_14686)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.1498 7.75472e-07C14.026 7.75472e-07 13.9032 0.00470051 13.782 0.0139491C13.7338 0.00394529 13.6975 0.00186619 13.6905 0.00146924C13.6708 0.000208239 13.654 1.39865e-05 13.6458 7.75472e-07C13.6285 -2.44002e-05 13.6135 0.000569142 13.605 0.000947035C13.5865 0.0017719 13.5665 0.00312332 13.5485 0.00445483C13.5109 0.00722382 13.4609 0.0114883 13.4026 0.0167544C13.2849 0.0273749 13.1211 0.0431562 12.928 0.0622559C12.5413 0.100511 12.0304 0.152744 11.5205 0.205298C11.2016 0.238158 10.8824 0.271224 10.5938 0.301114L10.1149 0.350684C9.92216 0.370604 9.76105 0.387182 9.64671 0.398767L9.5139 0.412025L9.49283 0.414011C9.15302 0.419114 8.74809 0.513249 8.43381 0.844722C8.37423 0.907553 8.32172 0.974947 8.27571 1.04635C4.18571 1.48255 1 4.94424 1 9.15C1 13.6511 4.64888 17.3 9.15 17.3C13.6511 17.3 17.3 13.6511 17.3 9.15C17.3 8.79102 17.009 8.5 16.65 8.5C16.291 8.5 16 8.79102 16 9.15C16 12.9332 12.9332 16 9.15 16C5.36685 16 2.3 12.9332 2.3 9.15C2.3 5.7554 4.76924 2.93752 8.00957 2.39451C8.04338 2.80583 8.16874 3.17571 8.43381 3.45528C8.74571 3.78424 9.1469 3.87945 9.48511 3.88586L9.48964 3.88639L9.5955 3.89949L9.97806 3.9477C10.2963 3.98765 10.7269 4.04094 11.1853 4.09384C12.0798 4.19708 13.1477 4.30729 13.6596 4.2996C13.7018 4.29897 13.7429 4.29434 13.7826 4.2861C13.9036 4.29532 14.0262 4.3 14.1498 4.3C14.9377 4.3 15.6825 4.10973 16.252 3.76803C16.8085 3.4341 17.2998 2.88223 17.2998 2.15C17.2998 1.41777 16.8085 0.865903 16.252 0.53197C15.6825 0.190275 14.9377 7.75472e-07 14.1498 7.75472e-07ZM10.14 2.65782C10.4081 2.69147 10.7545 2.73442 11.129 2.77848C11.0471 2.58711 10.9998 2.37724 10.9998 2.15C10.9998 1.93557 11.0419 1.7366 11.1155 1.55405L10.2486 1.6438C10.0558 1.66372 9.89352 1.68042 9.77776 1.69214L9.63931 1.70596L9.59628 1.71L9.57733 1.71159L9.56312 1.71256C9.56011 1.71274 9.54301 1.71379 9.52261 1.71379C9.45545 1.71379 9.4158 1.72261 9.39592 1.72951C9.38087 1.73473 9.37793 1.73827 9.37729 1.73905C9.37583 1.74058 9.35769 1.7597 9.33883 1.81999C9.31895 1.88356 9.29988 1.98825 9.29988 2.15C9.29988 2.31175 9.31895 2.41644 9.33883 2.48001C9.35769 2.5403 9.3757 2.55927 9.37716 2.5608C9.3778 2.56158 9.38087 2.56527 9.39592 2.57049C9.4158 2.57739 9.45545 2.58621 9.52261 2.58621C9.54524 2.58621 9.56336 2.58744 9.56796 2.58776L9.5857 2.58916L9.60623 2.59122L9.64439 2.59563C9.67242 2.59899 9.71091 2.60377 9.75738 2.60961L10.14 2.65782ZM9.46616 3.88365C9.45397 3.88233 9.45578 3.88276 9.46616 3.88365V3.88365ZM9.47105 0.415933L9.47812 0.41538C9.47294 0.415828 9.47082 0.415973 9.47105 0.415933ZM15.5831 1.64671C15.9314 1.85567 15.9998 2.05381 15.9998 2.15C15.9998 2.2462 15.9314 2.44433 15.5831 2.65329C15.2478 2.85449 14.7426 3 14.1498 3C13.557 3 13.0518 2.85449 12.7165 2.65329C12.3682 2.44433 12.2998 2.2462 12.2998 2.15C12.2998 2.05381 12.3682 1.85567 12.7165 1.64671C13.0518 1.44551 13.557 1.3 14.1498 1.3C14.7426 1.3 15.2478 1.44551 15.5831 1.64671Z" fill="#878C2E"/>
      </g>
      <defs>
      <clipPath id="clip0_612_14686">
      <rect width="18" height="18" fill="white"/>
      </clipPath>
      </defs>
      </svg>
      
      ${locale.hit}</li>
      <li style="list-style: none; margin-bottom: 20px"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.03829 3.88463C6.99417 3.88463 7.76906 3.49719 7.76906 3.01925C7.76906 2.54131 6.99417 2.15386 6.03829 2.15386C5.08241 2.15386 4.30752 2.54131 4.30752 3.01925C4.30752 3.49719 5.08241 3.88463 6.03829 3.88463Z" fill="#0053B3"/>
      <path d="M6.63848 9.07694C6.63848 8.74557 6.36985 8.47694 6.03848 8.47694C5.70711 8.47694 5.43848 8.74557 5.43848 9.07694V10.2077H4.30752C3.97615 10.2077 3.70752 10.4763 3.70752 10.8077C3.70752 11.1391 3.97615 11.4077 4.30752 11.4077H5.43848V12.5385C5.43848 12.8699 5.70711 13.1385 6.03848 13.1385C6.36985 13.1385 6.63848 12.8699 6.63848 12.5385V11.4077H7.76906C8.10043 11.4077 8.36906 11.1391 8.36906 10.8077C8.36906 10.4763 8.10043 10.2077 7.76906 10.2077H6.63848V9.07694Z" fill="#0053B3"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6768 3.30772C10.6768 3.46095 10.6594 3.60875 10.6266 3.75085C10.6273 3.81865 10.6281 3.88894 10.6288 3.96156H17.0001C17.1839 3.96156 17.3529 4.06242 17.4402 4.22421C17.5275 4.38599 17.5189 4.58261 17.4179 4.73621L15.6762 7.38594L17.4011 9.70132C17.5409 9.88898 17.5318 10.1485 17.3793 10.326L15.7062 12.2724L17.4011 14.5475C17.5141 14.6991 17.5318 14.9015 17.447 15.0705C17.3621 15.2395 17.1892 15.3462 17.0001 15.3462H10.5867C10.3812 16.0251 9.84577 16.5757 9.20209 16.9609C8.3633 17.4628 7.24333 17.7539 6.03836 17.7539C4.8334 17.7539 3.71343 17.4628 2.87463 16.9609C2.04803 16.4662 1.3999 15.6988 1.3999 14.7371C1.3999 14.6674 1.40468 11.842 1.41405 9.01807C1.41874 7.60601 1.42457 6.19352 1.43154 5.12561C1.43502 4.59184 1.43878 4.14308 1.44285 3.82319L1.44417 3.72409C1.41526 3.59022 1.3999 3.45136 1.3999 3.30772C1.3999 2.36223 2.06512 1.62352 2.88506 1.15499C3.72197 0.67675 4.8381 0.400024 6.03836 0.400024C7.23862 0.400024 8.35476 0.67675 9.19167 1.15499C10.0116 1.62352 10.6768 2.36223 10.6768 3.30772ZM2.5999 3.30772C2.5999 2.9787 2.83873 2.56356 3.48042 2.19688C4.10515 1.83989 5.00824 1.60002 6.03836 1.60002C7.06848 1.60002 7.97158 1.83989 8.5963 2.19688C9.238 2.56356 9.47683 2.9787 9.47683 3.30772L9.47678 3.31556L9.42105 3.31637C9.42224 3.3986 9.4234 3.48732 9.42455 3.58202C9.32379 3.85122 9.06965 4.14807 8.5963 4.41856C7.97158 4.77554 7.06848 5.01541 6.03836 5.01541C5.00824 5.01541 4.10515 4.77554 3.48042 4.41856C2.99849 4.14317 2.7438 3.84045 2.64685 3.5674L2.64888 3.4707C2.64993 3.42751 2.65091 3.39723 2.65175 3.37837L2.65231 3.36723C2.65224 3.36819 2.6517 3.37527 2.65056 3.38469C2.64997 3.38956 2.64884 3.39838 2.64695 3.40958C2.64544 3.41853 2.64146 3.44116 2.63347 3.46968L2.61746 3.46519C2.60555 3.41099 2.5999 3.35833 2.5999 3.30772ZM10.676 14.3462H16.0041L14.6651 12.5487C14.5253 12.3611 14.5344 12.1016 14.6869 11.9241L16.36 9.97769L14.6651 7.70258C14.5395 7.53401 14.5328 7.30489 14.6482 7.12923L16.0731 4.96156H10.6374C10.6597 7.95978 10.6728 12.9229 10.676 14.3462ZM9.19167 5.46045C9.27622 5.41213 9.35913 5.36094 9.43984 5.30695C9.46421 8.83885 9.47683 14.6252 9.47683 14.7371C9.47683 15.1101 9.22091 15.5511 8.58588 15.9312C7.96304 16.3039 7.06378 16.5539 6.03836 16.5539C5.01295 16.5539 4.11369 16.3039 3.49085 15.9312C2.85582 15.5511 2.5999 15.1101 2.5999 14.7371C2.5999 14.6695 2.60468 11.8457 2.61405 9.02205C2.61849 7.68377 2.62396 6.34623 2.63043 5.30262C2.71317 5.35821 2.79825 5.41084 2.88506 5.46045C3.72197 5.93868 4.8381 6.21541 6.03836 6.21541C7.23862 6.21541 8.35476 5.93868 9.19167 5.46045Z" fill="#0053B3"/>
      </svg>      
      ${locale.cg}</li>
      <li style="list-style: none; margin-bottom: 20px"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_612_14692)">
      <path d="M5.40604 4.95734C5.17173 4.72302 4.79183 4.72302 4.55752 4.95734C4.3232 5.19165 4.3232 5.57155 4.55752 5.80586L5.51211 6.76046C5.74643 6.99477 6.12632 6.99477 6.36064 6.76046C6.59495 6.52614 6.59495 6.14625 6.36064 5.91193L5.40604 4.95734Z" fill="#0F8A61"/>
      <path d="M8.26983 7.82112C8.03551 7.5868 7.65561 7.5868 7.4213 7.82112C7.18698 8.05543 7.18698 8.43533 7.4213 8.66965L9.33049 10.5788C9.5648 10.8131 9.9447 10.8131 10.179 10.5788C10.4133 10.3445 10.4133 9.96462 10.179 9.73031L8.26983 7.82112Z" fill="#0F8A61"/>
      <path d="M12.0882 11.6395C11.8539 11.4052 11.474 11.4052 11.2397 11.6395C11.0054 11.8738 11.0054 12.2537 11.2397 12.488L12.1943 13.4426C12.4286 13.6769 12.8085 13.6769 13.0428 13.4426C13.2771 13.2083 13.2771 12.8284 13.0428 12.5941L12.0882 11.6395Z" fill="#0F8A61"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.09644 1.45717L1.20735 5.34626C0.3482 6.20541 0.3482 7.59837 1.20735 8.45753L9.69263 16.9428C10.5518 17.802 11.9448 17.802 12.8039 16.9428L16.693 13.0537C17.5521 12.1946 17.5521 10.8016 16.693 9.94245L8.20771 1.45717C7.34856 0.598017 5.95559 0.598017 5.09644 1.45717ZM2.05588 7.609C1.66536 7.21847 1.66536 6.58531 2.05588 6.19479L5.94497 2.3057C6.33549 1.91517 6.96866 1.91517 7.35918 2.3057L15.8445 10.791C16.235 11.1815 16.235 11.8147 15.8445 12.2052L11.9554 16.0943C11.5649 16.4848 10.9317 16.4848 10.5412 16.0943L2.05588 7.609Z" fill="#0F8A61"/>
      </g>
      <defs>
      <clipPath id="clip0_612_14692">
      <rect width="18" height="18" fill="white"/>
      </clipPath>
      </defs>
      </svg>
      
      ${locale.TH}</li>
      </ul>
      <ul style="padding:0; border:1px solid ${colors.surface}">
      <li style="padding: 10px; list-style: none; border:1px solid ${colors.surface}">${locale.mainInjuryTitle}</li>
      <li style="padding: 10px; list-style: none; border:1px solid ${colors.surface}">${mainInjury}</li>
      </ul>
      </div>
  </div>`;
}

export function returnConsciousnessTable(data: string[]) {
  return `
  <div style="width:100%; text-align:center; background-color:${
    colors.surface
  }"><strong>${locale.avpu}</strong></div>
  <table style="width:100%; border-collapse: collapse; margin-bottom: 40px" border="1">
  <tr>
  <th style="border-color: ${colors.surface}; text-align:right">${
    locale.reasons
  }</th>
  </tr>
  <td style="border-color: ${colors.surface};">${data
    .map((item) => locale[item])
    .join(", ")}</td>
  </tr>
  <tr>
  </table>`;
}

export function returnAirwayTable(data: IAirway) {
  return `
  <div style="width:100%; text-align:center; background-color:${
    colors.surface
  }"><strong>${locale.aSection}</strong></div>
  <div style="display: flex; flex-direction:row">
  <table style="width:100%; border-collapse: collapse; margin-bottom: 40px; flex: 1" border="1">
  <tr>
    <th  style="border-color: ${colors.surface}; text-align:right">${
    locale.airWayInjury
  }</th>
  </tr>
  <tr>
    <th rowspan="${data.actions.length}" style="border-color: ${
    colors.surface
  }; text-align:right">${data.fulfill ? locale.yes : locale.no}</th>  
  </tr>
  <table>
  <table style="width:100%; border-collapse: collapse; margin-bottom: 40px; flex: 2" border="1">
  <tr>
   
    <th style="border-color: ${colors.surface}; text-align:right">${
    locale.actionTaken
  }</th>
    <th style="border-color: ${colors.surface}; text-align:right">${
    locale.actionTime
  }</th>
    <th style="border-color: ${colors.surface}; text-align:right">${
    locale.actionResult
  }</th>
  </tr>
  
    ${data.actions
      .map(
        (action) => `<tr>
    <td>${locale[action.action]}</td>
    <td>${convertor("time", action.time)}</td>
    <td>${action.successful ? locale.yes : locale.no}</td>
    </tr>`
      )
      .join("")}
 
  
  </table>
  </div>`;
}

export function returnBreathingTable(breathing: IBreathing) {
  return `
  <div style="width:100%; text-align:center; background-color:${
    colors.surface
  }"><strong>${locale.bSection}</strong></div>
  <table style="width:100%; border-collapse: collapse; margin-bottom: 40px" border="1">
  <tr>
    <th style="border-color: ${colors.surface}; text-align:right">${
    locale.breathingInjury
  }</th>
    <th style="border-color: ${colors.surface}; text-align:right">${
    locale.saturation
  }</th>
    <th style="border-color: ${colors.surface}; text-align:right">${
    locale.breathingCount
  }</th>
  </tr>
  <tr>
    <td>${breathing.fulfill ? locale.yes : locale.no}</td>
    <td>${breathing.saturation}</td>
    <td>${breathing.breathingCount}</td>
  </tr>
  <tr>
    <th style="border-color: ${colors.surface}; text-align:right">${
    locale.actionTaken
  }</th>
    <th style="border-color: ${colors.surface}; text-align:right">${
    locale.actionTime
  }</th>
    <th style="border-color: ${colors.surface}; text-align:right">${
    locale.actionResult
  }</th>
  </tr>
  ${breathing.actions
    .map(
      (action) => `<tr>
    
    <td>${locale[action.action]}</td>
    <td>${convertor("time", action.time)}</td>
    <td>${action.successful ? locale.yes : locale.no}</td>
  </tr>`
    )
    .join("")}
  
  </table>`;
}

export function returnMeasurementsTable(measurements: IMeasurements) {
  return `
  <div style="width:100%; text-align:center; background-color:${
    colors.surface
  }"><strong>${locale.cSection}</strong></div>
  <table style="width:100%; border-collapse: collapse; margin-bottom: 40px" border="1">
  <tr>
    <th style="border-color: ${colors.surface}; text-align:right">${
    locale.palpated
  }</th>
    <th style="border-color: ${colors.surface}; text-align:right">${
    locale.shock
  }</th>
    <th style="border-color: ${colors.surface}; text-align:right">${
    locale.puls
  }</th>
    <th style="border-color: ${colors.surface}; text-align:right">${
    locale.bloodPressure
  }</th>
  </tr>
  <tr>
    <td>${measurements.palpated ? locale.yes : locale.no}</td>
    <td>${measurements.shock ? locale.yes : locale.no}</td>
    <td>${measurements.puls}</td>
    <td>${measurements.bloodPressure}</td>
  </tr>
  <tr>
    <th style="border-color: ${colors.surface}; text-align:right">${
    locale.actionTaken
  }</th>
    <th style="border-color: ${colors.surface}; text-align:right">${
    locale.actionTime
  }</th>
    <th style="border-color: ${colors.surface}; text-align:right">${
    locale.actionResult
  }</th>
  </tr>
  ${measurements.actions
    .map(
      (action) => `<tr>
    
    <td>${locale[action.action]}</td>
    <td>${convertor("time", action.time)}</td>
    <td>${action.successful ? locale.yes : locale.no}</td>
  </tr>`
    )
    .join("")}
  
  </table>`;
}
export function returnESectionTable(data: string[]) {
  return `
  <div style="width:100%; text-align:center; background-color:${
    colors.surface
  }"><strong>${locale.eSection}</strong></div>
  <table style="width:100%; border-collapse: collapse; margin-bottom: 40px" border="1">
  <tr>
    <td>${data.map((m) => locale[m]).join(", ")}</td>
  </tr>
  </table>`;
}

export function returnMedicationTable(medications: IMedicationsAndFluid) {
  const otherMedications =
    medications.actions.filter(
      (med) => med.treatment === MEDICATION_TREATMENT.OTHER
    ) ?? [];
  const knownMedications =
    medications.actions.filter(
      (med) => med.treatment !== MEDICATION_TREATMENT.OTHER
    ) ?? [];
  return `
  <div style="width:100%; text-align:center; background-color:${
    colors.surface
  }"><strong>${locale.medicationsAndFluid}</strong></div>
  <table style="width:100%; border-collapse: collapse; margin-bottom: 40px" border="1">
  <tr>
    <th>${locale.medicationsAndFluid}</th>
    <th>${locale.type}</th>
    <th>${locale.dose}</th>
    <th>${locale.time}</th>
  </tr>
  ${knownMedications
    .map(
      (med) => `<tr>
    <td>${locale[med.treatment]}</td>
    <td>${locale[med.type]}</td>
    <td>${locale[med.dose]}</td>
    <td>${convertor("time", med.time)}</td>
  </tr>`
    )
    .join("")}
    ${otherMedications
      .map(
        (med) => `<tr>
      <td colspan="3">${med.other}</td>
      <td>${convertor("time", med.time)}</td>
    </tr>`
      )
      .join("")}
  </table>`;
}

export function returnPrognosisTable(prognosis: string[]) {
  return `
  <div style="width:100%; text-align:center; background-color:${
    colors.surface
  }"><strong>${locale.prognosis}</strong></div>
  <table style="width:100%; border-collapse: collapse; margin-bottom: 40px" border="1">
  <tr>
    <td>${prognosis.join(". ")}</td>
  </tr>
  </table>`;
}
export function returnCareProviderTable(careProvider: ICareProvider[]) {
  return `
  <div style="width:100%; text-align:center; background-color:${
    colors.surface
  }"><strong>${locale.careProviderSection}</strong></div>
  <table style="width:100%; border-collapse: collapse; margin-bottom: 40px" border="1">
  <tr>
    <th style="text-align: right">${locale.careProviderName}</th>
  </tr>
  ${careProvider
    .map(
      (provider) =>
        `<tr><td>${provider.full_name} ${provider.idf_id}, ${
          locale[provider.role]
        }</td></tr>`
    )
    .join("")}
  </table>`;
}

export function returnGuidelinesTable(guides: ITreatmentGuide[]) {
  return `
  <div style="width:100%; text-align:center; background-color:${
    colors.surface
  }"><strong>${locale.treatments}</strong></div>
  <table border="1">
      <tr>
          <td>${locale.care_guide}</td>
          <td>${locale.order_time}</td>
          <td>${locale.execution_time}</td>

      </tr>
    ${guides.map(
      (guide) => ` <tr>
          <td colspan="2">${guide.care_guide}</td>
          <td>${timeToDate(new Date(guide.order_time))}</td>
          <td>${timeToDate(new Date(guide.execution_time))}</td>
      </tr>`
    )}
  </table>`;
}

export function returnMeasurementsInformationTable(
  measurements: ITreatmentGuideMeasurementsInformation
) {
  return `
  <div style="width:100%; text-align:center; background-color:${
    colors.surface
    }"><strong>${locale.measurements}</strong></div>
  <table border="1">
                <tr>
                    <td>${locale.treatment_time}</td>
                    <td>${locale.treatment_provider}</td>
                    <td>${locale.treatment_puls}</td>
                    <td>${locale.treatment_bloodPressure}</td>
                    <td>${locale.treatment_breath}</td>
                    <td>${locale.treatment_spo2}</td>
                    <td>${locale.etcos}</td>
                    <td>${locale.pain}</td>
                    <td>${locale.prpo}</td>
                    <td>${locale.GCS}</td>
                    <td>${locale.urine}</td>
                    <td>${locale.treatment_blood}</td>
  
                </tr>
              ${measurements.actions.map((measurement) => {
                if (!measurement.provider) {
                  return "";
                }
                return `<tr>
                    <td>${timeToDate(new Date(measurement.time))}</td>
                    <td>${measurement.provider?.full_name}, ${
                  measurement.provider?.idf_id
                }, ${locale[measurement.provider?.role]}</td>
                  <td>${measurement.puls}</td>
                  <td>${measurement.bloodPressure}</td>
                  <td>${measurement.breath}</td>
                  <td>${measurement.spo2}</td>
                  <td>${measurement.etcos}</td>
                  <td>${measurement.pain}</td>
                  <td>${measurement.prpo}</td>
                  <td>${measurement.GCS}</td>
                  <td>${measurement.urine}</td>
                  <td>${measurement.blood}</td>
                </tr>`;
              })}
              </table>`;
}
