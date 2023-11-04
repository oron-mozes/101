import Svg, {
  ClipPath,
  Defs,
  G,
  Path,
  Rect,
  Text,
  ForeignObject,
} from "react-native-svg";

export function Gunshot({
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
        fill="#cfcf"
      >
        <G clipPath="url(#clip0_197_31171)">
          <Rect
            y={3.99951}
            width={24}
            height={16.001}
            rx={8.0005}
            fill="#4B1B27"
          />
        </G>
        <G clipPath="url(#clip1_197_31171)">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M41 2.72V.867C41 .388 40.552 0 40 0s-1 .388-1 .867V2.72a9.338 9.338 0 00-8.239 7.947h-1.894c-.479 0-.867.447-.867 1 0 .552.388 1 .867 1h1.823A9.336 9.336 0 0039 21.28v1.853c0 .479.448.867 1 .867s1-.388 1-.867V21.28a9.338 9.338 0 008.239-7.947h1.894c.479 0 .867-.447.867-1 0-.552-.388-1-.867-1H49.31A9.336 9.336 0 0041 2.72zM39 7.8c0 .479.448.867 1 .867s1-.388 1-.867V4.429a7.64 7.64 0 016.608 6.904H44.2c-.479 0-.867.448-.867 1 0 .553.388 1 .867 1h3.32A7.642 7.642 0 0141 19.572V16.2c0-.479-.448-.867-1-.867s-1 .388-1 .867v3.372a7.64 7.64 0 01-6.608-6.905H35.8c.479 0 .867-.448.867-1 0-.553-.388-1-.867-1h-3.32A7.642 7.642 0 0139 4.429V7.8z"
            fill="#660900"
          />
        </G>
        <Defs>
          <ClipPath id="clip0_197_31171">
            <Rect
              y={3.99951}
              width={24}
              height={16.001}
              rx={8.0005}
              fill="#fff"
            />
          </ClipPath>
          <ClipPath id="clip1_197_31171">
            <Path fill="#fff" transform="translate(28)" d="M0 0H24V24H0z" />
          </ClipPath>
        </Defs>
      </ForeignObject>
      <Text x={xPos - 10} fill="#fff" y={yPos + 6} fontSize="12">
        {text}
      </Text>
    </>
  );
}
