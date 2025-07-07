# 📘 Règles de collaboration avec l’IA – Projet `trading_bot`

Ce document contient des **blocs de consignes prêts à l’emploi** à copier dans les conversations pour garantir que chaque interaction respecte le cadre du projet, sans supposition ni régression.

---

## 🔒 1. Bloc de Démarrage – Session stricte

À utiliser dès le début d'une nouvelle session :

```
🔒 SESSION STRICTE – INTERDICTION DE SUPPOSITION

Tu dois :
1. Utiliser **exclusivement** l’archive `trading_bot_070725_20h15.zip` en PJ
2. Ne **jamais inventer de fichier ou de code**
3. Respecter **scrupuleusement l’arborescence réelle**
4. Vérifier chaque fichier **directement dans l’archive, jusqu’à profondeur 5**
5. Ajouter un **résumé clair et précis** des changements par fichier
6. Ne jamais supprimer ou tronquer un code existant sans justification
7. Travailler en **mode silencieux, rigoureux, précis**

Si un fichier est manquant, tu m’en informes d’abord.
```

---

## 🛠 2. Bloc de livraison complète

À utiliser lors de la demande d’un composant complet :

```
🛠 DEMANDE DE LIVRAISON COMPLÈTE – MODE STRICT

Tu dois :
- Travailler uniquement à partir de l’archive `trading_bot.zip` `/mnt/data/trading_bot_ref/`
- Ne livrer que des fichiers réels et corrigés
- Ne modifier que ce qui est nécessaire
- Me fournir chaque fichier :
  - ✅ Avec son **chemin exact**
  - ✅ Son **contenu corrigé complet**
  - ✅ Un **résumé clair des changements** par fichier
- Ne jamais livrer un fichier qui ne respecte pas l’arborescence

Si un fichier requis est manquant ou absent, tu dois m’alerter immédiatement **avant toute génération**.
```

---

## 🔍 3. Bloc de vérification post-livraison

À utiliser pour demander une **analyse minutieuse** d’une livraison :

```
🔍 VÉRIFICATION DE LIVRAISON – PAS D’INTERPRÉTATION

Je veux que tu :
- Réanalyses **chaque fichier livré**
- Le compares **au fichier original dans l’archive**
- Détaille **ce qui a été modifié ou supprimé**
- M’indique tout **manque, oubli ou suppression de logique existante**
- Corrige si nécessaire **en respectant l’existant**

Aucun fichier ne doit créer de régression ou ignorer un code métier existant.
```

---

## 🛡 4. Bloc de robustesse (résilience)

À utiliser pour empêcher qu’un crash d’API ou d’un module n’affecte tout le front :

```
🛡 ROBUSTESSE DU SYSTÈME – OBJECTIF STABILITÉ

Tu dois :
- Identifier tous les points où une erreur d’un service (API/DB) peut faire planter une page
- Renforcer les appels en :
  - Utilisant des `try/catch` au bon niveau
  - Isolant chaque bloc métier/API pour ne pas bloquer les autres
  - Affichant une **erreur élégante dans le bloc concerné uniquement**
- Ne rien casser du reste du système

⚠️ Tu ne dois **jamais masquer une erreur sans la rendre visible** à l’utilisateur dans le bon composant.
```

---

## 🧾 5. Bloc de correction suite à logs ou erreur précise

À utiliser quand tu fournis une **erreur de log ou bug concret** :

```
🧾 CORRECTION DE BUG – AVEC LOGS

Tu dois :
- Analyser **les logs fournis uniquement**
- Retrouver la cause **exacte dans le code source réel**
- Ne proposer une modification **que si elle correspond exactement à l’erreur constatée**
- Ne jamais supprimer un bloc de code sans justification claire

Ajoute si nécessaire les fichiers ou scripts manquants pour restaurer un état stable (ex : table `predictions`).
```

---

## 📦 6. Bloc d’ajout de composant (endpoint, module, front, etc.)

À utiliser pour une nouvelle fonctionnalité :

```
📦 AJOUT D’UN NOUVEAU COMPOSANT – CONFORME À L’EXISTANT

Tu dois :
- Vérifier l’organisation réelle du projet
- Créer le composant demandé **dans la bonne structure**
- Ajouter :
  - Le fichier principal
  - Les fichiers `models.py`, `schemas.py`, `crud.py`, `tests` si nécessaire
- Brancher le tout dans le bon `main.py`, `router`, `index.tsx`, etc.
- Respecter le style, les conventions, le nommage et les imports de l’existant
```

---

## 🥪 7. Bloc pour tests et vérification finale

À utiliser à la toute fin, avant la phase de validation :

```
🥪 VALIDATION FINALE – TESTS DE NON-RÉGRESSION

Tu dois :
- Comparer chaque fichier modifié à l’original
- Vérifier :
  - Aucune logique supprimée
  - Aucun doublon
  - Aucun conflit entre fichiers
  - Aucune hypothèse non vérifiée
- Exécuter les tests si présents, ou me fournir les commandes à exécuter

L’objectif est d’avoir un système **fonctionnel, stable et cohérent**, sans perte de qualité.
```

---

> 📁 **Conseil** : Tu peux stocker ce fichier dans `docs/AI_Working_Contract.md` ou dans Notion pour le copier à chaque fois que tu veux cadrer une action spécifique avec moi.
