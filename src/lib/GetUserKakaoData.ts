import axios from 'axios';
import { useRouter } from 'vue-router';
import { useCookies } from 'vue3-cookies';

const router = useRouter();
const { cookies } = useCookies();

export const GetUserKakaoData = (accessToken) => {
    axios.post("https://kapi.kakao.com/v2/user/me", {}, {
        headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            "Authorization": `Bearer ${accessToken}`
        }
    }).then(res => {
        return res.data;
    }).catch(err => {
        console.log(err)
    })
}