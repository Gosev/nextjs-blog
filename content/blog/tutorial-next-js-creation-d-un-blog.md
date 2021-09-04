---
title: "Tuto Next.JS + Tailwind : créer un blog"
img: blog.jpg
date: "2021-03-01"
---


Je commence par installer Next.JS. 
```cli
npx create-next-app nextjs-blog
```

Je crée un fichier tsconfig.json pour indiquer qu'on veut etre sous Typescript (et j'installe directement Typescript)

```cli
touch tsconfig.json
yarn add --dev typescript @types/react
```

Ensuite c'est parti pour installer et initialiser Tailwind :
```cli
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
npx tailwindcss init -p
```

Puis j'édite le fichier globals.css pour inclure les fichiers de style de Tailwind.

```css
/* ./styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```


J'aime bien changer les fichier index.js et app.js en .tsx (mais ça ne change pas grand chose)

Maintenant que la base est posée, posons les bases de notre blog.

La première étape consiste à définir le type de l'article de blog, au sens Typescript. 
Pour cela je crée un dossier shared/, à la racine, dans lequel je met un fichier types.d.ts qui va servir à contenir les différents types. Je vais supposer qu'on veut charger d'autres types de données que juste des articles de blog (mais je ne sais pas encore quoi à ce stade, donc j'en fais peut etre un peu trop). Néanmoins je crée un type de base pour mon contenu, que je spécialise pour l'article de blog.


```ts
interface item {
  id: string|number;
  content: string;
};

interface BlogPost extends item {
  title: string;
}
```

A présent je crée la page d'accueil du blog, en créant un fichier index.tsx, dans un dossier blog/ que je crée dans /pages. Ce fichier va servir à lister tous les articles de blog (quand il y en aura !)


```tsx
// pages/blog/index.tsx

interface BlogPagesProps {
  blogs: Array<BlogPost>
}

const BlogPages:React.FC<BlogPagesProps> = ({blog}) => {
  return <>Blog Posts</>
}
export default BlogPages;
```

A présent, allons chercher le contenu que nous allons lister. Pour ça, je commence par créer un dossier content, dans le quel je mets pour le moment un dossier blog/ (une fois de plus, ça suppose que j'ai d'autre contenu)

Comment est-ce que ça fonctionne ? Dans une page on peut définir une fonction getStaticProps. Cette fonction sert pour le rendu côté serveur. Elle sert à récupérer toutes les données statiques qui utiles pour rendre la page. Typiquement si on voulait faire un appel à une base de données pour lister le contenu pertinent, c'est ici qu'on le ferait. Dans notre cas, nous allons lister tous les fichiers markdown (en .md) qui sont dans le dossier content/blog, et c'est ça qui nous servira de contenu. 

Le nom de fichier servira d'identifiant (de champ id), mais on veut pouvoir aussi définir un titre, qui servira dans la liste sur l'accueil du blog.  

Un petit détail qui est sympa avec Markdown : on peut définir des (méta)données en entête, et les lire. Ca s'appelle le *front matter*. C'est typiquement avec ça qu'on va pouvoir dire qui est l'auteur, ou quelle est l'image qu'on veut mettre en avant. 

Une lib existe pour les lire : gray-matter

Ajouter gray-matter : yarn add gray-matter

Créer les fonction de récupération des données :


On va créer une fonction de récupération générique, qui lit un dossier et qui retourne bah.. un type de contenu.

On va commencer par lister et lire tous les fichiers md qui sont dans un dossier donné:

```ts
async function _getAllData<T extends item>(directory: string): Promise<Array<T>> {
  // Get file names under folder
  const fileNames = fs.readdirSync(directory);
  return await Promise.all (fileNames.map(async fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(directory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    let content = matterResult.content;

    return {
      id,
      ...matterResult.data,
      content,
    } as unknown as T;
  }));

}
```

Alors je crée une fonction "factory", qui me fabrique la fonction en fonction du répertoire injecté :

```tsx
export function makeGetters<T extends item> (directory: string) {

  return {
    getAllData: async () => _getAllData<T>(directory),
  };
}
```
En suite on crée la version spécifique pour le blog :

On crée un fichier /shares/blog.ts tout simple 

```ts
import path from 'path';
import { makeGetters } from './content';

const directory = path.join(process.cwd(), 'content/blog');

export default makeGetters<BlogPost>(directory);
```

Maintenant on référence cette page dans l'index du blog

```tsx
import BlogData from '../../shared/blog';

export async function getStaticProps() {
  const blogs = await BlogData.getAllData();

  return {
    props: {
      blogs,
    }
  };
}

interface BlogPagesProps {
  blogs: Array<BlogPost>
}

const BlogPages:React.FC<BlogPagesProps> = ({blogs}) => {
  return <><h1>Blog Posts</h1>
    {blogs.map((itm) => {
      return <><a key={itm.id}>{itm.title}</a><br/></>
    })}
  
  </>
}


```

Et on teste : wundershön 


Et du coup maintenant on va aller créer la page qui va servir à faire les articles de blog eux mêmes 

Pour ça on crée un fichier [id].tsx dans le dossier pages/blog

En suite on fait la fonction qui récupère les données statiques en fonction de l'id

Autrement dit cette fois ci au lieu de récupérer tous les fichiers on récupère le seul fichier dont l'id est dans le slug, le chemin.


```ts
async function _getItemData<T extends item> (directory: string, id: string, extended?: boolean): Promise<T> {

  const fullPath = path.join(directory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  let content = matterResult.content;

  return {
    id,
    ...matterResult.data,
    content,
  } as unknown as T;
}

/* *** */

export function makeGetters<T extends item> (directory: string) {

  return {
    getItemData: async (id: string) => _getItemData<T>(directory, id),
    getAllData: async () => _getAllData<T>(directory),
  };

}
```

Ensuite on définit dans types un paramètre

```ts
interface StaticRouteProps {
  params: {
    id: string;
  };
}
```

Et on crée le get static props de la page :

```tsx

interface PageProps {
  data: BlogPost;
}

export async function getStaticProps({params}:StaticRouteProps) {
  const data = await BlogData.getItemData(params.id);
  return {
    props: {
      data,
    }
  };
}

```

Ici il y a une petite particularité. Dans la mesure ou c'est un chemin dynamique, on a besoin de savoir quels sont tous les contenus qu'il faut générer. Pour ça on a une fontion "getStaticPaths" qui en gros liste tous les contenus

On retourne du coup dans content :

```ts
const _getAllIds = (directory: string) => {
  const fileNames = fs.readdirSync(directory);

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    };
  });
};

/***/

export function makeGetters<T extends item> (directory: string) {

  return {
    getAllIds: () => _getAllIds(directory),
    getItemData: async (id: string) => _getItemData<T>(directory, id),
    getAllData: async () => _getAllData<T>(directory),
  };

}
```

A présent dans le blog on définit la fonction getStaticPaths 

```ts
export async function getStaticPaths() {
  const paths = BlogData.getAllIds();
  return {
    paths,
    fallback: false
  };
}
```

A présent tout est prêt pour faire la page :

On commence par importer Head, tout en haut : 
```ts
import Head from 'next/head';
```

Puis on crée la fin de la page :

```tsx
interface BlogPageProps {
  data: BlogPost;
}

const BlogPage: React.FC<BlogPageProps> = ({data}) => {

  return <>
    <Head> <title> {data.title} </title></Head>
    <main>
      <h1>{data.title}</h1>
      <div>
        {data.content}
      </div>
    </main>
  </>;
};

export default BlogPage;
```

Maintenant... il ne reste plus qu'à y accéder !

Mettons à jour la page index du blog :

```tsx
const BlogPages:React.FC<BlogPagesProps> = ({blogs}) => {
  return <><h1>Blog Posts</h1>
    {blogs.map((itm) => {
      return <><a key={itm.id} href={'/blog/'+itm.id}>{itm.title}</a><br/></>
    })}
  
  </>
}
```


On teste et ... c'est très moche.

On va essayer d'améliorer ça un peu avec tailwind 

1/ On rajoute le typography :
yarn add @tailwindcss/typography
