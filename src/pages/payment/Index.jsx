import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Alwarda | Paiments";
  }, []);
  return (
    <div>Index</div>
  )
}

export default Index