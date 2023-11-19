export  const generateId = () => (
    Math.random().toString(16).slice(2) + new Date().getTime().toString(36)
); 

export const fixTime = ((time) => {
    const newTime = new Date(time)
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = newTime.getFullYear();
    var month = months[newTime.getMonth()];
    var date = newTime.getDate();
    var hour = newTime.getHours();
    var min = newTime.getMinutes();
    var sec = newTime.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
})