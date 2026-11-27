# Backlog SmartSupport

Le brief atteste la réalisation de l’analyse initiale. Le sprint S00 est en cours et S01 à S10 sont à faire. Les priorités des tâches sont des propositions de planification. Aucune échéance ni aucun résultat de test applicatif n’est renseigné.

Les états disponibles sont `TODO`, `IN PROGRESS`, `IN REVIEW`, `BLOCKED`, `DONE`. La colonne GitHub Issue reçoit le lien d’une issue lorsqu’elle existe.

## S00 — Analyse des besoins et cahier des charges

- **Statut** — IN PROGRESS
- **Objectif** — Cadrer le problème, les acteurs et le périmètre.
- **Prérequis** — Brief du projet.
- **Livrables** — Cahier des charges et décisions de périmètre.
- **Critères d’acceptation** — Exigences traçables, écarts avec le sujet officiel recensés et points ouverts identifiés.
- **Dépendances** — Aucune

| ID | Tâche | Priorité | Statut | Note | GitHub Issue |
| --- | --- | --- | --- | --- | --- |
| S00-T01 | Réaliser l’analyse initiale | Haute | DONE | Contexte et besoins initiaux identifiés dans le brief. | — |
| S00-T02 | Consolider le cahier des charges | Haute | TODO | Vérifier les exigences sur les PDF lorsqu’ils seront disponibles. | — |
| S00-T03 | Consigner les validations de cadrage | Haute | TODO | Tracer les choix de rôles, de stack et de modélisation confirmés dans le brief. | — |

## S01 — User Stories et User Flows

- **Statut** — TODO
- **Objectif** — Formaliser les parcours et les règles métier.
- **Prérequis** — Cadrage S00.
- **Livrables** — User stories, parcours et catalogue métier.
- **Critères d’acceptation** — Les deux rôles, les cas d’échec et les règles ouvertes sont couverts.
- **Dépendances** — S00

| ID | Tâche | Priorité | Statut | Note | GitHub Issue |
| --- | --- | --- | --- | --- | --- |
| S01-T01 | Rédiger les user stories et leurs critères | Haute | TODO | — | — |
| S01-T02 | Valider les parcours et les routes | Haute | TODO | — | — |
| S01-T03 | Arbitrer les transitions, l’attribution et la gestion des comptes | Haute | TODO | — | — |

## S02 — Database Design

- **Statut** — TODO
- **Objectif** — Finaliser les modèles et préparer les requêtes.
- **Prérequis** — Règles métier S01.
- **Livrables** — MCD, MLD, MPD, SQL et requêtes de vérification.
- **Critères d’acceptation** — Cardinalités, clés et contraintes de rôle cohérentes, avec cas de champs facultatifs vérifiés.
- **Dépendances** — S01

| ID | Tâche | Priorité | Statut | Note | GitHub Issue |
| --- | --- | --- | --- | --- | --- |
| S02-T01 | Finaliser le MCD et le MLD | Haute | TODO | — | — |
| S02-T02 | Concevoir le MPD et écrire le SQL | Haute | TODO | — | — |
| S02-T03 | Préparer les requêtes et vérifier les contraintes | Normale | TODO | — | — |

## S03 — API Design et architecture technique

- **Statut** — TODO
- **Objectif** — Fixer les contrats et la séparation des couches.
- **Prérequis** — Parcours et modèle logique stabilisés.
- **Livrables** — Contrat REST, architecture et exemples Postman.
- **Critères d’acceptation** — Chaque route décrit ses entrées, sorties, erreurs et droits.
- **Dépendances** — S01, S02

| ID | Tâche | Priorité | Statut | Note | GitHub Issue |
| --- | --- | --- | --- | --- | --- |
| S03-T01 | Définir contrats, erreurs, pagination et permissions | Haute | TODO | — | — |
| S03-T02 | Valider les couches et arbitrer les choix techniques | Haute | TODO | — | — |
| S03-T03 | Préparer la collection Postman | Normale | TODO | — | — |

## S04 — Backend – Authentification et autorisations

- **Statut** — TODO
- **Objectif** — Protéger l’identité et les accès.
- **Prérequis** — Contrats API et méthode JWT arbitrée.
- **Livrables** — Authentification, contrôles de rôle et de propriété.
- **Critères d’acceptation** — Les accès croisés et les jetons invalides sont refusés.
- **Dépendances** — S02, S03

| ID | Tâche | Priorité | Statut | Note | GitHub Issue |
| --- | --- | --- | --- | --- | --- |
| S04-T01 | Mettre en place le hachage et la connexion | Haute | TODO | — | — |
| S04-T02 | Mettre en place JWT, RBAC et contrôle de propriété | Haute | TODO | — | — |
| S04-T03 | Vérifier les accès autorisés et interdits | Haute | TODO | — | — |

## S05 — Backend – Fonctionnalités métier

- **Statut** — TODO
- **Objectif** — Mettre en œuvre le traitement des tickets.
- **Prérequis** — Modèle physique et accès disponibles.
- **Livrables** — API métier tickets, produits, catégories et réponses.
- **Critères d’acceptation** — Création, consultation, réponse et clôture suivent les règles validées.
- **Dépendances** — S02, S03, S04

| ID | Tâche | Priorité | Statut | Note | GitHub Issue |
| --- | --- | --- | --- | --- | --- |
| S05-T01 | Réaliser la création et la consultation des tickets | Haute | TODO | — | — |
| S05-T02 | Réaliser la réponse et la clôture | Haute | TODO | — | — |
| S05-T03 | Intégrer les options métier retenues | Normale | TODO | — | — |

## S06 — Intégration de l’intelligence artificielle

- **Statut** — TODO
- **Objectif** — Assister le tri et la rédaction.
- **Prérequis** — API métier et fournisseur LLM choisi.
- **Livrables** — Classification, priorité, brouillons et gestion des indisponibilités.
- **Critères d’acceptation** — Une panne préserve le ticket et chaque envoi requiert une validation humaine.
- **Dépendances** — S03, S05

| ID | Tâche | Priorité | Statut | Note | GitHub Issue |
| --- | --- | --- | --- | --- | --- |
| S06-T01 | Intégrer la classification et la priorité | Haute | TODO | — | — |
| S06-T02 | Générer des brouillons à valider | Haute | TODO | — | — |
| S06-T03 | Vérifier l’indisponibilité, les quotas et le filtrage des données | Haute | TODO | — | — |

## S07 — UI/UX Design

- **Statut** — TODO
- **Objectif** — Concevoir les interfaces des deux rôles.
- **Prérequis** — User flows confirmés.
- **Livrables** — Maquettes et états d’interface.
- **Critères d’acceptation** — Les parcours principaux et les états vide, chargement et erreur sont couverts.
- **Dépendances** — S01

| ID | Tâche | Priorité | Statut | Note | GitHub Issue |
| --- | --- | --- | --- | --- | --- |
| S07-T01 | Concevoir les maquettes client et technicien | Haute | TODO | — | — |
| S07-T02 | Vérifier les parcours, la lisibilité et l’accessibilité | Normale | TODO | — | — |

## S08 — Frontend Development

- **Statut** — TODO
- **Objectif** — Intégrer les parcours à l’API.
- **Prérequis** — Maquettes et contrats exploitables.
- **Livrables** — Interfaces React et intégration TanStack Query.
- **Critères d’acceptation** — Les parcours convenus fonctionnent avec les états de chargement et d’erreur.
- **Dépendances** — S04, S05, S06, S07

| ID | Tâche | Priorité | Statut | Note | GitHub Issue |
| --- | --- | --- | --- | --- | --- |
| S08-T01 | Construire les écrans client | Haute | TODO | — | — |
| S08-T02 | Construire les écrans technicien | Haute | TODO | — | — |
| S08-T03 | Intégrer les requêtes, mutations et états réseau | Haute | TODO | — | — |

## S09 — Tests et cybersécurité

- **Statut** — TODO
- **Objectif** — Vérifier la conformité fonctionnelle et la sécurité.
- **Prérequis** — Parcours intégrés et environnement de test.
- **Livrables** — Plan de tests et résultats documentés.
- **Critères d’acceptation** — Les écarts sont reproductibles et les corrections prioritaires sont revérifiées.
- **Dépendances** — S06, S08

| ID | Tâche | Priorité | Statut | Note | GitHub Issue |
| --- | --- | --- | --- | --- | --- |
| S09-T01 | Exécuter et documenter les tests fonctionnels | Haute | TODO | — | — |
| S09-T02 | Vérifier les autorisations, les injections et les secrets | Haute | TODO | — | — |
| S09-T03 | Évaluer la protection renforcée contre les injections de prompt | Basse | TODO | — | — |

## S10 — Déploiement et documentation

- **Statut** — TODO
- **Objectif** — Préparer la livraison et la démonstration.
- **Prérequis** — Tests exécutés et hébergement choisi.
- **Livrables** — Livraison, guide de mise en service et dossier pédagogique.
- **Critères d’acceptation** — La mise en service est reproductible et la démonstration couvre les parcours demandés.
- **Dépendances** — S09

| ID | Tâche | Priorité | Statut | Note | GitHub Issue |
| --- | --- | --- | --- | --- | --- |
| S10-T01 | Préparer le déploiement et les variables d’environnement | Haute | TODO | — | — |
| S10-T02 | Finaliser le dossier, les guides et la démonstration | Normale | TODO | — | — |
