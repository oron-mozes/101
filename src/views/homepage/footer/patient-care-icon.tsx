import Svg, { Path } from "react-native-svg";

export function PatientCareIcon({
  active,
  invert = false,
}: {
  active: boolean;
  invert?: boolean;
}) {
  const invertColor = invert ? "white" : "#496C83";
  return (
    <>
      {!active && (
        <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 2a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1H3zM0 3a3 3 0 013-3h14a3 3 0 013 3v14a3 3 0 01-3 3H3a3 3 0 01-3-3V3z"
            fill={invertColor}
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 5a1 1 0 011 1v8a1 1 0 11-2 0V6a1 1 0 011-1z"
            fill={invertColor}
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
            fill={invertColor}
          />
        </Svg>
      )}
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
    </>
  );
}
