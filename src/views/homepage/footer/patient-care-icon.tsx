import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

export function PatientCareIcon({ active }: { active: boolean }) {
  return (
    <>
      {!active && (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.739 10.261a.892.892 0 010 1.262l-5.539 5.8a.892.892 0 01-1.262 0l-2.677-2.677a.892.892 0 111.262-1.262l2.046 2.046 4.908-5.169a.892.892 0 011.262 0z"
            fill="#496C83"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 5a1 1 0 00-1 1v14a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 110-2h2a3 3 0 013 3v14a3 3 0 01-3 3H6a3 3 0 01-3-3V6a3 3 0 013-3h2a1 1 0 010 2H6z"
            fill="#496C83"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 3a2 2 0 012-2h6a2 2 0 012 2v2a2 2 0 01-2 2H9a2 2 0 01-2-2V3zm8 0H9v2h6V3z"
            fill="#496C83"
          />
        </Svg>
      )}
      {active && (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 5a1 1 0 00-1 1v14a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 110-2h2a3 3 0 013 3v14a3 3 0 01-3 3H6a3 3 0 01-3-3V6a3 3 0 013-3h2a1 1 0 010 2H6z"
            fill="#00244D"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 3a2 2 0 012-2h6a2 2 0 012 2v2a2 2 0 01-2 2H9a2 2 0 01-2-2V3zm8 0H9v2h6V3z"
            fill="#00244D"
          />
          <Path
            d="M4.5 5l2-1 .5.5L9 6l3.5-.5L14 6l1.5-.5 1-1.5h2L20 5.5v15l-1.5 2-13-.5L4 20.5 4.5 5z"
            fill="#00244D"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.739 10.261a.892.892 0 010 1.262l-5.539 5.8a.892.892 0 01-1.262 0l-2.677-2.677a.892.892 0 111.262-1.262l2.046 2.046 4.908-5.169a.892.892 0 011.262 0z"
            fill="#fff"
          />
        </Svg>
      )}
    </>
  );
}
