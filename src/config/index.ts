/**
 * Created by buddy on 2021/3/10.
 */

/**
 * @desc 移动端配置
 */
import 'lib-flexible';
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
import FastClick from 'fastclick';

// TODO fastclick.d.ts
if (/iP(ad|hone|od)/.test(navigator.userAgent)) {
	FastClick.attach(document.body);
}
