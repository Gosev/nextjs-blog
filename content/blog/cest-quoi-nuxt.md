---
title: Pourquoi utiliser Nuxt ? Que vaut Nuxt vs. Next ?
img: nuxt.jpg
date: "2021-06-01"
---
Je me suis donné comme objectif en début d'année d'essayer de voir comment marche Vue. Comme vous le savez peut-être, je suis un fan de NextJS, et dès mes premières recherches sur Vue j'ai vu qu'il y avait un équivalent de NextJS chez Vue, qui s'appelle Nuxt. C'est ce que j'appelle des "méta-framework" (et surement pas que moi d'ailleurs) puisque ce sont des framework qui se construisent par dessus d'autres framework. Je me suis dit qu'un bon point cas d'usage pour apprendre ces méta-framework serait d'essayer de faire un blog. J'ai conscience de 3 méta frameworks principaux, à savoir : NextJS, NuxtJS et Sveltekit, qui est la version dans Svelte. Cependant Sveltekit est encore trop jeune pour que je puisse le recommander même si il a l'air très intéressant, donc on va laisser Sveltekit pour plus tard. 

Aujourd'hui nous allons donc nous poser deux questions :
- **Qu'est-ce que Nuxt**, qu'est-ce qu'apportent les framework fullstack comme Nuxt et Next ? Quels sont les points communs entre Nuxt et Next ?
- Que **vaut Nuxt**, comparé à NextJS, notamment en termes de "DX", d'expérience dévelopeur. Quels sont les différences entre Nuxt et Next ?

## Qu'est-ce que Nuxt ? (les points communs) 

Nuxt est l'équivalent de Next, dans le monde de Vue. Une fois qu'on a dit ça, on à à la fois rien dit et tout dit. 

Comme vous le savez peut-être, le principal intérêt des frameworks de type Vue ou React c'est qu'ils permettent d'implémenter côté client une partie de la **logique et de la navigation traditionnellement été réalisés côté serveur**. 

Ca a pour avantage de permettre une **ergonomie plus fluide**, mais ça a pour inconvénient que ça demande du coup un effort au navigateur pour interpréter le contenu qu'on lui envoie, puisqu'il faut télécharger et interpréter le Javascript en plus d'afficher le HTML qu'on lui fournir. En termes d'optimisation pour les moteurs de recherche, un React "de base" marche moins bien que des technologies côté serveur. 

La solution qu'implémentent Nuxt et Next (et je crois, Sveltekit) consiste à faire du **rendu JavaScript côté serveur** (ou SSR: server-side rendering), pour faciliter la tache au "crawler" de Google. En plus de lui cela, ce système permet aussi de gérer et générer les méta-datas pour chaque page (le title, la meta-description etc.) ce qui permet 

Cette solution permet aussi, dans le cas où il n'y a pas de données dynamiques, à faire des rendus de page statiques, c'est à dire qui peuvent être hébergés sur une solution de type S3 qui se contente juste d'envoyer des fichiers sans avoir de code qui tourne. 

Les framework fullstack comme Next comme Nuxt fonctionnent en deux phases. Dans première phase, le serveur génère une première version de la page qui contient toute la structure HTML de la page, ainsi que du code javascript qui permet de la rendre interactive après coup, après qu'elle soit affichée. 

Ainsi on a une page qui s'affiche rapidement mais qui devient interactive par la suite. Ce fonctionnement optimise donc à la fois le référencement et l'expérience utilisateur, et permet d'avoir des méta-datas optimisés pour les moteurs de recherche. De plus, il permet de créer des fichiers statiques qui permettent d'avoir des coûts d'hébergement qui sont plus faibles, et tout un tas de choses comme ça qui sont appréciables comme l'AMP, ce genre de choses. Et c'est pour ça qu'existent ces framework fullstack. A mon sens, ils représentent l'avenir du développement, notamment en raison de l'amélioration qu'ils apportent à l'expérience développeur:  les changements apparaissent tout de suite à l'écran, sans avoir besoin de rafraîchir manuellement. 

## Quelles sont les particularités de Nuxt en termes de DX ?
Pour comparer ces deux frameworks j'ai choisi un angle un peu particulier, un cas pratique : le développement d'un blog. Comment est-ce qu'on peut comparer Next et Nuxt sous l'angle de l'expérience développeur. J'ai comparé les deux solutions sur trois étapes du développement. 1. Premièrement, l'installation : que se passe-t-il quand on installe, quel est l'expérience de l'installation ? 2. Deuxièmement, la création de la page index, et la récupération du contenu. 3. Troisièmement, la création d'une page d'u article

### L'installation
A l'installation, Nuxt propose plus d'options. Avec Next, il y a besoin d'installer les pièces supplémentaires par la suite, là où Nuxt propose directement d'installer Typescript, ou des frameworks CSS comme Bootstrap, Bulma, Tailwind et d'autres encore. De la même façon, Nuxt prend en charge l'installation de mécanismes de test (et propose différentes solutions) ou de lint. 
Nuxt me tient par la main : tout est déjà préparé. Il n'y a pas besoin de fouiller sur internet pour trouver des informations de pertinence et de fraicheur douteuses, et qui proposent des manipulations fastidieuses. De ce fait, l'expérience développeur est meilleure à l'installation sur Nuxt. 

### La recherche de contenu (création de la page index) 
Nuxt dispose d'un accesseur particulier ($content) qui permet de gérer directement le contenu, et ce grâce à une syntaxe ostensiblement de celle de MongoDB. La librairie permet de chercher directement du contenu avec des filtres, des tris, ou en sélectionnant qui sont juste après ou juste avant. Tout cela rend la gestion du contenu beaucoup plus facile et que ce que nous avons dans Next, où il faut coder l'accès au contenu soi-même. Sur ce point la Nuxt est devant. 

### Création d'une page d'un article
Comme le fait Next, le routage (l'association d'une url et d'un contenu) se fait en fonction des noms de fichiers sur le disque dur. La mise en page se fait de manière très similaire dans les deux solution. Deux choses particulières sont à souligner. Première chose: Nuxt s'installe un testeur Tailwind qui permet de voir directement quels sont les styles qui ont été activés par la configuration sur cette page. C'est très agréable de ne pas avoir à combiner mentalement la documentation de tailwind et les modifications spécifiques dans le fichier de configuration : On a directement le résultat dans un testeur. La deuxième différence sympathique : Nuxt propose un éditeur intégré pour modifier à la volée le contenu texte. Nul besoin d'aller chercher dans le code source, l'opération est directe et facile. Ici aussi Nuxt propose une meilleure expérience développeur
## Les à côtés
De manière générale la documentation de Nuxt est très bien faite et propose beaucoup d'exemples. Il y a notamment l'exemple de comment utiliser Typography de Tailwind, un plugin de Tailwind qui permet de faire une mise en page d'article de blog déjà bien configurée. 

## Conclusions... que choisir ?
Sur les trois points, Nuxt a été devant. Si je partais de zéro, si je maitrisais autant Vue que React, je choisirai Nuxt. Seulement ce n'est pas le cas, je suis déjà bien familier avec Next et React, et je ne maitrise pas Vue (qui ressemble trop à Angular pour attiser mon appétit d'apprentissage). J'espère juste que Nuxt va inspirer les développeurs de Next, que les deux solutions vont s'inspirer mutuellement. 
