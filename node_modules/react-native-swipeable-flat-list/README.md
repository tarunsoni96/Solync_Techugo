[![npm](https://img.shields.io/npm/v/react-native-swipeable-flat-list.svg)](https://www.npmjs.com/package/react-native-swipeable-flat-list) [![npm](https://img.shields.io/npm/dm/react-native-swipeable-flat-list.svg)](https://www.npmjs.com/package/react-native-swipeable-flat-list)

# react-native-swipeable-flat-list
A React Native component, based on FlatList, implementing the ability for its rows to be swiped open/close.

# Installation
```bash
npm install --save react-native-swipeable-flat-list
```

# Usage
```javascript
import {SwipeableFlatList} from 'react-native-swipeable-flat-list';

...

render() {
	const data = [
		{ key: 1, label: 'Label 1', leftLabel: 'Left 1', rightLabel: 'Right 1' },
		{ key: 2, label: 'Label 2', leftLabel: 'Left 2', rightLabel: 'Right 2' },
		{ key: 3, label: 'Label 3', leftLabel: 'Left 3', rightLabel: 'Right 3' },
		{ key: 4, label: 'Label 4', leftLabel: 'Left 4', rightLabel: 'Right 4' },
		{ key: 5, label: 'Label 5', leftLabel: 'Left 5', rightLabel: 'Right 5' },
	];
	return (
		<SwipeableFlatList
			data={data}
			renderItem={({ item }) => (
				<Text style={{ height: 48 }}>{item.label}</Text>
			)}
			renderLeft={({ item }) => (
				<Text style={{ width: 40 }}>{item.leftLabel}</Text>
			)}
			renderRight={({ item }) => (
				<Text style={{ width: 100 }}>{item.rightLabel}</Text>
			)}
			backgroundColor={'white'}
		/>
	)
}
```

# Example

```
cd example
yarn
react-native run-*
```

**NOTE**: I haven't been able to test under iOS, yet.

# API

## `SwipeableFlatList` (component)

A FlatList that renders SwipeableListItems.

### Props

#### `data` (required)

The data array passed to the FlatList.

type: `arrayOf(object)`

#### `renderItem` (required)

The render function for the main element of a SwipeableListItem, which lies above the left and/or the right element.

type: `func`

#### `renderLeft`

The render function for the left element of a SwipeableListItem, which is hidden beneath the main element and revealed on swiping to the right.

type: `func`

#### `renderRight`

The render function for the right element of a SwipeableListItem, which is hidden beneath the main element and revealed on swiping to the left.

type: `func`

#### `itemBackgroundColor`

The background color passed to the SwipeableListItem.

type: `string`
default: `#fff`

#### `style`

The style prop passed to the underlying FlatList.

type: `style`

## `SwipeableListItem` (component)

A ListItem to be used with SwipeableFlatList.

### Props

#### `item` (required)

The main element, which lies above the left and/or the right element.

type: `element`

**NOTE:** The element's `style.height` has to be set in order to be able to set the height of the SwipeableListItem.

#### `left`

The left element, which is hidden beneath the main element and revealed on swiping to the right.

type: `element`

**NOTE:** The element's `style.width` has to be set in order for it to be able to open.

#### `right`

The right element, which is hidden beneath the main element and revealed on swiping to the left.

**NOTE:** The element's `style.width` has to be set in order for it to be able to open.

type: `element`

#### `backgroundColor`

The background color of the SwipeableListItem.

type: `string`
default: `#fff`

#### `swipeThreshold`

The threshold (in px) which must be passed before the SwipeableListItem's PanResponder handles a horizontal swipe.

type: `number`
default: `4`

#### `swipeOpenThresholdPercentage`

The threshold percentage (0 - 100) of the corresponding hidden element's width (left/right) which must be passed in order to open.

type: `number`
default: `20`

#### `swipeCloseThresholdPercentage`

The threshold percentage (0 - 100) of the corresponding hidden element's width (left/right) which must be passed in order to close.

type: `number`
default: `20`

#### `friction`

The friction or _"bounciness"/overshoot_ passed to the open/close spring animation.
See [Animated](https://facebook.github.io/react-native/docs/animated.html#spring) for further documentation.

type: `number`
default: `9`

#### `tension`

The tension or _speed_ passed to the open/close spring animation.
See [Animated](https://facebook.github.io/react-native/docs/animated.html#spring) for further documentation.

type: `number`
default: `40`

#### `onOpen`

A callback called when the SwipeableListItem is swiped open.

type: `func`

#### `onClose`

A callback called when the SwipeableListItem is swiped close.

type: `func`

# License

MIT
