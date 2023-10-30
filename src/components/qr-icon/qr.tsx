import { View, Text } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useTranslation } from "../../hooks/useMyTranslation";
import { colors } from "../../shared-config";

export function QrIcon() {
  const translation = useTranslation();
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ marginRight: 5, color: colors.primary }}>
        {translation("patientTransfer")}
      </Text>
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
        <Path
          d="M.703.703A2.4 2.4 0 012.4 0h3.2a.8.8 0 110 1.6H2.4a.8.8 0 00-.8.8v3.2a.8.8 0 11-1.6 0V2.4A2.4 2.4 0 01.703.703zM13.6 4.8a.8.8 0 00-.8.8v3.2a.8.8 0 00.8.8h4.8a.8.8 0 000-1.6h-4V6.4h4a.8.8 0 000-1.6h-4.8zM12 11.2a.8.8 0 00-.8.8v5.6H9.6v-4a.8.8 0 00-1.6 0v4.8a.8.8 0 00.8.8H12a.8.8 0 00.8-.8v-5.6h5.6a.8.8 0 000-1.6H12zM5.6 12.8a.8.8 0 01.8.8v4.8a.8.8 0 01-1.6 0v-4.8a.8.8 0 01.8-.8zM17.6.8a.8.8 0 01.8-.8h3.2A2.4 2.4 0 0124 2.4v3.2a.8.8 0 01-1.6 0V2.4a.8.8 0 00-.8-.8h-3.2a.8.8 0 01-.8-.8zM23.2 17.6a.8.8 0 01.8.8v3.2a2.4 2.4 0 01-2.4 2.4h-3.2a.8.8 0 010-1.6h3.2a.8.8 0 00.8-.8v-3.2a.8.8 0 01.8-.8zM.8 17.6a.8.8 0 01.8.8v3.2a.8.8 0 00.8.8h3.2a.8.8 0 010 1.6H2.4A2.4 2.4 0 010 21.6v-3.2a.8.8 0 01.8-.8z"
          fill={colors.primary}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.8 5.6a.8.8 0 01.8-.8h4.8a.8.8 0 01.8.8v4.8a.8.8 0 01-.8.8H5.6a.8.8 0 01-.8-.8V5.6zm1.6.8v3.2h3.2V6.4H6.4zM14.4 15.2a.8.8 0 01.8-.8h3.2a.8.8 0 01.8.8v3.2a.8.8 0 01-.8.8h-3.2a.8.8 0 01-.8-.8v-3.2zm1.6.8v1.6h1.6V16H16z"
          fill={colors.primary}
        />
      </Svg>
    </View>
  );
}
