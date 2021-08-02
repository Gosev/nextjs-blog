import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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

/*
export async function _getStaticPaths(directory: string) {
  return {
    paths: _getAllIds(directory),
    fallback: false // See the "fallback" section below
  };
}
*/

export function makeGetters<T extends item> (directory: string) {

  return {
//    getStaticPaths:  () => _getStaticPaths(directory),
    getAllIds: () => _getAllIds(directory),
    getItemData: async (id: string) => _getItemData<T>(directory, id),
    getAllData: async () => _getAllData<T>(directory),
  };

}
