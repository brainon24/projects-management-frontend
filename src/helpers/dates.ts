export const getFormattedTime = (date: Date) => {
    const hours = new Date(date).getHours().toString().padStart(2, '0');
    const minutes = new Date(date).getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}

export const getComplementHours = (time: any = 0) => {
    let complement;
    const hour: any = new Date(time).getHours();
    const minutes = new Date(time).getMinutes().toString().padStart(2, '0');

    const hours = hour % 12 || 12

    const amOrPm = time < 12 
        ? complement = 'a.m' 
        : complement = 'p.m';
    
        return `${hours.toString().padStart(2, '0')}:${minutes} ${amOrPm}`
    }