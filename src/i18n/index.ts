"use client"
import { useEffect, useState } from "react"

import __en from "./__en.json"
import __tr from "./__tr.json"
import { createGlobalState } from "react-hooks-global-state"

export const LANG_LISTS: any = {
  en: __en,
  tr: __tr,
}


const initialState = { lang: "en" }
const { useGlobalState } = createGlobalState(initialState)

export const useLanguage = () => {
  const [lang, setLang] = useGlobalState("lang")
  const [defaultLang, setDefaultLang] = useState('en')


  useEffect(() => {
    const navLang = navigator.language.substring(0, 2)
    setDefaultLang(Object.keys(LANG_LISTS).indexOf(navLang) > -1 ? navLang : 'en')
    if (!localStorage.getItem("lang")) {
      localStorage.setItem("lang", defaultLang)
    }
    setLang(localStorage.getItem("lang") || defaultLang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const t = (key: string) => {
    const key2 = key.replace(/\s/g, "_").toLowerCase()

    const list = LANG_LISTS[lang || defaultLang] || __en

    if (Object.keys(list).includes(key2)) {
      return list[key2] as string
    } else if (Object.keys(list).includes(key)) {
      return list[key] as string
    } else {
      return key
    }
  }

  const changeLanguage = (language: string) => {
    localStorage.setItem("lang", language)
    setLang(language)
  }
  return {
    langList: Object.keys(LANG_LISTS),
    t,
    lang,
    changeLanguage,
  }
}
