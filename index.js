#!/usr/bin/env node
'use strict';
const alfy = require('alfy');
const osxBattery = require('osx-battery');
const toPercent = require('to-percent');

const list = [
	{
		title: 'Charging',
		value: () => osxBattery().then(res => res.isCharging ? 'Yes' : 'No')
	}, {
		title: 'Cycle',
		value: () => osxBattery().then(res => res.cycleCount).then(res => `${res} cycles`)
	}, {
		title: 'Fully charged',
		value: () => osxBattery().then(res => res.fullyCharged ? 'Yes' : 'No')
	}, {
		title: 'Level',
		value: () => osxBattery().then(res => `${toPercent(parseFloat((res.currentCapacity / res.maxCapacity).toFixed(2)))}%`)
	}, {
		title: 'Serial',
		value: () => osxBattery().then(res => `Serial Number: ${res.batterySerialNumber}`)
	}, {
		title: 'Temperature',
		value: () => osxBattery().then(res =>
			res.temperature.toString().slice(0, 2)
		).then(res => {
			return `${res}°C`;
		})
	}, {
		title: 'Time remaining',
		value: () => osxBattery().then(res => {
			if (res.isCharging) {
				return 'Your computer is charging';
			}

			return `${res.timeRemaining} minutes left`;
		})
	}
];

Promise.all(alfy.inputMatches(list, 'title').map(x => x.value().then(y => ({
	title: x.title,
	value: y
})))).then(res => {
	alfy.output(res);
});
