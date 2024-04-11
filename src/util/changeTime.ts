
// 730 1830
export default function changeTime(t) {
    let hours = String(Math.floor(t / 100));
    let minutes = String(t % 100);
    let isOnAm = '오전';

    if (Math.floor(t / 100) > 12) {
        isOnAm = '오후'
    }

    if (t.toString().length == 3) {
        hours = '0' + hours;
    }

    if (minutes.length < 2) {
        minutes = '0' + minutes;
    }

    let result = isOnAm + ' ' + hours + ':' + minutes;
    return result;
}