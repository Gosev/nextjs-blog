interface item {
  id: string|number;
  content: string;
  enabled?: boolean;
  tags?: Array<string>;
};

interface BlogPost extends item {
  title: string;
  img?: string;
}

interface StaticRouteProps {
  params: {
    id: string;
  };
}