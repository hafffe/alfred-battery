#!/usr/bin/env node
'use strict';
const alfy = require('alfy');
const osxBattery = require('osx-battery');
const toPercent = require('to-percent');

const list = [
	{
		title: 'Charging',
		value: () => {
			return osxBattery().then(res => res.isCharging ? 'True' : 'False');
		}
	}, {
		title: 'Cycle',
		value: () => {
			return osxBattery().then(res => res.cycleCount)
				.then(res => `${res} Cycles`);
		}
	}, {
		title: 'fullyCharged',
		value: () => {
			return osxBattery().then(res => res.fullyCharged ? 'True' : 'False');
		}
	}, {
		title: 'Level',
		value: () => {
			return osxBattery().then(res => {
				return parseFloat((res.currentCapacity / res.maxCapacity).toFixed(2));
			}).then(res => {
				const val = toPercent(res);
				return `${val}%`;
			});
		}
	}, {
		title: 'Serial',
		value: () => {
			return osxBattery().then(res => {
				return `Serial Number: ${res.batterySerialNumber}`;
			});
		}
	}, {
		title: 'temperature',
		value: () => {
			return osxBattery().then(res => {
				const str = res.temperature.toString();
				return str.slice(0, 2);
			}).then(res => {
				return `${res}°C`;
			});
		}
	}, {
		title: 'timeRemaining',
		value: () => {
			return osxBattery().then(res => {
				if (res.isCharging) {
					return 'Your computer is charging';
				}
				return `${res.timeRemaining} Minutes left`;
			});
		}
	}
];

Promise.all(alfy.inputMatches(list, 'title').map(x => x.value().then(y => ({
	title: x.title,
	value: y
})))).then(res => {
	alfy.output(res);
});
