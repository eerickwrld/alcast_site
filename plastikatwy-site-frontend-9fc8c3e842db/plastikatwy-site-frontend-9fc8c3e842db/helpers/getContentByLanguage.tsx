export const getContentByLanguage = (content: string | object, language: string) => {
  if (typeof content === 'string') {
    return content
  }

  if (typeof content === 'object' && language === "pt-BR" && content?.['pt_BR']) {
    return content?.["pt_BR"]
  }

  return content?.[language] || "";
}