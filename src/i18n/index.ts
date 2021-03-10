/**
 * Created by buddy on 2021/3/9.
 */
import { I18n, createI18n } from 'vue-i18n';
import en from './en';
import zh from './zh';

const i18n = createI18n({
	locale: /^zh/.test(navigator.language) ? 'zh' : 'en',
	fallbackLocale: 'en',
	messages: {
		en,
		zh,
	},
});

export default i18n as I18n;
