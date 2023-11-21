import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import Svg, { Path } from "react-native-svg";
import { StackNavigation } from "../../interfaces";
import { useMemo } from "react";
import { Icon } from "react-native-paper";
import { ROUTES } from "../../routes";
import { TAB_STATUS } from "../../views/homepage";

export function Logo101() {
  const navigation = useNavigation<StackNavigation>();
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate(ROUTES.STATION)}
      >
        <View style={{ marginRight: 10 }}>
          <Icon size={30} source="cog-outline" color="white" />
        </View>
      </TouchableWithoutFeedback>
      {/* <Svg
        onPress={() =>
          navigation.navigate(ROUTES.HOME, { tab: TAB_STATUS.STATUS })
        }
        width={56}
        height={39}
        viewBox="0 0 56 39"
        fill="none"
      >
        <Path
          d="M0 0v4.177h56V0H0zM2.672 12.901a30.478 30.478 0 00-1.806.01c-.584.04-.826-.204-.866-.794l3.423-3.763h7.61v16.722H3.705V12.911c-.361 0-.703-.005-1.033-.01zM29.799 12.076c.02.61-.222.835-.826.814-.537-.009-1.074-.002-1.61.005a43.04 43.04 0 01-2.014-.005c-.846-.06-1.087.244-1.087 1.078.013 3.335.009 6.678.004 10.018v.036c-.002 1.661-.004 3.322-.004 4.98v1.587c-.277 0-.546.004-.808.007-.632.008-1.226.016-1.81-.027-.282-.02-.604-.244-.825-.468l-.49-.486c-.988-.978-1.98-1.96-2.913-2.973a1.896 1.896 0 01-.503-1.24 779.84 779.84 0 01-.02-11.881c0-.407.18-.875.442-1.16a72.396 72.396 0 013.524-3.52c.262-.264.685-.467 1.027-.467 1.37-.023 2.732-.02 4.092-.017 1.02.003 2.038.005 3.055-.003.544 0 .786.203.766.773-.02.976-.04 1.973 0 2.95z"
          fill="#fff"
        />
        <Path
          d="M37.55 12.3a19.142 19.142 0 00-1.079-1.095c-.556-.535-1.111-1.07-1.558-1.692-.941-1.268-2.085-1.195-3.321-1.116-.272.017-.548.034-.827.038v17.699H25.39v4.455c.634 0 1.26-.009 1.88-.018 1.471-.02 2.912-.041 4.342.059 1.53.102 2.718-.244 3.664-1.526.547-.724 1.235-1.341 1.916-1.951l.138-.124c.604-.529.866-1.14.845-1.953-.007-1.418-.006-2.84-.005-4.262v-.003c.001-2.37.003-4.743-.035-7.107 0-.488-.262-1.058-.584-1.404zM41.597 12.89c.662-.03 1.334-.027 2.035-.023.238.001.479.003.724.003v1.261c0 1.105.002 2.21.004 3.315.005 2.213.01 4.428-.004 6.653 0 .773.201 1.079 1.006 1.058 1.295-.043 2.589-.035 3.883-.027h.002c.517.004 1.034.007 1.552.007.16 0 .322-.02.49-.04.127-.017.258-.033.395-.041V8.476l-.203-.01a20.44 20.44 0 00-.964-.031h-6.343c-.618 0-3.73 3.332-3.503 3.56.02.651.222.936.926.895zM40.812 30.508v-4.334h14.497v4.334H40.812zM14.638 30.528H.14v-4.394h14.497v4.394zM0 39v-4.177h56V39H0z"
          fill="#fff"
        />
      </Svg> */}
      <Image source={require("./../../101.png")} width={15} height={15} />
    </View>
  );
}
