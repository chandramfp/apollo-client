import axios from 'axios';
// import ls from 'local-storage';

const callApi = async (method, url, data) => {
  try {
    const URL = process.env.REACT_APP_BASE_URL + url;
    // console.log('token', ls.get('token'));

    const response = await axios({
      method,
      url: URL,
      ...data,
    });
    // console.log(' return responseeeee', response);
    return response.data;
  } catch (error) {
    // console.log('Inside catch');
    return { status: 'error', message: 'This is a error message' };
  }
};
export default callApi;
