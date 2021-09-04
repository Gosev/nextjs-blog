---
title: "6 erreurs de débutant en React (et comment les éviter)"
img: kat-love-zncUDOR-Ie8-unsplash.jpg
date: "2021-09-01"
credits: Photo by <a href="https://unsplash.com/@katlove?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Kat Love</a> on <a href="https://unsplash.com/s/photos/despair?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
---
 En tant que manager avec quelques années d'expérience en développement, j'ai souvent des développeurs juniors ou des stagiaires qui viennent me voir pour essayer de comprendre pourquoi leur code ne se comporte pas comme ils s'y attendent. Lorsqu'ils codent en React, cela provient le plus souvent d'un manque de compréhension du comportement de useState. Voici donc cinq erreurs que j'ai vues au cours de l'apprentissage de React et particulièrement de useState.
 
## Pas assez d'état
C'est la première erreur commise par un développeur (très) junior qui n'avait pas encore compris à quel moment la  fonction de rendu d'un composant React est appelée. Il avait modifié une variable dans un callback `onClick` et s'est ensuite demandé pourquoi cette modification n'était pas prise en compte à l'écran. En règle générale, tout ce qui est externe à l'application doit être stocké quelque part dans l'état (ou dans un mécanisme équivalent), que ce soit le fait qu'un utilisateur ait cliqué ou le retour d'un appel d'API. "Tu devrais stocker cela dans l'état", je lui ai-je dit, "sinon, l'information se perdra entre les trames de rendu". 

## L'état contient trop d'informations
L'erreur suivante (par le même gars) était l'étape d'après, la suite de la précédente, et représentait un mouvement de balancier dans l'autre sens. Il était tellement déterminé à s'assurer que tout était stocké en toute sécurité qu'il a également inclus des valeurs calculées qui étaient simplement le résultat d'autres variables d'état. Bien sûr, s'il s'agissait simplement d'une question de code mal fagotté, il ne serait peut-être pas venu chercher de l'aide. Mais l'affichage ne se mettait à jour qu'une fois sur deux lorsqu'il cliquait. En regardant le code, j'ai vu qu'il faisait quelque chose comme ceci : 
```js
si (condition) setScore(score + 1) ;
si (score > 0) setButtonActive(true) ;
```
Dans le code ci-dessus, le score n'a pas changé entre les deux lignes (parce que nous sommes dans la même trame de rendu - ou "frame"). Et la deuxième ligne stocke quelque chose qui peut être déduit de l'autre variable d'état. Et c'est pour ça que l'affichage ne se mettait pas mis à jour. "Je lui ai dit : "Tu n'as pas besoin de tout stocker, la logique que tu peux déduire des autres variables d'état n'a pas besoin d'être stockée".


## L'état est mis à jour trop souvent
A un autre endroit du code, le même gars avait écrit quelque chose qui ressemblait à ceci: 

```js
si (condition) setScore(score + 1) ;
// ..... quelques lignes plus loin 
si (condition2) setScore(score + 1) ;
```
Ici de la même façon, le score n'a pas été changé entre les deux lignes, et ne s'incrémente au final qu'une seule fois, au mieux. 

Pour corriger ceci, on peut passer une fonction à la fonction d'état  
```js
si (condition) setScore((prev) => prev + 1) ;
// ..... quelques lignes plus loin 
si (condition2) setScore((prev) => prev + 1) ;
```

Ainsi la mise à jour de l'état s'applique sur la valeur en cours de l'état, et non sur la valeur initialement définie en début de l'appel de la fonction de rendu.
 
Il n'en était pas encore là dans son apprentissage, mais un jour il apprendra que si l'état est un peu complexe, avec des variables interdépendantes qui doivent être mises à jour de manière coordonnée ou non triviale, il pourrait être préférable de faire appel à useReducer. Mais il n'en est pas là. Pas encore.

 
## Redéfinir trop de choses dans le rendu
Quelques jours plus tard, il était de retour. Il avait un formulaire où il était convaincu de tout faire correctement, et pourtant l'état était réinitialisé chaque fois qu'il entrait des données dans le formulaire HTML. Maintenant, à ce stade, je tiens à préciser qu'il s'agit d'une personne à la fois très brillante et très sympathique. Cependant, il venait de commencer à apprendre React, donc il faisait à peu près toutes les erreurs à faire, et je commençais à douter de la sagesse de lui faire développer en utilisant React. Mais c'était un stage, et il était venu pour apprendre. Et l'expérience n'est souvent que la somme des erreurs passées, donc selon cette norme... tout se passait très bien. 
Il avait pris à cœur mes conseils sur le fait de recalculer des choses qui n'avaient pas besoin d'être stockées. Mais il avait été un peu trop enthousiaste à propos de tout cela. La conversation s'est déroulée comme suit :

 - Attendez, où se termine ce composant ? 
 - Juste en haut du fichier, ici. 
 - Et où est-ce qu'il se termine ? Je ne peux pas trouver la fin.  
 - C'est ici, en bas du fichier. 
 - Et c'est quoi tout ça au milieu ? 
 - Ce sont les fonctions et les constantes que j'ai définies, et le composant pour le formulaire HTML. Parce que j'ai besoin que l'état de ce composant soit partagé avec le composant principal.
 
J'espère qu'il n'a pas vu le regard de désespoir qui a du paraître sur mon visage. 
"Toutes les constantes et toutes les fonctions qui fournissent simplement une logique sans manipuler l'état peuvent être déplacées hors du composant, dans un fichier séparé. Vous pouvez juste importer vos points d'entrée et les utiliser." Je lui ai dit. "Et le composant Form redéfini dans le composant principal... eh bien vous le redéfinissez complètement à chaque trame de rendu, donc vous montrez en fait un nouveau composant à chaque mise à jour."

Nous avons finalement refactoré entièrement ce bout de code.

## S'appuyer uniquement sur les props initiaux pour définir l'état

Je dois avouer que je me suis personnellement rendu coupable de cette erreur. J'avais créé un composant qui affichait essentiellement une barre de progression circulaire basée sur les props que je lui transmettais. Il stockait donc son état comme ceci : 

```js
const [progress, setProgress] = useState(props.init) ;
```
Bien sûr, le problème ici est que tout changement dans les props n'affectera pas l'état, une fois que la première initialisation est faite. 
Ici, il y a deux solutions possibles, qui dépendent de ce qui est fait exactement dans le composant. Si le composant n'a pas de logique interne qui met à jour l'état, vous n'avez pas besoin de stocker l'état. Mais dans mon cas spécifique, j'avais besoin de l'état, donc j'ai utilisé useEffect :
```js
const [progress, setProgress] = useState(props.init) ;
useEffect(()=> { 
  setProgress(props.init) ;
}, [props.init]) ; 
```

## Mise à jour de l'état avec un objet muté
Il s'agit d'une erreur classique qui découle d'un manque de compréhension du fonctionnement des objets en JavaScript, et plus précisément du fait que la mutation des objets ne déclenche pas la détection des changements de React. En effet, l'affectation d'un objet se fait par référence, c'est-à-dire que lorsque vous affectez un objet à une variable, vous ne faites que stocker le pointeur de l'objet dans votre variable, de sorte que deux variables peuvent pointer vers le même objet.
```js
let a = {nom : "Bob"} ;
let b = a ;
b.name = "Alice" ;
// ici a==b et a.name == "Alice" ;
```
En termes de React, cela signifie que faire quelque chose comme ceci ne mettra pas à jour l'affichage, car la valeur de la variable state ne change pas, elle pointe toujours vers le même objet :
```
const [state, setState]=useState({score:0}) ;
const onClick =() => {
  state.score += 1 ;
  setState(state) ;
}
```
La solution, bien sûr, est de créer une copie de l'état, par exemple avec l'opérateur d'étalement ou en déclarant un nouvel objet (ou, pour être parfaitement honnête, en utilisant simplement un scalaire dans l'exemple ci-dessus) : 
```js
const [state, setState]=useState({score:0}) ;
const onClick =() => {
   setState({..state, score : state.score+1}) ;
}
```
## Pas juger

Même si le chemin était tortueux, mon collègue s'est plu à apprendre à manipuler React. Et je suis certain que j'ai du faire au moins autant d'erreurs dans mon processus d'apprentissage. Je suis souvent horrifié quand je vois du vieux code à moi. 

Et pour être parfaitement honnête, j'ai moi-même beaucoup profité des interactions. Le fait d'expliquer comment les choses marchent est une bonne façon de continuer à apprendre, et une expérience gratifiante.

Bref, j'aime bien expliquer le code !