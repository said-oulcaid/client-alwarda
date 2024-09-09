/**
 * @param {Object} errors
 * @param {string} field
 * @returns {Array}
 */


export const formatErrorField = (errors, field) => {
  return errors[field] || null;
};
export function formatTimestamp(isoString) {
  const dt = new Date(isoString);
  const now = new Date();
  const difference = now - dt;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const hours = Math.floor(difference / (1000 * 60 * 60)) % 24;
  const minutes = Math.floor(difference / (1000 * 60)) % 60;

  const day = dt.getUTCDate().toString().padStart(2, "0");
  const month = (dt.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = dt.getUTCFullYear().toString().slice(-2);
  const formattedDate = `${day}/${month}/${year}`;

  let elapsedTime;
  if (years > 0) {
    elapsedTime = `il y a ${years} année${years > 1 ? "s" : ""}`;
  } else if (months > 0) {
    elapsedTime = `il y a ${months} mois`;
  } else if (days > 0) {
    elapsedTime = `il y a ${days} jour${days > 1 ? "s" : ""}`;
  } else if (hours > 0) {
    elapsedTime = `il y a ${hours} heure${hours > 1 ? "s" : ""}`;
  } else {
    elapsedTime = `il y a ${minutes} minute${minutes > 1 ? "s" : ""}`;
  }

  return (
    <>
      {formattedDate}{" "}
      <span className="underline underline-offset-4">{elapsedTime}</span>
    </>
  );
}

export function formatDateToDDMMYY(dateStr) {
  
  const date = new Date(dateStr);
  

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = String(date.getFullYear()).slice(-2); 
  
  
  return `${day}/${month}/${year}`;
}
export const getVariantShip =(isPayed, price,amountPAyed)=>{
if(isPayed){
  return "success"
}else {
  return amountPAyed===0 ? "danger" : "warning"
}
}
export function translateMonthToFrench(month) {
  const monthsInEnglishToFrench = {
    January: "Janvier",
    February: "Février",
    March: "Mars",
    April: "Avril",
    May: "Mai",
    June: "Juin",
    July: "Juillet",
    August: "Août",
    September: "Septembre",
    October: "Octobre",
    November: "Novembre",
    December: "Décembre",
  };

  return monthsInEnglishToFrench[month] || month; // If month not found, return the original month
}

