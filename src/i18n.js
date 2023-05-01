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
          formTitle: {
            part1: 'Me connecter',
            part2: 'ou',
            part3: 'Créer un compte'
          },
          email: 'Email',
          password: 'Mot de passe',
          passwordHelper: 'Minimum 8 caractères, 1 lettre minuscule, 1 lettre majuscule et 1 chiffre.',
          validateButton: 'Se connecter',
          forgottenPassword: 'Mot de passe oublié ?',
          student: {
            title: 'Je suis ÉTUDIANT'
          },
          company: {
            title: 'Je suis une ENTREPRISE'
          }
        }
      }
    }
  })

export default i18n
