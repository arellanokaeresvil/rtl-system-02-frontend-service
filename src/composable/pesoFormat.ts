export const usePesoFormat = (amount: any) =>{
    console.log('amount',amount)
    const formatPeso =  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
    }).format(amount);
 console.log('formatPeso',formatPeso)
    return formatPeso;

}