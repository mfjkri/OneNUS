import { Helmet } from "react-helmet-async";

type HeadProps = {
  title?: string;
  description?: string;
};

export const Head = ({ title = "", description = "" }: HeadProps = {}) => {
  return (
    <Helmet
      title={title ? `${title} | OneNUS` : undefined}
      defaultTitle="OneNUS"
    >
      <meta name="description" content={description} />
    </Helmet>
  );
};
