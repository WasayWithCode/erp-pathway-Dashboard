import { useEffect } from "react";

export const usePageTitle = (title, description) => {
  useEffect(() => {
    document.title = title ? `${title} | ERP Pathway` : "ERP Pathway";

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = description;
    }
  }, [title, description]);
};
