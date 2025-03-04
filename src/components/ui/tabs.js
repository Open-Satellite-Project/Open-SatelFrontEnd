export function Tabs({ children }) {
    return <div>{children}</div>;
  }
  
  export function TabsList({ children }) {
    return <div className="flex border-b">{children}</div>;
  }
  
  export function TabsTrigger({ children }) {
    return <button className="px-4 py-2">{children}</button>;
  }
  
  export function TabsContent({ children }) {
    return <div className="p-4">{children}</div>;
  }
  