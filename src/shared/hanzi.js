import axios from 'axios'

export async function lookUp(text) {
  if (Array.isArray(text)) {
    text = text.join('')
  }
  return (await axios.get(
    (process.env.NODE_ENV === 'development' ?
      'https://localhost:5001/hanzi/characters/' :
      'https://hanzi-service.fr.openode.io/hanzi/characters/') + text,
  )).data
}

export function filterTranslations(translations) {
  return translations.filter(t => t.definitions[0].indexOf('surname') < 0)
}