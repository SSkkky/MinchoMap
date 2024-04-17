import axios from 'axios';

export const KakaoLogout = (ACCESS_TOKEN) => {
    const config = {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    }

    axios.post('https://kapi.kakao.com/v1/user/logout', {}, config)
        .then(res => { console.log(res.data) })
        .catch(err => { console.log(err) })
}