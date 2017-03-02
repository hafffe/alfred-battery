#!/usr/bin/env node
'use strict';
const alfy = require('alfy');
const osxBattery = require('osx-battery');
const toPercent = require('to-percent');

const list = [
	{
		title: 'Charging',
		subtitle: () => osxBattery().then(res => res.isCharging ? 'Yes' : 'No')
	}, {
		title: 'Cycle',
		subtitle: () => osxBattery().then(res => res.cycleCount).then(res => `${res} cycles`)
	}, {
		title: 'Fully charged',
		subtitle: () => osxBattery().then(res => res.fullyCharged ? 'Yes' : 'No')
	}, {
		title: 'Level',
		subtitle: () => osxBattery().then(res => `${toPercent(parseFloat((res.currentCapacity / res.maxCapacity).toFixed(2)))}%`)
	}, {
		title: 'Serial',
		subtitle: () => osxBattery().then(res => `Serial Number: ${res.batterySerialNumber}`)
	}, {
		title: 'Temperature',
		subtitle: () => osxBattery().then(res =>
			res.temperature.toString().slice(0, 2)
		).then(res => {
			return `${res}°C`;
		})
	}, {
		title: 'Time remaining',
		subtitle: () => osxBattery().then(res => {
			if (res.isCharging) {
				return 'Your computer is charging';
			}

			return `${res.timeRemaining} minutes left`;
		})
	}
];

Promise.all(alfy.inputMatches(list, 'title').map(x => x.subtitle().then(y => ({
	title: x.title,
	subtitle: y
})))).then(res => {
	alfy.output(res);
});
