interface item {
  id: string|number;
  content: string;



  enabled?: boolean;
  tags?: Array<string>;
};

interface BlogPost extends item {
  title: string;
  img?: string;
  credits?: string;
  video?: string;
  date?: string;
}

interface StaticRouteProps {
  params: {
    id: string;
  };
}