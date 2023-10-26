import { translate, setTranslations, setLocale } from "react-i18nify";
import he from "../../locales/he.json";

setTranslations({
  he,
});
setLocale("he");

export function useTranslation() {
  return (key: string, params: Record<string, string> = {}) => {
    const partials = Object.keys(params);
    let value = translate(key);
    for (const param of partials) {
      value = value.replace(`{{${param}}}`, params[param]);
    }

    return value;
  };
}
