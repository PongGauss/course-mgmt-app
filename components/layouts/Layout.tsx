import { Header } from './Header';
import { Footer } from './Footer';
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
