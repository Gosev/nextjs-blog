
import path from 'path';
import { makeGetters } from './content';

const directory = path.join(process.cwd(), 'content/blog');

export default makeGetters<BlogPost>(directory);