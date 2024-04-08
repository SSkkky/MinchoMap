import axios from 'axios';

// 데이터를 가져오는 함수
export const getData = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_DB_URL}`);
        return response.data; // 응답 데이터 반환
    } catch (error) {
        console.error('데이터를 가져오는 데 실패했습니다:', error);
        throw error; // 에러 처리
    }
};
