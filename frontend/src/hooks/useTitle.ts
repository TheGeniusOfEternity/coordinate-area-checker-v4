import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useTitle = (
  title: string,
  defaultTitle = "page.common.title"
) => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t(title);

    return () => {
      document.title = t(defaultTitle);
    };
  }, [t, title, defaultTitle]);
};
