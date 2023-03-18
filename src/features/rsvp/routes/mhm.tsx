import { Head } from "components/Head";
import { Footer } from "components/Layout";

export const RSVPForm = () => {
  return (
    <>
      <Head description="Welcome to OneNUS" />
      <div className="h-[100vh] flex items-center text-secondary">
        <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            <span className="block">Invitation</span>
          </h2>
          <h3 className="text-xl font-extrabold tracking-tight sm:text-xl my-3">
            <span>Welcome im sad 😔😔</span>
          </h3>
          <p>This invitation is over. You have accepted it!!!</p>
          <p>I had nice time ok byeee :DD</p>
          <p>BLUBLUBLU</p>
        </div>
      </div>
      <Footer />
    </>
  );
};
