---
title: "C'est quoi Svelte ?"
img: svelte_dissapear.jpg
date: "2021-06-15"
---

Je me suis [lancé un défi](https://dev.to/gosev/defi-framework-ssr-next-vs-vs-nuxt-vs-sveltekit-454d) de créer un blog avec trois frameworks : Svelte/Sveltekit, Vue/Nuxt et React/Next, pour me donner un cas pratique et donc un angle d'attaque pour apprendre les frameworks. 
J'ai commencé par Svelte. Pourquoi celui-là ? Du peu que j'en ai lu, Vue a été crée par Evan You qui avait travaillé sur Angular JS. Même si Angular 2+ n'a rien à voir avec Angular JS, j'ai tout de meme l'impression à première vue que Svelte utilise des concepts complètement différents de ce que je connais déjà (à savoir React et Angular, côté framework côté client), et du coup ça m'intéresse de les apprendre, de les comprendre, et avec un peu de chance de vous aider à les comprendre aussi. 

Ma technique pour apprendre c'est de faire, donc souvent je lance, j'installe, j'essaie de regarder les exemples, de bidouiller et de comprendre, et si vraiment je galère, le lis les docs. Du coup j'ai installé Svelte (et Sveltekit), avec des exemples de base, j'ai bidouillé et...ce fut un echec cuisant. Je comprenais pas comment marchait l'état, comment il se mettait à jour. Du coup, je me suis plongé dans la documentation et le tutorial, et j'ai essayé de comprendre ce qu'est Svelte. 
*(pour ceux qui préfèrent, voici la version vidéo de cet article)*
{% youtube 5W5i5KhIeaQ %}

# C'est quoi Svelte ?

D'après la documentation, Svelte n'utilise mais de DOM virtuel, mais est un "framework UI qui compile les composants pour en faire du Javascript basique". Contrairement à React ou Vue qui embarquent le framework dans la page. Qu'est-ce que ça veut dire ?

J'ai mis du temps à comprendre ce que ça voulait dire, et à comprendre quels principes soustendent le framework. Il n'y a pas dans Svelte de setState explicite, pas d'endroit où on signale que "ceci est un état", seulement un :
```js
<script>
  let counter = 1;
</script>
```
Et je me disais que quelque part dans ma page ça allait donc donner lieu à un "let counter = 1" quelque part dans la page en sortie. Mais là réalité est bien plus étrange et plus intéressante.  

A un moment en lisant les documents et les vidéos, j'ai eu un "Aha moment", un moment d'illumination. Pourtant tout était effectivement dit dans la phrase "Svelte compile les composants". En réalité, Svelte n'est **PAS un framework**. En tout cas pas en premier lieu, et pas au sens où on l'entend avec React ou Vue. 

Avant tout, Svelte est un **compilateur**. 

Et ce compilateur *triche*. Alors certes de manière très intelligente. Mais il donne l'impression qu'on code du javascript, et ce n’est pas tout à fait vrai. 

Svelte triche en **surchargeant l'opérateur =**, en lui rajoutant un effet de bord. C'est à dire qu'il en fait une fonction, qui met à jour tous les endroits où la variable est utilisée. Puisque de la même façon, Svelte repère en avance dans le HTML, au moment du build, là ou il y a des dépendances envers cette variable. 

Et c'est là que devient intéressant le fait qu'il n'y ait pas de DOM virtuel. React garde en mémoire l’arbre des composant et toutes les variables d’état et les paramètres, et leurs valeurs. A l'étape t, tel composant avait telle classes, et tel style, et telles valeurs, et à l'étape t + 1, il a toujours tel classes, et telles valeurs, mais le style a changé, donc on recalcule les composants qui en dépendent. Chaque itération il faut comparer un à un tous les éléments de l'arbre des composants. ET ça c'est couteux. 

Svelte, à l'inverse, cable directement la variable sur le HTML, avec une fonction, en surchargeant l'opérateur d'affectation =.   

Et Svelte va plus loin, en surchargeant aussi la notion de label, qui est du [Javascript valable mais un peu exotique](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label), pour créer la notion de **dépendance entre variables**. Le nom du label fait référence à la notion d'Observable : $.  Voyons un exemple : 

```html
<script>
  let firstName = 'world';
  let greeting
  $: greeting = 'Hello ' + firstName; 
  firstName = 'Bob';
</script>

<h1> {greeting}!</h1>
```
Ici, le code sort **Hello Bob!**, alors que la ligne avec le $ a lieu avant l'affectation de "Bob" à la variable firstName. Comme si le lien entre greeting et firstName n'était pas juste une relation éphémère mais un lien durable. Un mariage au lieu d'un plan Q, en somme.   

Si on loggue ce qui se passe, on y voit plus clair. Avec un log placé à cet endroit : 

```html
<script>
  let firstName = 'world';
  let greeting
  $: greeting = 'Hello ' + firstName; 
  firstName = 'Bob';
  console.log(greeting);
</script>

<h1> {greeting}!</h1>
```
On a juste un "undefined" dans la console - le code dans le $ n'a pas encore été appelé, apparemment. Mais ce qui est intéressant avec cette notation c'est qu'il est possible d'y mettre un bloc de code 
```html
<script>
  let firstName = 'world';
  let greeting
  $: {
   greeting = 'Hello ' + firstName; 
   console.log(greeting);
  }
  firstName = 'Bob';
  console.log(greeting);
</script>

<h1> {greeting}!</h1>
```

Et dans ce cas on dans la console "undefined", puis "Hello Bob". Ca parait logique. 

Mais ce qui est intéressant c'est qu'on peut mettre *plusieurs* $. Et si on s'amuse à les mettre dans le désordre, avec le console.log *avant* l'affectation à la nouvelle valeur, que se passe-t-il ?

```js
<script>
  let firstName = 'world';
  let greeting
  $: console.log(1, greeting);
  $: {
   greeting = 'Hello ' + firstName; 
   console.log(2, greeting);
  } 
  firstName = 'Bob';
  console.log(3, greeting);
</script>

<h1> {greeting}!</h1>
```
Ici, on pourrait s'attendre (merci React avec l'ordre des hooks) à ce que les $ soient exécutés dans l'ordre où ils sont déclarés. 

Et bien non, pas du tout. Dans la console on voit les logs 3 (avec "undefined"), puis 2 puis 1. Et en réalité Svelte a détecté une sorte de graphe de dépendances. Le block où il y a le log 2 a une dépendance sur firstName, et met à jour la variable greeting. Le blog 3 a une dépendance sur la variable greeting, et est donc exécuté après, une fois que greeting est changé. 

Bon et évidemment comme j'ai l'esprit tordu j'ai tout de suite essayé de faire une dépendance cyclique: 

```js
let firstName = 'world';
let greeting
$: firstName = greeting + 'hum';
$ :greeting = 'Hello ' + firstName; 
firstName = 'Bob';
```
Mais le compilateur l'a détecté et a sorti une erreur, donc tout va bien :D

Pour info, si vous voulez écouter un gars qui explique ça bien mieux que moi, mais en Anglais, voici le créateur de Svelte qui explique les concepts sous jascents que je viens d'exposer : 

{% youtube AdNJ3fydeao %}

Voyons à présent plus en détail le fonctionnement de Svelte, voici quelque points saillants que j'ai notés. Je ne peux évidemment pas expliquer *in extenso* comment coder en Svelte, mais juste sousligner quelques éléments marquants. 

# Comment coder avec Svelte, premier pas

## Les composants 
Les composants sont dans des fichiers .svelte, et ressemblent à une page HTML, avec des balises `<script>`, des balises `<style>` et du code de template HTML :

```html
<script>
  let count = 0;
  function handleClick() {
    count += 1;
  }
</script>

<style>
 button {
  color: red;
 }
</style>

<button on:click={handleClick}>
  Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
```

(Comme vu plus haut, le script qui apparait dans le fichier compilé n'est pas exactement ce qui a dans les balises script). 

On peut inclurer ses composant dans d'autres composants, en utilisant une notation comme celle du JSX: 

```html
<script>
 import OtherComponent from './Component.svelte';
</script>

<OtherComponent />
```
Le style d'un composant n'impacte pas le style des composants qu'il inclut. 

## Props, Etat & Changement d'Etat

L'état est défini dans des blocks, en utilisant comme  :

```html
<script>
 let counter = 0; // ceci déclare un état !
</script>
```

C'est pareil pour les props, c'est à dire les paramètres d'entrée des composants :

```html
<script>
 export let counter = 0; // ceci déclare un props !
</script>
```

Attention: Svelte a besoin **d'immutabilité** pour gérer les changements d'état (ce qui est logique), ou plus exactement, j'ai l'impression qu'il a besoin qu'il y ait l'utilisation de l'opérateur = sur une variable qui a été déclarée avec un let, et que le compilateur sait qu'il doit surveiller. Si on change la valeur d'une des clefs dans un dictionnaire ou un array, le changement n'est pas détecté.    

## Le templating html 

Svelte a une logique de templating dans le html. Il y a comme dans le JSX l'injection de valeurs, (`<p>Value is {x}</p>`), Mais aussi des blocks, qui commencent avec des  `{#}`, finiseent avec des `{/}` et comportent eventuellement des éléments intermédiaires en `{:}` Ces blocks permettent d'écrire des conditions des boucles (`{#each}`)  et des conditions `{#if ...}`), Par exemple :

```html
{#if x > 10}
	<p>{x} is greater than 10</p>
{:else if 5 > x}
	<p>{x} is less than 5</p>
{:else}
	<p>{x} is between 5 and 10</p>
{/if}
```

Dans les boucles, on a le meme probleme de clef unique que la boucle d'objets de react : il faut spécifier l'id de la clef unique: ```{#each items as item (item.id)}```

Il y a un troisième type de block, qui consiste à déclarer qu'on attent le retour d'une fonction asynchrone (une Promise, quoi) avec le bloc `{#await}`.

## Evenements & Bindings

Autre particularité, pour gérer les clicks & co, on définit des event listeners sur les elements html avec des on: on:click, on:mousemove. On peut modifier ces events listeners avec par ex. |once ou |self (ne trigger qu'une seule fois, ne trigger que sur soi). On peut définir des event listeners pour connecter deux éléments, avec un émetteur et un récepteur. Ca me rappelle la joie de coder en ActionScript / Flash, au bon vieux temps des jeux sur Facebook !

On utilise le même genre de notation pour dire qu'un élément HTML (comme un input par exemple) va impacter une variable, ce qui nous permet de faire une liaison à double sens entre l'affichage et l'état : 
```html
<input bind:value={name}>
```
(Je crois que Vue a une notation un peu similaire)

# En conclusion 

Pour être complet il y aurait évidemment tout un tas d'autre choses à mentionner comme les *stores* (au sens anglais, pas français !) ou les transitions ou le *context* (qui pour le coup ressemble un peu à celui de React). 

Pour moi il y a deux questions qui se posent. Est-ce que j'ai envie de continuer à apprendre ce framework ? Et est-ce que j'ai envie de m'en servir sur le plus long terme. 

Et pour moi, c'est l'originalité de Svelte, avec l'impact de la phase de compilation, qui me donne envie de l'apprendre, de comprendre comment il marche. 

Je ne sais par contre pas comment mes équipes, si je leur mettais du Svelte entre les mains, réagiraient. 