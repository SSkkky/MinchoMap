import axios from 'axios';

export const GetUserKakaoData = async (accessToken) => {
    const ddd = await axios.post("https://kapi.kakao.com/v2/user/me", {}, {
        headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            "Authorization": `Bearer ${accessToken}`
        }
    })
    return ddd.data;

}