import { useEffect } from 'react';
import { useParams } from 'react-router-dom'

const Show = () => {
  useEffect(() => {
    document.title = "Alwarda | Details Paiement";
  }, []);
  const {id}=useParams()
  return (
    <div>Show payment {id}</div>
  )
}

export default Show