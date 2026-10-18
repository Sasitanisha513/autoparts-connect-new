import {
  createContext,
  useContext,
  useState,
} from "react";

import translations from "../Translation/translations";
// ==========================
// CREATE LANGUAGE CONTEXT
// ==========================

const LanguageContext = createContext();


// ==========================
// LANGUAGE PROVIDER
// ==========================

export const LanguageProvider = ({
  children,
}) => {

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );


  // ==========================
  // CHANGE LANGUAGE
  // ==========================

  const changeLanguage = (newLanguage) => {

    setLanguage(newLanguage);

    localStorage.setItem(
      "language",
      newLanguage
    );

  };


  // ==========================
  // TRANSLATION FUNCTION
  // ==========================

  const t = (key) => {

    return (
      translations[language]?.[key] ||
      translations.en?.[key] ||
      key
    );

  };


  // ==========================
  // PROVIDER
  // ==========================

  return (

    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        t,
      }}
    >

      {children}

    </LanguageContext.Provider>

  );

};


// ==========================
// CUSTOM HOOK
// ==========================

export const useLanguage = () => {

  return useContext(
    LanguageContext
  );

};