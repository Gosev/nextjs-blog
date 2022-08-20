---

title: La différence entre le développement frontend et le développement backend, expliquée
img: nick-fewings-8bYEFg7gDVs-unsplash.jpg
credits: Photo by <a href="https://unsplash.com/@alisestorsul?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">alise storsul</a> on <a href="https://unsplash.com/s/photos/pinky-swear?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
video: WvAnDY2dfXc
date: "2021-09-19"
subtitle: Les développeurs full-stack n'existent pas, et je suis l'un d'entre eux
enabled: true
---

Si vous voulez faire carrière dans le développement, vous vous trouverez à un moment donné à un carrefour. Deux chemins très différents s'en éloignent. Les deux chemins sont difficiles, et pourtant même les difficultés sont radicalement différentes. 

L'un des chemins, le front-end, semble plat, brillant et lumineux, à l'air libre et ensoleille. Et pourtant, il est sinueux, il tourne, et surtout il y a des foules hargneuses de chaque côté, prêtes à bondir sur ceux qui trébuchent sur la route. 

L'autre chemin, celui du back-end, semble escarpe, froid et isole, avec des précipices prêts à engloutir ceux qui y tombent. Et pourtant, le chemin lui-même est droit et solide.

Aucun des deux chemins n'est facile. Lequel choisirez-vous ? 

La réponse pourrait bien dépendre de qui vous êtes. Voyons pourquoi. 

Il faut commencer par préciser que le développement back-end et front-end ont deux objectifs très différents. 

En termes simples, l'objectif du développement back-end est de produire un système logique. Un système ou les entrées peuvent être nettoyées et les sorties sont connues ; un système ou les règles sont primordiales. Le back-end consiste à manipuler les données, à trouver la bonne façon de les formater, de les stocker, de les récupérer, de les envoyer. Et surtout d'y appliquer une logique mathématique froide. 

Le back-end consiste à faire en sorte que les ordinateurs parlent aux ordinateurs de la manière la plus efficace possible. On y traite de vérité objective. Et donc on n’y fait jamais faire confiance à l'utilisateur, à ce qu’il déclare ou ce qu’il fait.

Le développement font-end, quant à lui, consiste à traiter avec des humains. Et contrairement aux ordinateurs, les humains sont désordonnés et imprévisibles, et merveilleusement varies. 

Un ordinateur fera exactement ce que vous lui dites de faire, ni plus ni moins. 

Les humains peuvent faire plus ou moins ce que vous attendez d’eux, ou… exactement le _contraire_ de ce que vous attendez d'eux, juste… parce que. 

Ou encore ils peuvent deviner ce qu'il faut faire sans que vous leur demandiez quoi que ce soit. 

Le développement font-end consiste donc à chercher à faire plaisir à l'utilisateur, à lui offrir l'expérience la plus esthétique, la plus amusante et la plus divertissante. 

Il comporte des éléments de créativité et d'art. 

En ce sens, l'objectif _fondamental_ du développement front-end ne peut pas être facilement mesure ou défini, parce qu’il est intrinsèquement subjectif.

On pourrait presque dire qu'il y a là une opposition cerveau gauche/cerveau droit entre le développement back-end et front-end. 

Mais la différence ne s'arrête pas là. 

Elle concerne également les concepts, les compétences et les technologies qui doivent être maîtrises en cours de route. Voyons ça ensemble. 

Précisons tout de même que ces deux chemins ont un tronçon commun, un socle sur lequel bâtir l'édifice. 

Cette fondation commune inclut Git, bien sûr. 

Et même en étant développeurs back-end il est nécessaire de comprendre les bases de HTML et CSS. 

Par ailleurs le JavaScript ou le TypeScript seront utiles dans les deux cas (puisqu’avec NodeJS le Javascript est devenu un langage serveur).

Il y a également besoin dans les deux cas de comprendre le fonctionnement des API, puisqu’elles sont la "colle" (ou : l'interface, qui est le I de API) entre le front-end et le back-end. 

Maintenant qu’on a vu ce que back et front ont en commun, voyons leurs différences. 

Tout d’abord le back. Le développeur back-end s'occupe de stocker et de manipuler les données de la manière la plus propre, la plus efficace et la plus sûre possible. 

Avec un minimum de répétitions, sans fioritures. 

Les questions auxquelles il faut répondre sont donc les suivantes : 

1/ Comment les données sont-elles structurées ? (et la réponse dépend de si nous utilisons  une base de données relationnelle, qui peut être interrogée avec SQL, ou dans un magasin clé/valeur, ou encore un autre type de base de données NoSQL). 

2/ Comment l'utilisateur est-il authentifié ? 

3/ Comment, sur la base de l'utilisateur, de ses actions et des données dont nous disposons, appliquons-nous des règles de logique, et réécrivons-nous les données ?

Et pour répondre à ces questions, nous devons avoir une solide compréhension du fonctionnement des bases de données. 

Nous devons comprendre comment fonctionne un serveur sans état (ou stateless) et connaître les règles ACID des bases de données, et leur raison d'être. 

Nous devons comprendre comment mettre les données en cache et invalider le cache. Nous devons avoir une solide compréhension du fonctionnement du cryptage : comment l'utiliser et ses limites. 

Et bien sûr, maîtriser au moins un des langages côte serveur (PHP, NodeJS, Python, Java...). 

Pour résumer : en back-end on uniformise, on sécurise, on s’assure que tout rentre bien dans les cases.

En front-end à l’inverse, la principale préoccupation est de gérer le fait que les gens accèdent au Web avec une très grande variété d'appareils.

Des téléphones androïdes lents de 360 pixels de large en mode portrait jusqu’aux ordinateurs de bureau fulgurants avec 5K pixels de large (en mode paysage). 

Et en plus ces appareils ont des connexions réseau très différentes. Certains ont la fibre, mais d’autres ont une connexion EDGE. 

Les questions auxquelles il faut répondre sont donc les suivantes : 
1/ Comment pouvons-nous dégrader gracieusement l’expérience ? Comment pouvons-nous offrir une expérience agréable et fonctionnelle sur des appareils radicalement différents ?

1/ Comment faire pour que les images soient nettes sur un écran 5K et s'affichent immédiatement sur une connexion lente ? 

3/ Comment pouvons-nous donner l'impression que quelque chose se passe, que l'entrée de l'utilisateur a bien été prise en compte, même si nous attendons toujours la réponse du serveur ?

Et pour répondre à ces questions, nous devons comprendre le fonctionnement des navigateurs, comprendre comment optimiser les données envoyées, et comment faire en sorte que la page soit la plus rapide possible. 

Nous devons comprendre ce qu’est la conception responsive mobile-first, le chargement décalé, ou lazy-loading, ainsi que les formats d'image. 

Et il nous faut aussi comprendre les subtilités de CSS, ainsi que ses différents modes (block, flexbox, grid,..), le HTML sémantique, le SEO technique, et bien sûr JavaScript.  

J’en entends au fond qui disent « moi je veux être développeur fullstack » c’est-à-dire à la fois font-end et back-end. 

Et c’est un noble idéal (et puis ca paie mieux aussi :D ) Qu’en est-t-il donc du fullstack ?

Et bien il faut préciser que vous ne pouvez jamais commencer par le développement fullstack. Vous ne pouvez pas maitriser simultanément le back-end et le front-end. 
Si vous voulez maitriser deux sujets, il faut commencer par en maitriser un. 
 
Ceci étant dit, c’est vrai que pour maîtriser un des deux (front ou back) vous aurez de toute façon besoin de comprendre une partie de ce qui se passe de l'autre côté du grand fossé entre navigateurs et serveurs. 

Qui plus est, les lignes entre le front-end et le back-end deviennent progressivement de plus en plus floues. 

D'abord par le fait des frameworks côte client tels que React ou Vue ou Angular qui déplacent autant que possible la logique métier vers le côté client. 

Et deuxièmement par le fait des frameworks full-stack tels que NextJS ou NuxtJS ou vous finissez par écrire du code qui sera exécuté à la fois côte serveur et côte client. 

Mais les différences *fondamentales* entre les mentalités et les compétences requises pour le développement côte front-end ou back-end signifient que la grande majorité d’entre nous auront une zone de confort. 

Un côté de la division serveur/navigateur sur lequel on préfère travailler. 

Et cela pourrait être simplement dû à la composition de notre personnalité.

