import Head from 'next/head';
import { CSSProperties, useEffect, useState } from 'react';
import YouTubeEmbed from '../../components/YouTubeEmbed';
const ReactMarkdown = require('react-markdown');

import BlogData from '../../shared/blog';

export async function getStaticProps({params}:StaticRouteProps) {
  const data = await BlogData.getItemData(params.id);
  return {
    props: {
      data,
    }
  };
}


export async function getStaticPaths() {
  const paths = BlogData.getAllIds();
  return {
    paths,
    fallback: false
  };
}


interface BlogPageProps {
  data: BlogPost;
}


const parent:CSSProperties = {
  position: 'relative',
  paddingBottom:'56.25%',
  height:0,
  marginBottom: '2rem',
  overflow: 'hidden'
}

const main:CSSProperties = {
  position: 'absolute',
  width: '100%',
  top: 0,
  left: 0,
  zIndex: 0,
  marginTop:0,
  marginBottom:0
};

const lqip:CSSProperties = {
  position: 'absolute',
  width: '100%',
  filter: 'blur(10px)',
  zIndex: 10,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) scale(1.2)',
  transitionDuration: '500ms',
  transitionProperty: 'opacity',
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 1, 1)',
  marginTop:0,
  marginBottom:0


};

const BlogPage: React.FC<BlogPageProps> = ({data}) => {

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imgurl, setImgUrl] = useState<string>(undefined);

  let img = data.img;

  useEffect(() => {
    setImgUrl(`/blog/${img}`)
  }, [img]);

  return <>
    <Head> <title> {data.title} </title></Head>
    <main>
      <article className="prose lg:prose-xl mx-auto mt-12 font-display">
       <h1>{data.title}</h1>

       {data.video ? <YouTubeEmbed embedId={data.video} /> :
       <>{data.img && <div style={parent}>
          <img
            src={`/blog/${img}.lqip.jpg`}
            style={{...lqip, opacity: imageLoaded? 0: 100 }}
          />

          <img
            style={main}
            src={imgurl}
            onLoad={() => setImageLoaded(true)}
          />

          
                </div>}</>}
                {data.credits ? <div className="text-dark opacity-25 w-100 font-light text-center" dangerouslySetInnerHTML={{__html: data.credits}} />
          : <div> No credits</div>}
        <div className="relative block pt-8 font-body">
        <ReactMarkdown>{data.content}</ReactMarkdown>
        </div>
      </article>
    </main>
  </>;
};

export default BlogPage;