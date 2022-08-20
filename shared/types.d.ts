interface item {
  id: string|number;
  content: string;
  enabled?: boolean;
};

interface BlogPost extends item {
  title: string;
  img?: string;
  credits?: string;
  video?: string;
  date?: string;
  tags?: Array<string>;

}

interface StaticRouteProps {
  params: {
    id: string;
  };
}

type NextPageWithLayout<T> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}