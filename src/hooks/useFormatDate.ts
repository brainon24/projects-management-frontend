
const useFormatDate = () => {

    const formatDate = (dateStr: string) => {

        // const eventDate = (year: any, month: any, day: any) => new Date(Date.UTC(year, month - 1, day));
        const eventDate = (year: any, month: any, day: any) => new Date(year, month - 1, day);
        const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        const date: Date = new Date(dateStr.toString());
        date.setHours(date.getHours() - 5);

        return eventDate(new Date(date).getFullYear(), new Date(date).getMonth() + 1, new Date(date).getDate()).toLocaleDateString('es-ES', options).slice(0, 1).toUpperCase() + eventDate(new Date(date).getFullYear(), new Date(date).getMonth() + 1, new Date(date).getDate()).toLocaleDateString('es-ES', options).slice(1)
    };

    return {
        formatDate
    };
};
  
export default useFormatDate;