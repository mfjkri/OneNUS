import * as React from "react";

import { Head } from "../Head";

export type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
};

/*
Standardized parent layout for all components in protected routes with content.

Attributes:
  - children: ReactNode
    Children nodes contained in the MainLayout.

  - title: string
    Sets the title text in the layout.
    Also sets the title tag in the head of the HTML document.
*/
export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
  return (
    <>
      <Head title={title} />
      <div className="py-6 text-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold">
            <u>{title}</u>
          </h1>
        </div>
        <div className="mx-auto px-4 sm:px-6 md:px-8 py-7">{children}</div>
      </div>
    </>
  );
};
