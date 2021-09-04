---
title: Le choix d'un framework de blog
img: framework.jpg
date: "2021-04-01"
---
Le site de blog Medium a beaucoup de qualités. J’adore l'ergonomie de son interface d'écriture. Malheureusement le site n'est pas fait pour du contenu francophone. J’ai un blog anglophone sur Medium, mais pas de blog francophone. Je me dis que c’est l’occasion de tester des framework de génération de site statique que je ne connaissais pas, pour voir s'il y a mieux que Next.Js (que je considère meilleur que Gatsby, j'expliquerai pourquoi dans un autre article). 

**Pourquoi un blog ?** Pour plusieurs raisons : c'est un cas d'usage "de la vraie vie", qui est à la fois concrêt et tout de même relativement simple (plus simple en tout cas qu'un jeu vidéo ou qu'un site de vente en ligne). Précisons tout de meme tout de suite que je n'ai aucune idée si je vais maintenir le blog en question une fois mon choix fait, c'est un autre débat :D

## Comment choisir ?

Dans un framework, je voudrais pouvoir :
* avoir du **contenu dynamique** : écrire des articles en markdown, les lister automatiquement dans une page index et les injecter dans une page blog générique
* générer des **pages statique, et les héberger sur S3**, et s'il y a besoin de logique serveur fonctionner en serverless
* utiliser [Tailwind](https://tailwindcss.com), qui est mon framework CSS préféré en ce moment
* inclure des videos YouTube 
* afficher du code, évidemment, il faut pouvoir faire un...

```js
console.log('hello world');
```


Idéalement j'aimerais pouvoir en profiter pour mieux comprendre un framework que je ne connais pas encore. A première vue j'ai deux choix, qui sont des équivalents de Next: *Nuxt.JS*, sur la base de Vue 3, ou *Sveltekit*, sur la base de Svelte. 
J'ai donc suivi les guides de démarrage de ces deux framework pour (éventuellement) en choisir un. 
Avec bien sur l'option de rester sur NextJS si aucun des deux ne me convainc, évidemment !

Mes critères de choix prendront principalement en compte :
* la facilité d'apprentissage et d'arriver à mes fins
* la documentation
* le "DX", c'est-à-dire l'expérience développeur

Du peu que j'en ai lu, Vue a été crée par un certain Evan You qui avait travaillé sur Angular JS. Même si Angular 2+ n'a pas grand chose à voir avec Angular JS, j'ai l'impression que Svelte utilise des concepts complètement différents de ce que je connais déjà (à savoir React et Angular, côté framework côté client), donc je vais commencer avec Svelte et Sveltekit 

(Ah oui, petit détail, au cas où ce ne serait pas évident : j'utilise cet article - pendant que je suis en train de l'écrire en Markdown - comme contenu initial pour tester les deux systèmes de blog).

Un petit point de détail : je ne connais aucun des deux framework, c'est vraiement juste une première impression. Et les premières impressions peuvent être erronées. Donc si je me trompe n'hésitez pas à me le signaler !

Sur ce, c'est parti pour la découverte de SvelteKit


Premier pas avec SvelteKit 
=========================

Pour commencer une appli Sveltkit, il faut faire :

```cli
npm init svelte@next mon-appli
```

Quand je lance la commande, on me propose plusieurs choix : de créer un projet vide ou une démo, d'utiliser Typescript, d'utiliser ESLint, d'utiliser Prettier. Je dis oui à tout. La démo est relativement sommaire : un compteur, une liste de todos, et un lien vers la documentation.

La doc de Svelte est intéressante mais je sais pas toujours si ce qu'elle dit est valable dans SvelteKit. Elle parle de rollup et webpack mais pas vite, qui est utilisé (si j'ai bien compris) dans SvelteKit.

Voici Les premières choses qu'on nous dit dans la doc de SvelteKit : 

SvelteKit n'est pas encore en version stable, il pourrait y avoir des changements avant la version 1.

Sveltekit repose sur Svelte qui est un "framework UI qui compile les composants pour en faire du Javascript basique".

Sveltekit ne suppose pas l'existence d'un serveur contrairement à Sapper (qui était l'itération précédente du concept), il utilise des "adaptateurs" qui permettent de faire tourner dans différents *contextes* (sur un serveur, en statique, en serverless, ...)

Contraiement à Next, les routes API ne sont pas isolées dans un dossier `api/` mais regroupées par feature" avec les fichiers qui servent à faire la présentation (les fichiers .svelte, si j'ai bien compris). D'ailleurs les fichiers correspondants ne sont pas dans un dossier `pages/` mais dans un dossier `routes/`

Comme Next, le chemin du fichier se traduit en URL, donc le fichier /route/contact.svelte va être rendu sur la route /contact. Par ailleurs comme sur Next il y a la possibilité de faire des routes dynamiques, de telle sorte que /route/blog/[slug].svelte permette de rendre toutes les routes de type /blog/titre-article (ou titre-article est le titre de l'article)

Il y a aussi la possibilité de rendre directement des fichiers Markdown, par contre je n'arrive pas à trouver comment appliquer un style à ces fichiers, ni à en récupérer dynamiquement la liste. J'imagine qu'il faut faire une manipulation similaire à celle de next, où on utilise la librairie fs (qui lit dans le filesysteme) pour faire la liste des fichiers dans un dossier, mais la doc n'est pas très claire là dessus (pour le moment en tout cas). 

SvelteKit introduit d'ailleurs la notion de adders, en utilisant une commande "npx-apply" qui va rechercher du contenu dans un repos git (et non sur NPM) et peut-être même l'exécuter (ou exécuter un script qui modifie ou crée des fichiers de configuration, c'est pas encore très clair pour moi)

Parmis ces adders il y a Tailwind, 


D'autres points que j'ai glanés dans la documentation ou dans mes recherches :
*  Apparemment SvelteKit ne marche pas bien avec Yarn.
* Ce lien est aussi utile que les docs : https://sk-incognito.vercel.app/learn/what-is-sveltekit
* Parmis ces adders

Adders : "npx apply svelte-add/tailwindcss  - This is a community experiment to add integrations! `npx apply` uses GitHub repositories, not NPM. You can check out the list of adders"

