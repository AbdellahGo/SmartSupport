# Décisions SmartSupport

Les validations ci-dessous sont issues du brief de l’étudiant. L’exigence officielle du sujet reste prioritaire lorsque les PDF de référence sont disponibles. Consulter [l’état du projet](PROJECT_STATE.md) pour l’avancement.

## DEC-001 — Deux rôles et une seule entité UTILISATEUR

**Validée**

CLIENT et TECHNICIAN sont les deux seuls rôles. L’IA intervient en tant que service.

## DEC-002 — Cardinalités corrigées et catégorie dédiée

**Validée**

Les cardinalités acceptées figurent au MCD. Le ticket peut exister sans technicien, catégorie ou priorité selon les règles décrites.

## DEC-003 — Stack principale

**Validée par l’étudiant**

React, TanStack Query, Node.js, Fastify, REST, MVC adaptée aux API, PostgreSQL, Zod, JWT, RBAC à deux rôles, hachage et requêtes SQL paramétrées. Git, GitHub et Postman pour l’outillage. Express et Docker exclus. Accord du professeur sur Fastify à confirmer.

## DEC-004 — Contrôle humain de l’envoi

**Validée**

Le technicien modifie et valide le texte avant l’envoi. Seul le backend accède au LLM.

## DEC-005 — Navigation, cycle de vie et politique métier

**À confirmer**

Routes, transitions précises, réouverture, réponse après clôture, création des comptes et des produits, attribution et réaffectation.

## DEC-006 — Options fonctionnelles et données

**À confirmer**

Historique et échange de messages, recherche avancée, statistiques, base JSON/Markdown et nom_entreprise facultatif.

## DEC-007 — Choix d’implémentation

**À confirmer**

JavaScript ou TypeScript, bibliothèque de routage, CSS, fournisseur LLM, stockage et renouvellement JWT, driver SQL ou ORM, hébergement et acceptation de Fastify par le professeur.

## DEC-008 — Contrat REST et MLD

**Proposition**

Les endpoints et le MLD servent de base de travail aux sprints S02 et S03. Le MPD et le SQL relèvent du sprint S02.
