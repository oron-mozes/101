import {
  ClipPath,
  Defs,
  G,
  Path,
  Rect,
  Text,
  ForeignObject,
} from "react-native-svg";

export function Sharpnel({
  xPos,
  yPos,
  text,
}: {
  xPos: number;
  yPos: number;
  text: string;
}) {
  return (
    <>
      <ForeignObject
        y={yPos - 10}
        x={xPos - 20}
        width={100}
        height={50}
        fill="none"
      >
        <G clipPath="url(#clip0_197_31174)">
          <Rect
            y={3.99951}
            width={24}
            height={16.001}
            rx={8.0005}
            fill="#C10"
          />
        </G>
        <G clipPath="url(#clip1_197_31174)">
          <G clipPath="url(#clip2_197_31174)">
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M26.815.815a.733.733 0 01.944-.079l8.63 6.148 1.587-4.463a.733.733 0 011.382 0l1.64 4.614 4.433-2.098a.733.733 0 01.976.978L44.3 10.337l4.611 1.639a.733.733 0 010 1.382L44.3 14.997l2.107 4.433a.733.733 0 01-.977.977L40.997 18.3l-1.64 4.612a.733.733 0 01-1.381 0l-1.64-4.611-4.42 2.106a.733.733 0 01-.979-.976l2.098-4.434-4.614-1.64a.733.733 0 010-1.381l4.463-1.586-6.148-8.631a.733.733 0 01.079-.944zm3.647 3.647l4.18 5.868a.733.733 0 01-.352 1.117l-3.433 1.22 3.433 1.22a.733.733 0 01.417 1.004l-1.563 3.306 3.296-1.57a.733.733 0 011.007.416l1.22 3.434 1.22-3.434a.733.733 0 011.006-.416l3.304 1.57-1.57-3.304a.733.733 0 01.416-1.006l3.434-1.22-3.434-1.22a.733.733 0 01-.416-1.007l1.57-3.297-3.306 1.564a.733.733 0 01-1.004-.417l-1.22-3.433-1.22 3.433a.734.734 0 01-1.117.352l-5.867-4.18z"
              fill="#C10"
            />
          </G>
        </G>
        <Defs>
          <ClipPath id="clip0_197_31174">
            <Rect
              y={3.99951}
              width={24}
              height={16.001}
              rx={8.0005}
              fill="#fff"
            />
          </ClipPath>
          <ClipPath id="clip1_197_31174">
            <Path fill="#fff" transform="translate(26)" d="M0 0H24V24H0z" />
          </ClipPath>
          <ClipPath id="clip2_197_31174">
            <Path fill="#fff" transform="translate(26)" d="M0 0H24V24H0z" />
          </ClipPath>
        </Defs>
      </ForeignObject>
      <Text x={xPos - 10} fill="#fff" y={yPos + 6} fontSize="12">
        {text}
      </Text>
    </>
  );
}
