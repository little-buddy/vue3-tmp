/**
 * Created by buddy on 2021/3/9.
 */

import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const http = Axios.create({
	timeout: 30000,
});

http.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		if (!config.headers) {
			config.headers = {};
		}

		return config;
	},
	err => {
		//
	}
);

http.interceptors.response.use(
	(res: AxiosResponse) => {
		if (res.status === 200) {
			if (res.data.code) {
				if (res.data.code == 200) {
					return res.data;
				} else {
					return Promise.reject(new Error(res.data.msg));
				}
			}
			return res.data;
		}
		return Promise.reject(res);
	},
	err => {
		//
	}
);

export default http;
