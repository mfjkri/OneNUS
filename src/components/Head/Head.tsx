import { Helmet } from "react-helmet-async";

type HeadProps = {
  title?: string;
  description?: string;
};

/*
Updates HTML document head (<head></head>) title and description for sub pages.

Attributes:
  - title: string | undefined
    Sets the title tag in the head of the page. Defaults to empty string "".
  
  - description: string | undefined
    Sets the description tag in the head of the page. Defaults to empty string "".
*/
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
