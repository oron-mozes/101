import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

export function ExportPatientIcon({ active }: { active: boolean }) {
  return (
    <>
      {active && (
        <Svg width={25} height={24} viewBox="0 0 25 24" fill="none">
          <Path
            d="M5.5 2a3 3 0 00-3 3v14a3 3 0 003 3h14a3 3 0 003-3V5a3 3 0 00-3-3h-14z"
            fill="#00244D"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5 7a1 1 0 011 1v8a1 1 0 11-2 0V8a1 1 0 011-1z"
            fill="#fff"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.5 12a1 1 0 011-1h8a1 1 0 110 2h-8a1 1 0 01-1-1z"
            fill="#fff"
          />
        </Svg>
      )}
      {!active && (
        <Svg width={25} height={24} viewBox="0 0 25 24" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.5 4a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1h-14zm-3 1a3 3 0 013-3h14a3 3 0 013 3v14a3 3 0 01-3 3h-14a3 3 0 01-3-3V5z"
            fill="#496C83"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5 7a1 1 0 011 1v8a1 1 0 11-2 0V8a1 1 0 011-1z"
            fill="#496C83"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.5 12a1 1 0 011-1h8a1 1 0 110 2h-8a1 1 0 01-1-1z"
            fill="#496C83"
          />
        </Svg>
      )}
    </>
  );
}
