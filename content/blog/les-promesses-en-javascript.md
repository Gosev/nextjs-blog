---

title: Les Promesses en Javascript
img: alise-storsul-EWqwxi9He04-unsplash.jpg
credits: Photo by <a href="https://unsplash.com/@alisestorsul?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">alise storsul</a> on <a href="https://unsplash.com/s/photos/pinky-swear?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
video: RWLMgpb9YWo
date: "2021-08-15"
---


Pourquoi (et comment) utiliser les Promises ? Que sont les Promise (ou promesses, en Français), pourquoi les utiliser, comment s’en servir ?  

## Le problème du javascript

Fondamentalement, le JavaScript est mono tache. 

Qu’est-ce qu’on entend par là ? Cela signifie que s’il fait quelque chose qui lui prend du temps – un gros calcul par exemple – il ne peut plus rien faire d’autre. 

De temps en temps ça m’arrive de faire un « while » où j’oublie d’incrémenter la chose sur laquelle j’ai ma condition, et donc de créer une boucle infinie. Dans ce cas... tout se fige. Le navigateur ne répond plus, je dois forcer la fenêtre à se fermer. 

Alors évidemment c’est un cas extrême, mais comme vous le savez surement, les films au cinéma tournent à 24 images par seconde, et les jeux vidéo à au moins 30 FPS. Mais 24 images/s, ça signifie une image toutes les 40 millisecondes environ. 

Pour dire les choses autrement, les calculs ou des traitements en JavaScript doivent tous durer moins de 40 millisecondes, sinon les utilisateurs vont avoir l’impression que l’application « rame ».

Mais si on veut faire un appel à une API, en gros à un serveur web, l’aller-retour du message va forcément mettre plus de temps que ça. Le JavaScript ne peut pas se permettre d’attendre. 

## Les fonctions callback 

Du coup ce qu’on fait – à l’époque, et fondamentalement, encore aujourd’hui – c’est d’utiliser des traitements asynchrones, en disant au navigateur : « lance tel processus (par exemple, appelle telle API), et quand c’est fini, rappelle-moi ». Ou plus exactement, exécute cette fonction que je te donne en paramètre. Cette fonction s’appelle une callback : qui signifie justement le fait de rappeler. 
 
Ce fonctionnement permet des logiques un peu construites, par exemple : quand l’utilisateur clique sur le bouton, connecte-toi en appelant le login, récupère les données d’authentification et interprète les, puis rappelle tel web service avec les données de connexion pour mettre à jour les informations du joueur. Rien de bien compliqué dans l’absolu, mais ce genre de fonctionnement produit des callbacks dans des callbacks dans des callback, ce qui rend le code difficilement lisible. Ce que certains ont appelé : « l’enfer des callbacks ». 

Un autre problème se profile également avec ce genre de fonctionnement : le traitement des erreurs. Il faut faire un traitement spécifique à chaque niveau de profondeur, et si une de ces erreurs n’est pas traitée, il est assez difficile de la débugger avec des messages sous la forme de « une erreur s’est produite à la ligne 5 de la fonction anonyme ». Et c’est encore pire quand la callback échoue silencieusement ! 

## C’est quoi une promise ?

C’est pour résoudre ces problèmes qu’a été inventé un objet qui comporte trois propriétés fondamentales :
1/ Il encapsule la notion de traitement asynchrone
2/ Il permet la gestion des erreurs qui en résultent 
3/ Il permet un traitement en chaine sans avoir besoin d’imbriquer

Cet objet, c’est la *Promise*. 

Une Promise comporte deux fonctions : then et catch. 

La fonction « then » prend en paramètre le résultat de la Promise, et renvoie une nouvelle promise 

La fonction « catch » prend en paramètre l’erreur, et renvoie également une nouvelle promise. 

Ce fonctionnement, ce renvoie de promise, est justement ce qui nous permet de « chainer » les Promises, c’est-à-dire de faire :  

`p.then(traitement).then(traitement2)` 

où p est une promise 

Cette fonctionnalité de chainage nous permet une lecture linéaire au lieu de faire une lecture imbriquée. 

La façon dont la Promise fonctionne est que le premier catch de la liste soit appelé quel que soit le traitement antérieur où se produit l’erreur – la gestion d’erreur est donc centralisée. 


## Comment fabriquer une promise ?

Je vous propose qu’on fabrique ensemble une promise qui attend juste pendant une durée qu’on précisera. Donc on va faire une fonction « sleep » qui revoie une promesse qui s’exécute après un delai. 

Le constructeur de la promise prend en paramètre une fonction. 

Cette fonction prend elle-même en paramètre deux fonctions, qu’on appelle communément « resolve » et « reject », et qu’on va appeler quand le processus arrive à bon terme (resolve) ou échoue (reject)

Donc à la base notre fonction sleep va ressembler à ceci :

```js
const sleep = (nb) => {
  return new Promise ((resolve, reject) => {
    setTimeout(() => resolve(), nb) ;
  })  
} ;
```

Le deuxième paramètre n’est pas utilisé dans notre cas et pourrait être omis, mais on l’a gardé pour être complet.

Du coup à présent si on fait :

`sleep(1000).then(() => console.log(« done »)) ;``

On a une promise qui déclenche une fonction au bout d’un certain temps. 
(Je vous accorde qu’on n’a pas beaucoup fait avancer la technologie avec ça !) 

## Les promises c’est bien mais on peut les écrire mieux !

J’ai une bonne nouvelle : Il y a une façon d’appeler les promises qui est encore plus lisible ! 

Ce système n’est qu’une question de syntaxe, mais qui fonctionne avec les Promises.  
Ce système, c’est async/await.

Comment est-ce que ça fonctionne ? 

ET bien prenons un exemple d’un enchainement basique de promesse :

```js
const wait = () => {
  sleep(1000)
     .then(() => sleep(1000))
     .then(() => console.log(« 2s later ») ;
} ;
```

En utilisant la notation async/await on peut écrire la même chose :

```js
const wait = async () => {
  await sleep(1000)
  await sleep(1000))
  console.log(" 2s later ") ;
} ;
```


Concrètement il ne s'agit que d'une différence de syntaxe, il s'agit des mêmes objets qui sont manipulés. Ici on enveloppe ces deux appels dans un try catch et dans ce cas try/catch fait la gestion des erreurs. 
Tout cela transforme la façon d'écrire les promise et donne l'impression de lire du code synchrone, même si en réalité à chaque fois ce sont des promesses qui sont appellées. La fonction wait ici renvoient elle-même une promise .

## Conclusion 

Les promesses et la syntaxe en async/await nous permettent de décrire un comportement asynchrone d'une manière aussi lisible que du code asynchrone, et d'échapper ainsi à "l'enfer des callbacks".