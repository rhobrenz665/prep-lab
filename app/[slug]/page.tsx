import React from 'react';

interface Props {
  message: string;
}

const Page: React.FC<Props> = ({ message }) => {
  return <div>ahhahaha {message}</div>;
};

export default Page;