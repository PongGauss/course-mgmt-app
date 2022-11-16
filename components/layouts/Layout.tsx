import { Header } from '@components/layouts/Header';
import { Footer } from '@components/layouts/Footer';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
