import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext<{
  value: string;
  onValueChange: (val: string) => void;
} | null>(null);

export const Tabs = ({ defaultValue, onValueChange, children, className }: any) => {
  const [value, setValue] = useState(defaultValue);
  const handleValueChange = (val: string) => {
    setValue(val);
    onValueChange?.(val);
  };
  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ children, className }: any) => (
  <div className={`flex ${className}`}>{children}</div>
);

export const TabsTrigger = ({ value, children, className }: any) => {
  const ctx = useContext(TabsContext);
  const isActive = ctx?.value === value;
  return (
    <button
      onClick={() => ctx?.onValueChange(value)}
      className={`${className} ${isActive ? 'active' : ''}`}
      data-state={isActive ? 'active' : 'inactive'}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, children, className }: any) => {
  const ctx = useContext(TabsContext);
  if (ctx?.value !== value) return null;
  return <div className={className}>{children}</div>;
};
