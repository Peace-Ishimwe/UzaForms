"use client"
import React, { useEffect, useState } from 'react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const NpProgress: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <ProgressBar
      height="4px"
      color="#167EE6"
      options={{ showSpinner: true }}
      shallowRouting
    />
  );
};

export default NpProgress;