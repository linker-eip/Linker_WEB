import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    resources: {
      fr: {
        translation: {
          button: 'Retour',
          title: 'Je suis étudiant',
          formTitle: {
            part1: 'Me connecter',
            part2: 'ou',
            part3: 'Créer un compte'
          },
          email: 'Email',
          password: 'Mot de passe',
          validateButton: 'Se connecter'
        }
      }
    }
  })

export default i18n
