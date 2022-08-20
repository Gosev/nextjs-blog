
import BlogData from '../../shared/blog';
import Image from 'next/image';
import React from 'react';

export async function getStaticProps() {
  const _blogs = await BlogData.getAllData();

  const blogs = _blogs.sort((a,b) => ((a.date || '') < (b.date || '')) ? 1 : -1);
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
  
  return <div className='w-full flex flex-row flex-wrap justify-between max-w-3xl mx-auto'>

    <h1 className='w-full text-center font-bold text-6xl py-4 font-display'>Le Blog</h1>

    {blogs.map((itm) => {
      return <React.Fragment key={itm.id}>{(itm.enabled !== false) && <div className='w-1/2 p-12'>
        <Image 
            width={1920}
            height={1080}
            // blurDataURL={`/blog/${itm.img}.lqip.jpg`}
            src={`/blog/${itm.img}`} 
            className="w-full" />
        <a key={itm.id} href={'/blog/'+itm.id}>{itm.title}</a>
      </div>}</React.Fragment>
    })}
  
  </div>
}

export default BlogPages;