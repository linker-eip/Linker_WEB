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
          contact: {
            title: 'Nous sommes là pour vous aider. Contactez-nous pour toute question ou assistance.',
            lastname: 'Nom de famille',
            firstname: 'Prénom',
            email: 'Adresse E-mail',
            object: 'Sujet du message',
            message: 'Message',
            send: 'Envoyer',
            info: 'Information général',
            number: 'Numéro de téléphone',
            message_sended: 'Votre message a été envoyé avec succès.'
          },
          homepage: {
            text_1: 'Linker est la première plateforme de freelance pluridisciplinaire destinée aux étudiants pour la réalisation de missions ponctuelles.',
            text_2: 'Trouvez des talents étudiants, créez des groupes de compétences et réalisez des projets ensemble.',
            title_1: 'Linker',
            title_2: ', la nouvelle plateforme',
            title_3: 'étudiante',
            espace: 'Espace',
            company: {
              title: 'Entreprise',
              text_1: 'Trouvez des équipes complètes en quelques clics',
              text_2: 'Sélectionnez des groupes d\'étudiants déjà formés, ayant les compétences nécessaires pour vos missions.'
            },
            student: {
              title: 'Étudiant',
              text_1: 'Libérez votre potentiel en freelance',
              text_2: 'Trouvez des opportunités de travail en tant que freelance, mettez en avant vos compétences, et travaillez sur des projets passionnants.'
            },
            register: 'S’inscrire sur Linker',
            login: 'Se connecter à Linker'
          },
          verify_page: {
            waiting: 'Afin de vous rendre sur le site de Linker, nous vous prions de vérifier votre compte en utilisant le lien que vous avez reçu par email.',
            success: {
              text_1: 'Votre adresse e-mail a été vérifiée avec succès.',
              text_2: 'Vous pouvez maintenant profiter pleinement des fonctionnalités de ',
              text_3: 'Linker.',
              text_4: 'Connectez-vous à votre compte pour commencer à explorer les opportunités de collaboration entre étudiants et entreprises.',
              text_5: 'Si vous avez des questions ou si vous avez besoin d\'assistance, n\'hésitez pas à nous contacter à l\'adresse suivante : ',
              text_6: 'contact@linker-app.fr.',
              text_7: 'Bienvenue sur ',
              text_8: ' Linker',
              text_9: ', et bonne chance dans vos futures collaborations !',
              button_text: 'Se connecter à Linker',
              button_title_1: 'Espace',
              button_title_2: 'Étudiant',
              button_subtext: 'À la recherche de missions ?'
            },
            failed: {
              text_1: 'La vérification de votre adresse e-mail a échoué.',
              text_2: 'Veuillez vous assurer que vous avez saisi le code correctement.',
              text_3: 'Vous pouvez réessayer en cliquant sur le lien de vérification que nous vous avons envoyé.',
              text_4: 'Si le problème persiste, veuillez contacter notre équipe d\'assistance à l\'adresse suivante :',
              text_5: 'contact@linker-app.fr.',
              text_6: 'Nous sommes là pour vous aider à résoudre ce problème.',
              button_text: 'Revenir en lieu sûr'
            }
          },
          footer: {
            need_help: 'Besoin d’aide ?',
            contact: 'Contactez-nous',
            networks: 'Pour mieux nous connaitre !',
            download: 'Téléchargez l’app'
          },
          modal: {
            title: 'Confirmer votre choix',
            deleteTitle: 'Confirmer la suppression',
            notationTitle: 'Noter la prestation',
            commentTitle: 'Laisser un avis sur la prestation',
            remaining_char: 'caractères restants',
            refus: {
              subtitle: 'Etes-vous sur de vouloir refuser:'
            },
            accept: {
              subtitle: 'Etes-vous sur de vouloir accepter:'
            },
            delete: {
              subtitle: 'Etes-vous sûr de vouloir supprimer:',
              groups: {
                subtitle: 'Etes-vous sur de vouloir détruire:'
              }
            },
            notation: {
              subtitle: 'Veuillez remplir les champs ci-dessous pour évaluer la prestation du groupe sur cette mission:'
            },
            comment: {
              subtitle: 'Veuillez remplir le champ ci-dessous pour laisser un avis sur la prestation du groupe sur cette mission:'
            },
            leave: {
              subtitle: 'Êtes-vous sur de vouloir quitter:'
            },
            account: {
              deactivate: 'Êtes-vous vraiment sûr de vouloir désactiver le compte:',
              delete: 'Êtes-vous vraiment sûr de vouloir supprimer le compte:'
            },
            linkedIn: {
              title: 'Remplir son profil avec LinkedIn',
              textarea: 'Rentrez le lien de votre profil LinkedIn'
            }
          },
          validate: 'Valider',
          button: 'Retour',
          formTitle: {
            part1: 'Me connecter',
            part2: 'ou',
            part3: 'Créer un compte'
          },
          firstName: 'Prénom',
          lastName: 'Nom',
          companyName: 'Nom de l\'entreprise',
          telephone: 'Téléphone',
          email: 'Email',
          password: 'Mot de passe',
          confirmPassword: 'Confirmer le mot de passe',
          firstStudentCheckbox: 'Je certifie avoir plus de 16 ans',
          firstCompanyCheckbox: 'Je certifie être le propriétaire de cette entreprise',
          secondGlobalCheckbox: 'En m\'inscrivant, j\'accepte les conditions générales d\'utilisation et la politique de confidentialité de Linker',
          passwordHelper: 'Minimum 8 caractères, 1 lettre minuscule, 1 lettre majuscule et 1 chiffre.',
          registerButton: 'S\'inscrire',
          validateButton: 'Se connecter',
          forgottenPassword: 'Mot de passe oublié ?',
          missionCard: {
            price: 'Montant:',
            begin: 'Début de misison:',
            end: 'Fin de misison:',
            cancelled: 'Mission annulée le:',
            participants: 'Participants:',
            bill: 'N° de facture:',
            see_mission: 'Voir la mission',
            skill: 'Compétences associées'
          },
          student: {
            title: 'Je suis ÉTUDIANT',
            dashboard: {
              home: 'Mon dashboard',
              mission: 'Mes missions',
              facture: 'Mes factures',
              paiements: 'Mes paiements',
              profil: 'Mon profil',
              doc: 'Mes documents',
              stat: 'Mes statistiques',
              invoices: 'Mes factures',
              group: 'Groupe',
              groups: {
                my_group: 'votre groupe',
                chat: 'Chat textuel',
                invite: 'invitations ({{nbrInvitation}})',
                no_group: 'Il semble que vous n\'ayez pas de groupe. Vous pouvez en créer un ici !',
                no_invite: 'Il semble que vous n\'ayez aucune invitations en attente.',
                create_group_button: 'Créer un groupe',
                member_title: 'Les membres'
              },
              chat: {
                send_message: 'Envoyer'
              },
              hotbar: {
                profil: 'Profil',
                quit: 'Déconnexion'
              },
              card: {
                status: {
                  title: 'Mon statut Linker',
                  content: 'Voici les étapes qu\'il te reste à faire pour pouvoir compléter ton profil et pouvoir réaliser des missions. C\'est la dernière ligne droite !',
                  statut: 'SIREN',
                  cni: 'Carte d\'identité',
                  rib: 'RIB',
                  urssaf: 'URSSAF'
                },
                faq: {
                  title: 'Linker, c\'est...',
                  content: 'Nous répondons aux questions que vous nous avez le plus posé dans notre dernière vidéo FAQ !'
                },
                freelance: {
                  title: 'Se déclarer freelance',
                  content: 'Voici un tutoriel pour se déclarer en tant que freelance. Nous savons à quel point c\'est dur de se lancer dans tout ça. Ici tu trouveras toutes les démarches nécessaires pour bien démarrer ton activité. Et en toute légalité bien sûr :D',
                  button: 'Commencer'
                },
                sales: {
                  title: 'Mon chiffre d\'affaires',
                  sales: 'Chiffre d\'affaires (12 derniers mois)',
                  finished_missions: 'Missions terminées (12 derniers mois)',
                  see_all: 'Voir toutes mes statistiques'
                }
              }
            },
            mission: {
              pending: {
                title: 'En cours',
                pending_mission: 'Missions en cours ({{nbrMission}})',
                no_mission: 'Vous n\'avez aucune mission en cours.'
              },
              completed: {
                title: 'Terminées',
                completed_mission: 'Missions terminées ({{nbrMission}})',
                no_mission: 'Vous n\'avez aucune mission terminée.'
              },
              cancelled: {
                title: 'Annulées',
                cancelled_mission: 'Missions annulées ({{nbrMission}})',
                no_mission: 'Vous n\'avez aucune mission annulée.'
              },
              potential: {
                title: 'Potentielles',
                potential_mission: 'Missions potentielles ({{nbrMission}})',
                no_mission: 'Vous n\'avez aucune mission potentielle.'
              }
            },
            sales: {
              avis: 'Avis',
              mark: 'Note Moyenne',
              text_1: 'laissés par vos clients sur les 12 derniers mois',
              text_2: 'sur toutes vos missions notées par vos clients'
            },
            detailed_mission: {
              pending_mission: 'Mission en cours ⌛',
              accepted: 'Proposition acceptée',
              provisionée: 'Mission provisionée',
              in_progress: 'Mission en cours',
              completed: 'Mission terminée',
              mission_completed: 'Mission terminée ✅',
              details: 'Détail de la mission',
              historic: 'Historique de la mission',
              conversation: 'Accéder à la conversation',
              mission: 'mission(s)',
              tab: {
                detail: 'Détail',
                quantity: 'Quantité',
                unitary_price: 'Prix unitaire (HT)',
                total_price: 'total (HT)'
              }
            },
            profile: {
              edit_mode: {
                desc: 'Description',
                location: 'Location',
                website: 'Website',
                activity: 'Activité'
              },
              content: {
              },
              verif: {
                title: 'Vérifications',
                verified_student: 'Étudiant vérifié',
                verified_freelance: 'Freelance vérifié',
                linker_charte: 'Charte Linker signée',
                verified_email: 'Email vérifié',
                more_information: 'Plus d\'information',
                check_charte: 'Consulter la charte'
              },
              skills: {
                title: 'Compétences',
                add_skill: 'Ajouter une compétence'
              },
              experience: {
                title: 'Expériences',
                add_exp: 'Ajoute ton expérience',
                name: 'Rentre le nom de ton expérience ?',
                position: 'Quel poste avez-vous exercé ?',
                localisation: 'Lieu',
                date: 'Date',
                description: 'Décris ton expérience'
              },
              education: {
                title: 'Formations',
                add_form: 'Ajoute ta formation',
                name: 'Rentre le nom de ton formation ?',
                position: 'Quel est sujet de cette formation ?',
                localisation: 'Lieu',
                date: 'Date',
                description: 'Décris la formation'
              }
            },
            groups: {
              title: 'Création d’un groupe',
              name: 'Sélectionner un nom pour votre groupe',
              description: 'Ajouter une description pour votre groupe',
              button: 'Créer le groupe',
              invite: {
                title: 'Ajouter un membre'
              },
              exclude: {
                title: 'Exclure un membre'
              }
            }
          },
          company: {
            title: 'Je suis une ENTREPRISE',
            dashboard: {
              card: {
                status: {
                  content: 'Voici les étapes qu\'il te reste à faire pour pouvoir compléter ton profil et pouvoir proposer des missions. C\'est la dernière ligne droite !',
                  cni: 'Carte d\'identité',
                  kbis: 'KBIS',
                  siret: 'SIRET'
                }
              }
            },
            mission: {
              pending: {
                title: 'En cours',
                pending_mission: 'Missions en cours ({{nbrMission}}).',
                no_mission: 'Vous n\'avez aucune mission en cours.'
              },
              completed: {
                title: 'Terminées',
                completed_mission: 'Missions terminées ({{nbrMission}}).',
                no_mission: 'Vous n\'avez aucune mission terminée.'
              },
              cancelled: {
                title: 'Annulées',
                cancelled_mission: 'Missions annulées ({{nbrMission}}).',
                no_mission: 'Vous n\'avez aucune mission annulée.'
              },
              potential: {
                title: 'En recherche',
                potential_mission: 'Missions en recherche ({{nbrMission}}).',
                no_mission: 'Vous n\'avez aucune mission en recherche.'
              }
            },
            detailed_mission: {
              research_mission: 'Mission en recherche ⌛',
              pending_mission: 'Missions en cours ⌛',
              accepted: 'Proposition acceptée',
              provisionée: 'Mission provisionée',
              in_progress: 'Mission en cours',
              completed: 'Mission terminée ✅',
              details: 'Détail de la mission',
              historic: 'Historique de la mission',
              conversation: 'Accéder à la conversation',
              mission: 'missions',
              participants: 'Participants',
              no_participants: 'Aucun groupe trouvée',
              selection: 'Liste des groupes',
              tab: {
                detail: 'Détail',
                quantity: 'Quantité',
                price: 'Prix',
                task: 'Tâches',
                attribution: 'Attribution',
                no_action: 'Aucune action à réaliser'

              },
              devis: {
                title: 'Devis pour la mission: {{name}}',
                no_devis: 'Pas de devis renseigné pour la mission: {{name}}',
                devis: 'Importez votre devis'
              },
              task: {
                modal_title: 'Ajouter une tâche',
                name: 'Nom',
                description: 'description',
                price: 'Prix'
              }
            }
          },
          admin: {
            dashboard: {
              home: 'Panel Admin',
              homeTitle: 'Mon panel',
              utilisateur: 'Utilisateurs',
              mission: 'Missions',
              doc: 'Documents',
              verifyCompanyDoc: 'Vérification Entreprise',
              verifyStudentDoc: 'Vérification Étudiante',
              contacts: 'Contact',
              archives: 'Archives',
              payments: 'Paiements'
            }
          },
          snackbar: {
            invitation_error: 'Vous ne pouvez pas inviter cette personne car elle a déjà un groupe.'
          }
        }
      },
      en: {
        translation: {
          contact: {

          },
          modal: {
            title: 'Confirmer votre choix',
            deleteTitle: 'Confirmer la suppression',
            notationTitle: 'Noter la prestation',
            commentTitle: 'Laisser un avis sur la prestation',
            remaining_char: 'caractères restants',
            refus: {
              subtitle: 'Etes-vous sur de vouloir refuser:'
            },
            accept: {
              subtitle: 'Etes-vous sur de vouloir accepter:'
            },
            exclude: {
              subtitle: 'Etes-vous sur de vouloir exclure:'
            },
            delete: {
              subtitle: 'Etes-vous sûr de vouloir supprimer:',
              groups: {
                subtitle: 'Etes-vous sur de vouloir détruire:'
              }
            },
            leave: {
              subtitle: 'Etes-vous sur de vouloir quitter:'
            },
            account: {
              deactivate: 'Êtes-vous vraiment sûr de vouloir désactiver le compte:',
              delete: 'Êtes-vous vraiment sûr de vouloir supprimer le compte:'
            }
          },
          validate: 'Valider',
          button: 'Retour',
          formTitle: {
            part1: 'Me connecter',
            part2: 'ou',
            part3: 'Créer un compte'
          },
          firstName: 'Prénom',
          lastName: 'Nom',
          companyName: 'Nom de l\'entreprise',
          telephone: 'Téléphone',
          email: 'Email',
          password: 'Mot de passe',
          confirmPassword: 'Confirmer le mot de passe',
          firstStudentCheckbox: 'Je certifie avoir plus de 16 ans',
          firstCompanyCheckbox: 'Je certifie être le propriétaire de cette entreprise',
          secondGlobalCheckbox: 'En m\'inscrivant, j\'accepte les conditions générales d\'utilisation et la politique de confidentialité de Linker',
          passwordHelper: 'Minimum 8 caractères, 1 lettre minuscule, 1 lettre majuscule et 1 chiffre.',
          registerButton: 'S\'inscrire',
          validateButton: 'Se connecter',
          forgottenPassword: 'Mot de passe oublié ?',
          missionCard: {
            price: 'Montant:',
            begin: 'Début de misison:',
            end: 'Fin de misison:',
            cancelled: 'Mission annulée le:',
            participants: 'Participants:',
            bill: 'N° de facture:',
            see_mission: 'Voir la mission',
            skill: 'Compétences associées'
          },
          student: {
            title: 'Je suis ÉTUDIANT',
            dashboard: {
              home: 'Mon dashboard',
              mission: 'Mes missions',
              facture: 'Mes factures',
              paiements: 'Mes paiements',
              profil: 'Mon profil',
              doc: 'Mes documents',
              stat: 'Mes statistiques',
              invoices: 'Mes factures',
              group: 'Groupe',
              groups: {
                my_group: 'votre groupe',
                chat: 'Chat textuel',
                invite: 'invitations()',
                no_group: 'Il semble que vous n\'ayez pas de groupe. Vous pouvez en créer un ici !',
                create_group_button: 'Créer un groupe',
                invited: 'Les membres invités'
              },
              chat: {
                send_message: 'Envoyer'
              },
              hotbar: {
                profil: 'Profil',
                quit: 'Déconnexion'
              },
              card: {
                status: {
                  title: 'Mon statut Linker',
                  content: 'Voici les étapes qu\'il te reste à faire pour pouvoir compléter ton profil et pouvoir réaliser des missions. C\'est la dernière ligne droite !',
                  statut: 'SIREN',
                  cni: 'Carte d\'identité',
                  rib: 'RIB',
                  urssaf: 'URSSAF'
                },
                faq: {
                  title: 'Linker, c\'est...',
                  content: 'Nous répondons aux questions que vous nous avez le plus posé dans notre dernière vidéo FAQ !'
                },
                freelance: {
                  title: 'Se déclarer freelance',
                  content: 'Voici un tutoriel pour se déclarer en tant que freelance. Nous savons à quel point c\'est dur de se lancer dans tout ça. Ici tu trouveras toutes les démarches nécessaires pour bien démarrer ton activité. Et en toute légalité bien sûr :D',
                  button: 'Commencer'
                },
                sales: {
                  title: 'Mon chiffre d\'affaires',
                  sales: 'Chiffre d\'affaires (12 derniers mois)',
                  finished_missions: 'Missions terminées (12 derniers mois)',
                  see_all: 'Voir toutes mes statistiques'
                }
              }
            },
            mission: {
              pending: {
                title: 'En cours',
                pending_mission: 'Missions en cours ({{nbrMission}})',
                no_mission: 'Vous n\'avez aucune mission en cours.'
              },
              completed: {
                title: 'Terminées',
                completed_mission: 'Missions terminées ({{nbrMission}})',
                no_mission: 'Vous n\'avez aucune mission terminée.'
              },
              cancelled: {
                title: 'Annulées',
                cancelled_mission: 'Missions annulées ({{nbrMission}})',
                no_mission: 'Vous n\'avez aucune mission annulée.'
              },
              potential: {
                title: 'Potentielles',
                potential_mission: 'Missions potentielles ({{nbrMission}})',
                no_mission: 'Vous n\'avez aucune mission potentielle.'
              }
            },
            sales: {
              avis: 'Avis',
              mark: 'Note Moyenne',
              text_1: 'laissés par vos clients sur les 12 derniers mois',
              text_2: 'sur toutes vos missions notées par vos clients'
            },
            detailed_mission: {
              pending_mission: 'Mission en cours ⌛',
              accepted: 'Proposition acceptée',
              provisionée: 'Mission provisionée',
              in_progress: 'Mission en cours',
              completed: 'Mission terminée',
              mission_completed: 'Mission terminée ✅',
              details: 'Détail de la mission',
              historic: 'Historique de la mission',
              conversation: 'Accéder à la conversation',
              mission: 'mission(s)',
              tab: {
                detail: 'Détail',
                quantity: 'Quantité',
                unitary_price: 'Prix unitaire (HT)',
                total_price: 'total (HT)'
              }
            },
            profile: {
              edit_mode: {
                desc: 'Description',
                location: 'Location',
                website: 'Website',
                activity: 'Activité'
              },
              content: {
              },
              verif: {
                title: 'Vérifications',
                verified_student: 'Étudiant vérifié',
                verified_freelance: 'Freelance vérifié',
                linker_charte: 'Charte Linker signée',
                verified_email: 'Email vérifié',
                more_information: 'Plus d\'information',
                check_charte: 'Consulter la charte'
              },
              skills: {
                title: 'Compétences',
                add_skill: 'Ajouter une compétence'
              },
              experience: {
                title: 'Expériences',
                add_exp: 'Ajoute ton expérience',
                name: 'Rentre le nom de ton expérience ?',
                position: 'Quel poste avez-vous exercé ?',
                localisation: 'Lieu',
                date: 'Date',
                description: 'Décris ton expérience'
              },
              education: {
                title: 'Formations',
                add_form: 'Ajoute ta formation',
                name: 'Rentre le nom de ton formation ?',
                position: 'Quel est sujet de cette formation ?',
                localisation: 'Lieu',
                date: 'Date',
                description: 'Décris la formation'
              }
            }
          },
          company: {
            title: 'Je suis une ENTREPRISE',
            dashboard: {
              card: {
                status: {
                  content: 'Voici les étapes qu\'il te reste à faire pour pouvoir compléter ton profil et pouvoir proposer des missions. C\'est la dernière ligne droite !',
                  cni: 'Carte d\'identité',
                  kbis: 'KBIS',
                  siret: 'SIRET'
                }
              },
              invoices: 'Mes factures'
            },
            mission: {
              pending: {
                title: 'En cours',
                pending_mission: 'Missions en cours ({{nbrMission}}).',
                no_mission: 'Vous n\'avez aucune mission en cours.'
              },
              completed: {
                title: 'Terminées',
                completed_mission: 'Missions terminées ({{nbrMission}}).',
                no_mission: 'Vous n\'avez aucune mission terminée.'
              },
              cancelled: {
                title: 'Annulées',
                cancelled_mission: 'Missions annulées ({{nbrMission}}).',
                no_mission: 'Vous n\'avez aucune mission annulée.'
              },
              potential: {
                title: 'En recherche',
                potential_mission: 'Missions en recherche ({{nbrMission}}).',
                no_mission: 'Vous n\'avez aucune mission en recherche.'
              }
            }
          },
          admin: {
            dashboard: {
              home: 'Panel Admin',
              homeTitle: 'Mon panel',
              utilisateur: 'Utilisateurs',
              mission: 'Missions',
              doc: 'Documents',
              verifyCompanyDoc: 'Vérification Entreprise',
              verifyStudentDoc: 'Vérification Étudiante',
              contacts: 'Contact',
              archives: 'Archives',
              payments: 'Paiements'
            }
          }
        }
      }
    }
  })

export default i18n
