export const getFormattedTime = (date: Date) => {
    const hours = new Date(date).getHours().toString().padStart(2, '0');
    const minutes = new Date(date).getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}

export const getComplementHours = (time = 0) => {
    let complement;

    return time < 12 
        ? complement = 'a.m' 
        : complement = 'p.m';
}