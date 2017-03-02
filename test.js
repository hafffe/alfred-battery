import test from 'ava';
import alfyTest from 'alfy-test';

test('Charging', async t => {
	const alfy = alfyTest();
	const result = await alfy('Chargin');

	t.is(typeof result, 'object');
});

test('Cycle', async t => {
	const alfy = alfyTest();
	const result = await alfy('Cycle');

	t.is(typeof result, 'object');
});

test('Level', async t => {
	const alfy = alfyTest();
	const result = await alfy('Level');

	t.is(typeof result, 'object');
});

test('fullyCharged', async t => {
	const alfy = alfyTest();
	const result = await alfy('Fully Charged');

	t.is(typeof result, 'object');
});

test('Serial number', async t => {
	const alfy = alfyTest();
	const result = await alfy('Serial');

	t.is(typeof result, 'object');
});

test('timeRemaining', async t => {
	const alfy = alfyTest();
	const result = await alfy('Time remaining');

	t.is(typeof result, 'object');
});

test('temperature', async t => {
	const alfy = alfyTest();
	const result = await alfy('Temperature');

	t.is(typeof result, 'object');
});
