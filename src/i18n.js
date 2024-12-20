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
          payment: {
            name: 'Nom de la mission',
            status: 'Statut du paiement',
            amount: 'Montant',
            cash_out: 'Retirer',
            verify: 'Êtes-vous sûr de vouloir retirer le montant de {{amount}}€ de la mission &apos;{{missionName}}&apos; ?',
            yes: 'Oui',
            no: 'Non',
            search: 'Rechercher un paiement'
          },
          invoices: {
            year: 'Année',
            title: 'Titre de la mission',
            client: 'Client',
            status: 'État',
            invoice: 'Facture',
            no_invoices: 'Il n\'y a pas de factures',
            student: 'Étudiant',
            paid: 'Payée',
            waiting: 'En attente',
            cancelled: 'Annulée',
            filter: {
              date: 'Date 🗓️',
              status: 'Statut ❓',
              title: 'Titre 📝',
              student: 'Étudiant 🧑‍🎓',
              label: 'Filtrer'
            }
          },
          network: {
            find: 'Rechercher un étudiant',
            loc: 'Localisation',
            skills: 'Compétences',
            tjm_min: 'TJM Minimum',
            tjm_max: 'TJM Maximum',
            grade_min: 'Note Minimale',
            grade_max: 'Note Maximale',
            search: 'Rechercher',
            no_result: 'Aucun résultat trouvé',
            sorry: 'Désolé, nous n\'avons trouvé aucun résultat pour votre recherche. Veuillez essayer avec d\'autres critères.'
          },
          mailbox: {
            group: 'Groupe',
            mission: 'Missions',
            pre_mission: 'Pré-mission',
            private: 'Messages privés'
          },
          dropzone: {
            drop: 'Déposez votre fichier'
          },
          and: ' et ',
          report: {
            modal_title: 'Signaler cet évènement',
            title: 'Donner un titre à votre ticket',
            description: 'Expliquez en quelques mots votre problème',
            send: 'Envoyer le signalement',
            cancel: 'Annuler',
            snackbar: 'Assurez-vous de remplir correctement les zones Titre et Description.'
          },
          document: {
            statut: {
              bis: 'de remplacement'
            },
            is_document: {
              part1: 'Votre document:',
              part2: 'a été renseigné avec succès.'
            },
            no_document: 'Veuillez renseigner votre ',
            cni: 'CNI',
            siren: 'SIREN',
            urssaf: 'URSSAF',
            rib: 'RIB',
            kbis: 'KBIS',
            send: 'ENVOYER LES DOCUMENTS',
            replace: 'REMPLACER'
          },
          notifications: {
            email: 'Recevoir les notifications par mail'
          },
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
            exclude: {
              subtitle: 'Etes-vous sur de vouloir exclure:'
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
          passwordHelper: 'Minimum 8 caractères, 1 lettre minuscule, 1 lettre majuscule, 1 chiffre et 1 caractère spécial.',
          wrong_email: 'Votre adresse email ne remplit pas les conditions.',
          wrong_password: 'Votre mot de passe ne remplit pas les conditions.',
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
              mailbox: 'Messagerie',
              network: 'Réseau',
              facture: 'Mes factures',
              paiements: 'Mes paiements',
              profil: 'Mon profil',
              doc: 'Mes documents',
              stat: 'Mes statistiques',
              invoices: 'Mes factures',
              settings: 'Paramètres',
              contact: 'Contact',
              group: 'Groupe',
              groups: {
                my_group: 'votre groupe',
                chat: 'Chat textuel',
                invite: 'invitations ({{nbrInvitation}})',
                no_group: 'Il semble que vous n\'ayez pas de groupe. Vous pouvez en créer un ici !',
                no_invite: 'Il semble que vous n\'ayez aucune invitations en attente.',
                create_group_button: 'Créer un groupe',
                invited: 'Les membres invités',
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
                desc: 'Description',
                location: 'Localité',
                website: 'Site Web',
                activity: 'Activité',
                grade: 'Pas de note',
                mission: 'Mission réalisée: {{value}}'
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
                add_skill: 'Ajouter une compétence',
                no_skill: 'No skills'
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
              show_desc: 'Description du groupe',
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
            },
            settings: {
              error: {
                empty_field: 'Veuillez remplir tous les champs.',
                old: 'l\'ancien mot de passe est incorrect.',
                old_new: 'L\' ancien mot de passe et le nouveau mot de passe ne doivent pas être identiques.',
                new_confirm: 'Les mots de passe ne sont pas identiques.',
                composition: 'Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial.',
                success: 'Votre mot de passe a été modifié avec succès.'
              },
              security: {
                title: 'Sécurité',
                password: 'Mot de passe',
                password_old: 'Mot de passe actuel',
                password_new: 'Nouveau mot de passe',
                password_confirm: 'Confirmer le nouveau mot de passe',
                modif: 'Modifier le mot de passe',
                param1: '1 caractère spécial',
                param2: '1 majuscule',
                param3: '1 chiffre',
                delete: 'Supprimer mon compte',
                desactivation: 'Désactiver mon compte'
              },
              preference: {
                title: 'Préférences',
                language: 'Langue',
                choose_language: 'Choisissez la langue de l’interface.',
                select_language: 'Sélectionnez votre langue',
                french: 'Français',
                english: 'Anglais',
                save: 'Sauvegarder',
                notifications: 'Notifications (emails)',
                choose_notif: 'Choisissez si vous souhaitez recevoir un mail pour les éléments suivants :',
                new_message: 'Notification d’un nouveau message',
                group_notif: 'Notification liés aux groupes',
                doc_notif: 'Notification liées aux documents',
                mission_notif: 'Notification liées aux  missions'
              }
            }
          },
          company: {
            title: 'Je suis une ENTREPRISE',
            total_mission: 'Nombre total de missions: ',
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
              payments: 'Paiements',
              ticket: 'Tickets'
            }
          },
          snackbar: {
            invitation_error: 'Vous ne pouvez pas inviter cette personne car elle a déjà un groupe.'
          }
        }
      },
      en: {
        translation: {
          payment: {
            name: 'Mission name',
            status: 'Mission status',
            amount: 'Amount',
            cash_out: 'Cash-out',
            verify: 'Are you sure you want to withdraw the amount of {{amount}}€ from the mission “{{missionName}}”?',
            yes: 'Yes',
            no: 'No',
            search: 'Search a payment'
          },
          invoices: {
            year: 'Year',
            title: 'Mission title',
            client: 'Client',
            status: 'Status',
            invoice: 'Invoice',
            no_invoices: 'No invoices',
            student: 'Student',
            paid: 'Paid',
            waiting: 'Waiting',
            cancelled: 'Cancelled',
            filter: {
              date: 'Date 🗓️',
              status: 'Status ❓',
              title: 'Title 📝',
              student: 'Student 🧑‍🎓',
              label: 'Filter'
            }
          },
          network: {
            find: 'Find a student',
            loc: 'Location',
            skills: 'Skills',
            tjm_min: 'ADR Minimum',
            tjm_max: 'ADR Maximum',
            grade_min: 'Grade Minimum',
            grade_max: 'Grade Maximum',
            search: 'Search',
            no_result: 'No results found',
            sorry: 'Sorry, we didn\'t find any results for your search. Please try again with other criteria.'
          },
          mailbox: {
            group: 'Group',
            mission: 'Missions',
            pre_mission: 'Pre-missions',
            private: 'Private messages'
          },
          dropzone: {
            drop: 'Drop your file'
          },
          and: ' and ',
          report: {
            modal_title: 'Report this event',
            title: 'Give a title to your ticket',
            description: 'Briefly explain your issue',
            send: 'Send the report',
            cancel: 'Cancel',
            snackbar: 'Please make sure to properly fill in the Title and Description fields.'
          },
          document: {
            statut: {
              bis: 'replacement'
            },
            is_document: {
              part1: 'Your document:',
              part2: 'has been successfully completed.'
            },
            no_document: 'Please fill in your ',
            cni: 'CNI',
            siren: 'SIREN',
            urssaf: 'URSSAF',
            rib: 'RIB',
            kbis: 'KBIS',
            send: 'SEND DOCUMENTS',
            replace: 'REPLACE'
          },
          notifications: {
            email: 'Receive notifications by e-mail'
          },
          contact: {
            title: 'We\'re here to help. Contact us if you have any questions or need assistance.',
            lastname: 'Last Name',
            firstname: 'First Name',
            email: 'Email Address',
            object: 'Subject of the message',
            message: 'Message',
            send: 'Send',
            info: 'General Information',
            number: 'Phone Number',
            message_sended: 'Your message has been successfully sent.'
          },
          homepage: {
            text_1: 'Linker is the first multidisciplinary freelance platform for students to carry out one-off assignments.',
            text_2: 'Find student talent, create skills groups and carry out projects together.',
            title_1: 'Linker',
            title_2: ', la nouvelle plateforme',
            title_3: 'Student',
            espace: 'Area',
            company: {
              title: 'Company',
              text_1: 'Find complete teams in just a few clicks',
              text_2: 'Select pre-formed student groups with the skills needed for your missions.'
            },
            student: {
              title: 'Student',
              text_1: 'Unlock your potential as a freelancer',
              text_2: 'Find freelance work opportunities, showcase your skills, and work on exciting projects.'
            },
            register: 'Sign up on Linker',
            login: 'Log in to Linker'
          },
          verify_page: {
            waiting: 'To access the Linker site, please verify your account using the link you received by email.',
            success: {
              text_1: 'Your email address has been successfully verified.',
              text_2: 'You can now fully enjoy the features of ',
              text_3: 'Linker.',
              text_4: 'Log in to your account to start exploring collaboration opportunities between students and companies.',
              text_5: 'If you have any questions or need assistance, feel free to contact us at: ',
              text_6: 'contact@linker-app.fr.',
              text_7: 'Welcome to ',
              text_8: 'Linker',
              text_9: ', and good luck with your future collaborations!',
              button_text: 'Log in to Linker',
              button_title_1: 'Student',
              button_title_2: 'Area',
              button_subtext: 'Looking for missions?'
            },
            failed: {
              text_1: 'The verification of your email address has failed.',
              text_2: 'Please ensure you have entered the code correctly.',
              text_3: 'You can retry by clicking on the verification link we sent you.',
              text_4: 'If the problem persists, please contact our support team at:',
              text_5: 'contact@linker-app.fr.',
              text_6: 'We are here to help you resolve this issue.',
              button_text: 'Return to safety'
            }
          },
          footer: {
            need_help: 'Need help?',
            contact: 'Contact us',
            networks: 'Get to know us better!',
            download: 'Download the app'
          },
          modal: {
            title: 'Confirm Your Choice',
            deleteTitle: 'Confirm Deletion',
            notationTitle: 'Rate the Service',
            commentTitle: 'Leave Feedback on the Service',
            remaining_char: 'characters remaining',
            refus: {
              subtitle: 'Are you sure you want to refuse:'
            },
            accept: {
              subtitle: 'Are you sure you want to accept:'
            },
            exclude: {
              subtitle: 'Are you sure you want to exclude:'
            },
            delete: {
              subtitle: 'Are you sure you want to delete:',
              groups: {
                subtitle: 'Are you sure you want to delete:'
              }
            },
            leave: {
              subtitle: 'Are you sure you want to leave:'
            },
            notation: {
              subtitle: 'Please fill in the fields below to rate the group\'s performance on this task:'
            },
            comment: {
              subtitle: 'Please fill in the field below to leave feedback on the group\'s performance on this task:'
            },
            account: {
              deactivate: 'Are you really sure you want to deactivate the account:',
              delete: 'Are you really sure you want to delete the account:'
            },
            linkedIn: {
              title: 'Fill Your Profile with LinkedIn',
              textarea: 'Enter your LinkedIn profile link'
            }
          },
          validate: 'Validate',
          button: 'Back',
          formTitle: {
            part1: 'Log in',
            part2: 'or',
            part3: 'Create an account'
          },
          firstName: 'First Name',
          lastName: 'Last Name',
          companyName: 'Company Name',
          telephone: 'Phone',
          email: 'Email',
          password: 'Password',
          confirmPassword: 'Confirm Password',
          firstStudentCheckbox: 'I certify that I am over 16 years old',
          firstCompanyCheckbox: 'I certify that I am the owner of this company',
          secondGlobalCheckbox: 'By registering, I agree to the terms of use and privacy policy of Linker',
          passwordHelper: 'Minimum 8 characters, 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character.',
          wrong_email: 'Your email address does not meet the requirements.',
          wrong_password: 'Your password does not meet the requirements.',
          registerButton: 'Sign Up',
          validateButton: 'Log In',
          forgottenPassword: 'Forgot Password?',
          missionCard: {
            price: 'Amount:',
            begin: 'Start of mission:',
            end: 'End of mission:',
            cancelled: 'Mission cancelled on:',
            participants: 'Participants:',
            bill: 'Invoice number:',
            see_mission: 'View the mission',
            skill: 'Associated skills'
          },
          student: {
            title: 'Je suis ÉTUDIANT',
            dashboard: {
              home: 'My Dashboard',
              mission: 'My Missions',
              network: 'Network',
              mailbox: 'Mailbox',
              facture: 'My Invoices',
              paiements: 'My Payments',
              profil: 'My Profile',
              doc: 'My Documents',
              stat: 'My Statistics',
              invoices: 'My Invoices',
              settings: 'Settings',
              contact: 'Contact',
              group: 'Group',
              groups: {
                my_group: 'your group',
                chat: 'Text Chat',
                invite: 'invitations ({{nbrInvitation}})',
                no_group: 'It seems you don’t have a group. You can create one here!',
                no_invite: 'It seems you have no pending invitations.',
                create_group_button: 'Create a Group',
                invited: 'Invited Members',
                member_title: 'Members'
              },
              chat: {
                send_message: 'Send'
              },
              hotbar: {
                profil: 'Profile',
                quit: 'Log Out'
              },
              card: {
                status: {
                  title: 'My Linker Status',
                  content: 'Here are the steps you still need to complete to finish your profile and start taking on missions. It’s the final stretch!',
                  statut: 'SIREN',
                  cni: 'ID Card',
                  rib: 'Bank Details',
                  urssaf: 'URSSAF'
                },
                faq: {
                  title: 'Linker is...',
                  content: 'We answer the most frequently asked questions from our latest FAQ video!'
                },
                freelance: {
                  title: 'Register as a Freelancer',
                  content: 'Here is a guide to register as a freelancer. We know how challenging it can be to start out. You’ll find all the necessary steps to get your activity up and running, and in full compliance with the law :D',
                  button: 'Get Started'
                },
                sales: {
                  title: 'My Revenue',
                  sales: 'Revenue (Last 12 Months)',
                  finished_missions: 'Completed Missions (Last 12 Months)',
                  see_all: 'See All My Statistics'
                }
              }
            },
            mission: {
              pending: {
                title: 'In Progress',
                pending_mission: 'Ongoing Missions ({{nbrMission}})',
                no_mission: 'You have no ongoing missions.'
              },
              completed: {
                title: 'Completed',
                completed_mission: 'Completed Missions ({{nbrMission}})',
                no_mission: 'You have no completed missions.'
              },
              cancelled: {
                title: 'Cancelled',
                cancelled_mission: 'Cancelled Missions ({{nbrMission}})',
                no_mission: 'You have no cancelled missions.'
              },
              potential: {
                title: 'Potential',
                potential_mission: 'Potential Missions ({{nbrMission}})',
                no_mission: 'You have no potential missions.'
              }
            },
            sales: {
              avis: 'Reviews',
              mark: 'Average Rating',
              text_1: 'left by your clients over the last 12 months',
              text_2: 'on all your missions rated by your clients'
            },
            detailed_mission: {
              pending_mission: 'Ongoing Mission ⌛',
              accepted: 'Proposal Accepted',
              provisionée: 'Mission Scheduled',
              in_progress: 'Mission In Progress',
              completed: 'Mission Completed',
              mission_completed: 'Mission Completed ✅',
              details: 'Mission Details',
              historic: 'Mission History',
              conversation: 'Access the Conversation',
              mission: 'mission(s)',
              tab: {
                detail: 'Detail',
                quantity: 'Quantity',
                unitary_price: 'Unit Price (Excl. Tax)',
                total_price: 'Total (Excl. Tax)'
              }
            },
            profile: {
              edit_mode: {
                desc: 'Description',
                location: 'Location',
                website: 'Website',
                activity: 'Activity'
              },
              content: {
                desc: 'Description',
                location: 'Location',
                website: 'Website',
                activity: 'Activity',
                grade: 'No Grade',
                mission: 'Missions done: {{value}}'
              },
              verif: {
                title: 'Verifications',
                verified_student: 'Verified Student',
                verified_freelance: 'Verified Freelancer',
                linker_charte: 'Signed Linker Charter',
                verified_email: 'Verified Email',
                more_information: 'More Information',
                check_charte: 'View the Charter'
              },
              skills: {
                title: 'Skills',
                add_skill: 'Add a Skill',
                no_skill: 'No skills'
              },
              experience: {
                title: 'Experiences',
                add_exp: 'Add Your Experience',
                name: 'Enter the name of your experience?',
                position: 'What position did you hold?',
                localisation: 'Location',
                date: 'Date',
                description: 'Describe your experience'
              },
              education: {
                title: 'Education',
                add_form: 'Add Your Education',
                name: 'Enter the name of your education?',
                position: 'What is the subject of this education?',
                localisation: 'Location',
                date: 'Date',
                description: 'Describe the education'
              }
            },
            groups: {
              show_desc: 'Group Description',
              title: 'Create a Group',
              name: 'Choose a name for your group',
              description: 'Add a description for your group',
              button: 'Create Group',
              invite: {
                title: 'Add a Member'
              },
              exclude: {
                title: 'Exclude a Member'
              }
            },
            settings: {
              error: {
                empty_field: 'Please fill in all fields.',
                old: 'The old password is incorrect.',
                old_new: 'The old password and the new password must not be identical.',
                new_confirm: 'The passwords do not match.',
                composition: 'The password must contain at least one uppercase letter, one number, and one special character.',
                success: 'Your password has been successfully changed.'
              },
              security: {
                title: 'Security',
                password: 'Password',
                password_old: 'Current Password',
                password_new: 'New Password',
                password_confirm: 'Confirm New Password',
                modif: 'Change Password',
                param1: '1 special character',
                param2: '1 uppercase letter',
                param3: '1 number',
                delete: 'Delete my account',
                desactivation: 'Deactivate my account'
              },
              preference: {
                title: 'Preferences',
                language: 'Language',
                choose_language: 'Choose the interface language.',
                select_language: 'Select your language',
                french: 'French',
                english: 'English',
                save: 'Save',
                notifications: 'Notifications (emails)',
                choose_notif: 'Choose if you want to receive an email for the following:',
                new_message: 'New message notification',
                group_notif: 'Group-related notification',
                doc_notif: 'Document-related notification',
                mission_notif: 'Mission-related notification'
              }
            }
          },
          company: {
            title: 'I am a COMPANY',
            total_mission: 'Total mission: ',
            dashboard: {
              card: {
                status: {
                  content: 'Here are the steps you still need to complete to finalize your profile and start posting missions. It’s the final stretch!',
                  cni: 'ID Card',
                  kbis: 'KBIS',
                  siret: 'SIRET'
                }
              },
              invoices: 'My Invoices'
            },
            mission: {
              pending: {
                title: 'In Progress',
                pending_mission: 'Ongoing Missions ({{nbrMission}}).',
                no_mission: 'You have no ongoing missions.'
              },
              completed: {
                title: 'Completed',
                completed_mission: 'Completed Missions ({{nbrMission}}).',
                no_mission: 'You have no completed missions.'
              },
              cancelled: {
                title: 'Cancelled',
                cancelled_mission: 'Cancelled Missions ({{nbrMission}}).',
                no_mission: 'You have no cancelled missions.'
              },
              potential: {
                title: 'In Search',
                potential_mission: 'Missions in Search ({{nbrMission}}).',
                no_mission: 'You have no missions in search.'
              }
            },
            detailed_mission: {
              research_mission: 'Mission in Search ⌛',
              pending_mission: 'Ongoing Missions ⌛',
              accepted: 'Proposal Accepted',
              provisionée: 'Mission Scheduled',
              in_progress: 'Mission In Progress',
              completed: 'Mission Completed ✅',
              details: 'Mission Details',
              historic: 'Mission History',
              conversation: 'Access the Conversation',
              mission: 'missions',
              participants: 'Participants',
              no_participants: 'No group found',
              selection: 'List of Groups',
              tab: {
                detail: 'Detail',
                quantity: 'Quantity',
                price: 'Price',
                task: 'Tasks',
                attribution: 'Attribution',
                no_action: 'No action to be taken'
              },
              devis: {
                title: 'Quote for the mission: {{name}}',
                no_devis: 'No quote provided for the mission: {{name}}',
                devis: 'Upload your quote'
              },
              task: {
                modal_title: 'Add a Task',
                name: 'Name',
                description: 'Description',
                price: 'Price'
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
              payments: 'Paiements',
              ticket: 'Tickets'
            }
          },
          snackbar: {
            invitation_error: 'You cannot invite this person because they are already in a group.'
          }
        }
      }
    }
  })

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
