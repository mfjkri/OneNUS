import * as React from "react";

import { Head } from "../Head";

export type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
};

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
