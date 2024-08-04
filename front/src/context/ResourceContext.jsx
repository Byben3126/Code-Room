import React, { createContext, useState, useContext } from 'react';

const ResourceContext = createContext();

export const ResourceProvider = ({ children }) => {
  const [getResource, setResource] = useState(null);

  const selectResource = (data) => {
    setResource(data);
  };

  const emptyResource = () => {
    setResource(null);
  };

  return (
    <ResourceContext.Provider value={{ getResource, selectResource, emptyResource }}>
      {children}
    </ResourceContext.Provider>
  );
};

export const useResource = () => {
  return useContext(ResourceContext);
};
