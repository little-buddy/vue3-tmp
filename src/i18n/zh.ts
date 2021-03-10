/**
 * Created by buddy on 2021/3/9.
 */
import { LocaleMessageDictionary, VueMessageType } from 'vue-i18n';

export default {
	['net-scan']: '网络监测',
	netScan: {
		UserAgent: '设备信息',
		Platform: '操作系统',
		'App version': 'App 版本号',
		Explore: '使用浏览器',
		'Information of Phone': '手机信息',
		height: '高',
		width: '宽',
		lang: '语言',
		ip: '用户',
		location: '用户所在地',
		'Net Operator': '网络运营商',
		'Resource download speed': '资源下载速度',
		'Api response speed': 'Api响应速度',
		'App ws response speed': 'App ws响应速度',
	},
} as LocaleMessageDictionary<VueMessageType>;
