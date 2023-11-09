import Svg, { Path } from "react-native-svg";

export function PatientStatusIcon({ active }: { active: boolean }) {
  return (
    <>
      {!active && (
        <Svg width={25} height={24} viewBox="0 0 25 24" fill="none">
          <Path
            d="M21.834 7h-13c-.6 0-1-.4-1-1s.4-1 1-1h13c.6 0 1 .4 1 1s-.4 1-1 1zM21.834 13h-13c-.6 0-1-.4-1-1s.4-1 1-1h13c.6 0 1 .4 1 1s-.4 1-1 1zM21.834 19h-13c-.6 0-1-.4-1-1s.4-1 1-1h13c.6 0 1 .4 1 1s-.4 1-1 1zM3.833 7h-.2c-.1 0-.1 0-.2-.1-.1 0-.1-.1-.2-.1s-.1-.1-.1-.1c-.1-.1-.2-.2-.2-.3-.1-.1-.1-.3-.1-.4 0-.1 0-.3.1-.4.1-.1.1-.2.2-.3.3-.3.7-.4 1.1-.2.1.1.2.1.3.2.2.2.3.4.3.7 0 .3-.1.5-.3.7-.2.2-.4.3-.7.3zM3.833 13c-.3 0-.5-.1-.7-.3-.2-.2-.3-.4-.3-.7v-.2c0-.1 0-.1.1-.2 0-.1.1-.1.1-.2s.1-.1.1-.1c.1-.1.2-.2.3-.2.4-.2.8-.1 1.1.2l.1.1c0 .1.1.1.1.2s0 .1.1.2v.2c0 .3-.1.5-.3.7-.2.2-.4.3-.7.3zM3.833 19c-.3 0-.5-.1-.7-.3-.2-.2-.3-.4-.3-.7 0-.1 0-.3.1-.4.1-.1.1-.2.2-.3.4-.4 1-.4 1.4 0 .2.2.3.4.3.7 0 .3-.1.5-.3.7-.2.2-.4.3-.7.3z"
            fill="#496C83"
          />
        </Svg>
      )}
      {active && (
        <Svg width={25} height={24} viewBox="0 0 25 24" fill="none">
          <Path
            d="M5.333 2a3 3 0 00-3 3v14a3 3 0 003 3h14a3 3 0 003-3V5a3 3 0 00-3-3h-14z"
            fill="#00244D"
          />
          <Path
            d="M17.333 10.004h-7c-.6 0-1-.4-1-1s.4-1 1-1h7c.6 0 1 .4 1 1s-.4 1-1 1zM17.333 16.004h-7c-.6 0-1-.4-1-1s.4-1 1-1h7c.6 0 1 .4 1 1s-.4 1-1 1zM7.333 10.004c-.3 0-.5-.1-.7-.3-.2-.2-.3-.4-.3-.7v-.2c0-.1 0-.1.1-.2 0-.1.1-.1.1-.2s.1-.1.1-.1c.1-.1.2-.2.3-.2.4-.2.8-.1 1.1.2l.1.1c0 .1.1.1.1.2s0 .1.1.2v.2c0 .3-.1.5-.3.7-.2.2-.4.3-.7.3zM7.333 16.004c-.3 0-.5-.1-.7-.3-.2-.2-.3-.4-.3-.7 0-.1 0-.3.1-.4.1-.1.1-.2.2-.3.4-.4 1-.4 1.4 0 .2.2.3.4.3.7 0 .3-.1.5-.3.7-.2.2-.4.3-.7.3z"
            fill="#fff"
          />
        </Svg>
      )}
    </>
  );
}
