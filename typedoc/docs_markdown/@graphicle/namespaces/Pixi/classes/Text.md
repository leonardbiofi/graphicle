[**@graphicle/js**](../../../../README.md)

***

[@graphicle/js](../../../../globals.md) / [Pixi](../README.md) / Text

# Class: Text

Defined in: node\_modules/pixi.js/lib/scene/text/Text.d.ts:6

A Text Object will create a line or multiple lines of text.

To split a line you can use '\n' in your text string, or, on the `style` object,
change its `wordWrap` property to true and and givae the `wordWrapWidth` property a value.

The primary advantage of this class over BitmapText is that you have great control over the style of the text,
which you can change at runtime.

The primary disadvantages is that each piece of text has it's own texture, which can use more memory.
When text changes, this texture has to be re-generated and re-uploaded to the GPU, taking up time.

## Example

```ts
import { Text } from 'pixi.js';

const text = new Text({
    text: 'Hello Pixi!',
    style: {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0xff1010,
        align: 'center',
    }
});
```

## Memberof

scene

## Extends

- `Text`.`AbstractText`\<[`TextStyle`](TextStyle.md), `TextStyleOptions`\>

## Implements

- `View`

## Constructors

### Constructor

> **new Text**(`options?`): `Text`

Defined in: node\_modules/pixi.js/lib/scene/text/Text.d.ts:38

#### Parameters

##### options?

`TextOptions`\<[`TextStyle`](TextStyle.md), `TextStyleOptions`\>

The options of the text.

#### Returns

`Text`

#### Inherited from

`PixiMixins.Text.constructor`

### Constructor

> **new Text**(`text?`, `options?`): `Text`

Defined in: node\_modules/pixi.js/lib/scene/text/Text.d.ts:40

#### Parameters

##### text?

`TextString`

##### options?

`Partial`\<[`TextStyle`](TextStyle.md)\>

#### Returns

`Text`

#### Deprecated

since 8.0.0

#### Inherited from

`PixiMixins.Text.constructor`

## Properties

### \_accessibleActive?

> `optional` **\_accessibleActive**: `boolean`

Defined in: node\_modules/pixi.js/lib/accessibility/accessibilityTarget.d.ts:70

#### Inherited from

`AbstractText._accessibleActive`

***

### \_accessibleDiv?

> `optional` **\_accessibleDiv**: `null` \| `AccessibleHTMLElement`

Defined in: node\_modules/pixi.js/lib/accessibility/accessibilityTarget.d.ts:71

#### Inherited from

`AbstractText._accessibleDiv`

***

### \_anchor

> **\_anchor**: `ObservablePoint`

Defined in: node\_modules/pixi.js/lib/scene/text/AbstractText.d.ts:76

#### Inherited from

`AbstractText._anchor`

***

### \_autoResolution

> **\_autoResolution**: `boolean`

Defined in: node\_modules/pixi.js/lib/scene/text/AbstractText.d.ts:78

#### Inherited from

`AbstractText._autoResolution`

***

### \_bounds

> `protected` **\_bounds**: `Bounds`

Defined in: node\_modules/pixi.js/lib/scene/view/ViewContainer.d.ts:30

#### Inherited from

`AbstractText._bounds`

***

### \_boundsDirty

> `protected` **\_boundsDirty**: `boolean`

Defined in: node\_modules/pixi.js/lib/scene/view/ViewContainer.d.ts:31

#### Inherited from

`AbstractText._boundsDirty`

***

### \_didTextUpdate

> **\_didTextUpdate**: `boolean`

Defined in: node\_modules/pixi.js/lib/scene/text/AbstractText.d.ts:80

#### Inherited from

`AbstractText._didTextUpdate`

***

### \_filterEffect?

> `optional` **\_filterEffect**: `FilterEffect`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.d.ts:22

#### Inherited from

`AbstractText._filterEffect`

***

### \_internalEventMode

> **\_internalEventMode**: `EventMode`

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:144

#### Inherited from

`AbstractText._internalEventMode`

***

### \_localBoundsCacheData

> **\_localBoundsCacheData**: `LocalBoundsCacheData`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/measureMixin.d.ts:15

#### Inherited from

`AbstractText._localBoundsCacheData`

***

### \_localBoundsCacheId

> **\_localBoundsCacheId**: `number`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/measureMixin.d.ts:16

#### Inherited from

`AbstractText._localBoundsCacheId`

***

### \_maskEffect?

> `optional` **\_maskEffect**: `MaskEffect`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.d.ts:20

#### Inherited from

`AbstractText._maskEffect`

***

### \_maskOptions?

> `optional` **\_maskOptions**: `MaskOptions`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.d.ts:21

#### Inherited from

`AbstractText._maskOptions`

***

### \_onRender

> **\_onRender**: `null` \| (`renderer`) => `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/onRenderMixin.d.ts:7

#### Inherited from

`AbstractText._onRender`

***

### \_renderId?

> `optional` **\_renderId**: `number`

Defined in: node\_modules/pixi.js/lib/accessibility/accessibilityTarget.d.ts:72

#### Inherited from

`AbstractText._renderId`

***

### \_resolution

> **\_resolution**: `number`

Defined in: node\_modules/pixi.js/lib/scene/text/AbstractText.d.ts:77

#### Inherited from

`AbstractText._resolution`

***

### \_style

> **\_style**: [`TextStyle`](TextStyle.md)

Defined in: node\_modules/pixi.js/lib/scene/text/AbstractText.d.ts:79

#### Inherited from

`AbstractText._style`

***

### \_text

> `protected` **\_text**: `string`

Defined in: node\_modules/pixi.js/lib/scene/text/AbstractText.d.ts:81

#### Inherited from

`AbstractText._text`

***

### \_zIndex

> **\_zIndex**: `number`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/sortMixin.d.ts:8

#### Inherited from

`AbstractText._zIndex`

***

### accessible?

> `optional` **accessible**: `boolean`

Defined in: node\_modules/pixi.js/lib/accessibility/accessibilityTarget.d.ts:30

Flag for if the object is accessible. If true AccessibilityManager will overlay a
shadow div with attributes set

#### Default

```ts
false
```

#### Inherited from

`AbstractText.accessible`

***

### accessibleChildren?

> `optional` **accessibleChildren**: `boolean`

Defined in: node\_modules/pixi.js/lib/accessibility/accessibilityTarget.d.ts:63

Setting to false will prevent any children inside this container to
be accessible. Defaults to true.

#### Default

```ts
true
```

#### Inherited from

`AbstractText.accessibleChildren`

***

### accessibleHint?

> `optional` **accessibleHint**: `null` \| `string`

Defined in: node\_modules/pixi.js/lib/accessibility/accessibilityTarget.d.ts:38

Sets the aria-label attribute of the shadow div

#### Inherited from

`AbstractText.accessibleHint`

***

### accessiblePointerEvents?

> `optional` **accessiblePointerEvents**: `PointerEvents`

Defined in: node\_modules/pixi.js/lib/accessibility/accessibilityTarget.d.ts:57

#### Inherited from

`AbstractText.accessiblePointerEvents`

***

### accessibleText?

> `optional` **accessibleText**: `null` \| `string`

Defined in: node\_modules/pixi.js/lib/accessibility/accessibilityTarget.d.ts:56

Sets the text content of the shadow div

#### Inherited from

`AbstractText.accessibleText`

***

### accessibleTitle?

> `optional` **accessibleTitle**: `null` \| `string`

Defined in: node\_modules/pixi.js/lib/accessibility/accessibilityTarget.d.ts:36

Sets the title attribute of the shadow div
If accessibleTitle AND accessibleHint has not been this will default to 'container [tabIndex]'

#### Member

#### Inherited from

`AbstractText.accessibleTitle`

***

### accessibleType?

> `optional` **accessibleType**: keyof HTMLElementTagNameMap

Defined in: node\_modules/pixi.js/lib/accessibility/accessibilityTarget.d.ts:48

Specify the type of div the accessible layer is. Screen readers treat the element differently
depending on this type. Defaults to button.

#### Default

```ts
'button'
```

#### Inherited from

`AbstractText.accessibleType`

***

### boundsArea

> **boundsArea**: `Rectangle`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:446

An optional bounds area for this container. Setting this rectangle will stop the renderer
from recursively measuring the bounds of each children and instead use this single boundArea.
This is great for optimisation! If for example you have a 1000 spinning particles and you know they all sit
within a specific bounds, then setting it will mean the renderer will not need to measure the
1000 children to find the bounds. Instead it will just use the bounds you set.

#### Inherited from

`AbstractText.boundsArea`

***

### ~~cacheAsBitmap~~

> **cacheAsBitmap**: `boolean`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/cacheAsTextureMixin.d.ts:27

Legacy property for backwards compatibility with PixiJS v7 and below.
Use `cacheAsTexture` instead.

#### Deprecated

Since PixiJS v8

#### Memberof

scene.Container#

#### Inherited from

`AbstractText.cacheAsBitmap`

***

### cacheAsTexture()

> **cacheAsTexture**: (`val`) => `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/cacheAsTextureMixin.d.ts:14

Caches this container as a texture. This allows the container to be rendered as a single texture,
which can improve performance for complex static containers.

#### Parameters

##### val

If true, enables caching with default options. If false, disables caching.
Can also pass options object to configure caching behavior.

`boolean` | `CacheAsTextureOptions`

#### Returns

`void`

#### Memberof

scene.Container#

#### Inherited from

`AbstractText.cacheAsTexture`

***

### children

> `readonly` **children**: `ContainerChild`[]

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:308

The array of children of this container.

#### Inherited from

`AbstractText.children`

***

### cullable?

> `optional` **cullable**: `boolean`

Defined in: node\_modules/pixi.js/lib/culling/cullingMixin.d.ts:17

Should this object be rendered if the bounds of this object are out of frame?

Culling has no effect on whether updateTransform is called.

#### Default

```ts
false
```

#### Memberof

scene.Container#

#### Inherited from

`AbstractText.cullable`

***

### cullableChildren?

> `optional` **cullableChildren**: `boolean`

Defined in: node\_modules/pixi.js/lib/culling/cullingMixin.d.ts:25

Determines if the children to the container can be culled
Setting this to false allows PixiJS to bypass a recursive culling function
Which can help to optimize very complex scenes

#### Default

```ts
true
```

#### Memberof

scene.Container#

#### Inherited from

`AbstractText.cullableChildren`

***

### cullArea?

> `optional` **cullArea**: `Rectangle`

Defined in: node\_modules/pixi.js/lib/culling/cullingMixin.d.ts:9

If set, this shape is used for culling instead of the bounds of this object.
It can improve the culling performance of objects with many children.
The culling area is defined in local space.

#### Memberof

scene.Container#

#### Inherited from

`AbstractText.cullArea`

***

### cursor?

> `optional` **cursor**: `string`

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:61

The cursor preferred when the mouse pointer is hovering over.

#### Inherited from

`AbstractText.cursor`

***

### depthOfChildModified()

> **depthOfChildModified**: () => `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/sortMixin.d.ts:10

#### Returns

`void`

#### Inherited from

`AbstractText.depthOfChildModified`

***

### destroyed

> **destroyed**: `boolean`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:350

If the object has been destroyed via destroy(). If true, it should not be used.

#### Inherited from

`AbstractText.destroyed`

***

### effects?

> `optional` **effects**: `Effect`[]

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.d.ts:24

#### Inherited from

`AbstractText.effects`

***

### eventMode?

> `optional` **eventMode**: `EventMode`

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:63

The mode of interaction for this object

#### Inherited from

`AbstractText.eventMode`

***

### filterArea?

> `optional` **filterArea**: `Rectangle`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.d.ts:23

#### Inherited from

`AbstractText.filterArea`

***

### filters

> **filters**: `Filter` \| `Filter`[]

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.d.ts:10

#### Inherited from

`AbstractText.filters`

***

### groupAlpha

> **groupAlpha**: `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:411

#### Inherited from

`AbstractText.groupAlpha`

***

### groupColor

> **groupColor**: `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:412

#### Inherited from

`AbstractText.groupColor`

***

### groupColorAlpha

> **groupColorAlpha**: `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:413

#### Inherited from

`AbstractText.groupColorAlpha`

***

### groupTransform

> `readonly` **groupTransform**: `Matrix`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:347

The group transform is a transform relative to the render group it belongs too.
If this container is render group then this will be an identity matrix. other wise it
will be the same as the relativeGroupTransform.
Use this value when actually rendering things to the screen

#### Inherited from

`AbstractText.groupTransform`

***

### hitArea?

> `optional` **hitArea**: `null` \| `IHitArea`

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:69

The hit-area specifies the area for which pointer events should be captured by this event target.

#### Inherited from

`AbstractText.hitArea`

***

### interactive?

> `optional` **interactive**: `boolean`

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:65

Whether this event target should fire UI events.

#### Inherited from

`AbstractText.interactive`

***

### interactiveChildren?

> `optional` **interactiveChildren**: `boolean`

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:67

Whether this event target has any children that need UI events. This can be used optimize event propagation.

#### Inherited from

`AbstractText.interactiveChildren`

***

### isCachedAsTexture

> `readonly` **isCachedAsTexture**: `boolean`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/cacheAsTextureMixin.d.ts:33

Whether this container is currently cached as a texture.

#### Memberof

scene.Container#

#### Inherited from

`AbstractText.isCachedAsTexture`

***

### isInteractive()

> **isInteractive**: () => `boolean`

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:146

Returns true if the Container has interactive 'static' or 'dynamic'

#### Returns

`boolean`

#### Inherited from

`AbstractText.isInteractive`

***

### label

> **label**: `string`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/findMixin.d.ts:3

#### Inherited from

`AbstractText.label`

***

### layerParentId

> **layerParentId**: `string`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:459

#### Inherited from

`AbstractText.layerParentId`

***

### localAlpha

> **localAlpha**: `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:410

#### Inherited from

`AbstractText.localAlpha`

***

### localColor

> **localColor**: `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:409

#### Inherited from

`AbstractText.localColor`

***

### localTransform

> `readonly` **localTransform**: `Matrix`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:332

Current transform of the object based on local factors: position, scale, other stuff.

#### Inherited from

`AbstractText.localTransform`

***

### mask

> **mask**: `Mask`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.d.ts:8

#### Inherited from

`AbstractText.mask`

***

### ~~name~~

> **name**: `string`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/findMixin.d.ts:10

#### Deprecated

since 8.0.0

#### See

Container#label

#### Inherited from

`AbstractText.name`

***

### onclick?

> `optional` **onclick**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:71

Handler for 'click' event

#### Inherited from

`AbstractText.onclick`

***

### onglobalmousemove?

> `optional` **onglobalmousemove**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:81

Handler for 'globalmousemove' event

#### Inherited from

`AbstractText.onglobalmousemove`

***

### onglobalpointermove?

> `optional` **onglobalpointermove**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:101

Handler for 'globalpointermove' event

#### Inherited from

`AbstractText.onglobalpointermove`

***

### onglobaltouchmove?

> `optional` **onglobaltouchmove**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:131

Handler for 'globaltouchmove' event

#### Inherited from

`AbstractText.onglobaltouchmove`

***

### onmousedown?

> `optional` **onmousedown**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:73

Handler for 'mousedown' event

#### Inherited from

`AbstractText.onmousedown`

***

### onmouseenter?

> `optional` **onmouseenter**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:75

Handler for 'mouseenter' event

#### Inherited from

`AbstractText.onmouseenter`

***

### onmouseleave?

> `optional` **onmouseleave**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:77

Handler for 'mouseleave' event

#### Inherited from

`AbstractText.onmouseleave`

***

### onmousemove?

> `optional` **onmousemove**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:79

Handler for 'mousemove' event

#### Inherited from

`AbstractText.onmousemove`

***

### onmouseout?

> `optional` **onmouseout**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:83

Handler for 'mouseout' event

#### Inherited from

`AbstractText.onmouseout`

***

### onmouseover?

> `optional` **onmouseover**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:85

Handler for 'mouseover' event

#### Inherited from

`AbstractText.onmouseover`

***

### onmouseup?

> `optional` **onmouseup**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:87

Handler for 'mouseup' event

#### Inherited from

`AbstractText.onmouseup`

***

### onmouseupoutside?

> `optional` **onmouseupoutside**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:89

Handler for 'mouseupoutside' event

#### Inherited from

`AbstractText.onmouseupoutside`

***

### onpointercancel?

> `optional` **onpointercancel**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:91

Handler for 'pointercancel' event

#### Inherited from

`AbstractText.onpointercancel`

***

### onpointerdown?

> `optional` **onpointerdown**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:93

Handler for 'pointerdown' event

#### Inherited from

`AbstractText.onpointerdown`

***

### onpointerenter?

> `optional` **onpointerenter**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:95

Handler for 'pointerenter' event

#### Inherited from

`AbstractText.onpointerenter`

***

### onpointerleave?

> `optional` **onpointerleave**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:97

Handler for 'pointerleave' event

#### Inherited from

`AbstractText.onpointerleave`

***

### onpointermove?

> `optional` **onpointermove**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:99

Handler for 'pointermove' event

#### Inherited from

`AbstractText.onpointermove`

***

### onpointerout?

> `optional` **onpointerout**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:103

Handler for 'pointerout' event

#### Inherited from

`AbstractText.onpointerout`

***

### onpointerover?

> `optional` **onpointerover**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:105

Handler for 'pointerover' event

#### Inherited from

`AbstractText.onpointerover`

***

### onpointertap?

> `optional` **onpointertap**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:107

Handler for 'pointertap' event

#### Inherited from

`AbstractText.onpointertap`

***

### onpointerup?

> `optional` **onpointerup**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:109

Handler for 'pointerup' event

#### Inherited from

`AbstractText.onpointerup`

***

### onpointerupoutside?

> `optional` **onpointerupoutside**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:111

Handler for 'pointerupoutside' event

#### Inherited from

`AbstractText.onpointerupoutside`

***

### onRender()

> **onRender**: (`renderer`) => `null` \| `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/onRenderMixin.d.ts:4

#### Parameters

##### renderer

`Renderer`

#### Returns

`null` \| `void`

#### Inherited from

`AbstractText.onRender`

***

### onrightclick?

> `optional` **onrightclick**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:113

Handler for 'rightclick' event

#### Inherited from

`AbstractText.onrightclick`

***

### onrightdown?

> `optional` **onrightdown**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:115

Handler for 'rightdown' event

#### Inherited from

`AbstractText.onrightdown`

***

### onrightup?

> `optional` **onrightup**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:117

Handler for 'rightup' event

#### Inherited from

`AbstractText.onrightup`

***

### onrightupoutside?

> `optional` **onrightupoutside**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:119

Handler for 'rightupoutside' event

#### Inherited from

`AbstractText.onrightupoutside`

***

### ontap?

> `optional` **ontap**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:121

Handler for 'tap' event

#### Inherited from

`AbstractText.ontap`

***

### ontouchcancel?

> `optional` **ontouchcancel**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:123

Handler for 'touchcancel' event

#### Inherited from

`AbstractText.ontouchcancel`

***

### ontouchend?

> `optional` **ontouchend**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:125

Handler for 'touchend' event

#### Inherited from

`AbstractText.ontouchend`

***

### ontouchendoutside?

> `optional` **ontouchendoutside**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:127

Handler for 'touchendoutside' event

#### Inherited from

`AbstractText.ontouchendoutside`

***

### ontouchmove?

> `optional` **ontouchmove**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:129

Handler for 'touchmove' event

#### Inherited from

`AbstractText.ontouchmove`

***

### ontouchstart?

> `optional` **ontouchstart**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:133

Handler for 'touchstart' event

#### Inherited from

`AbstractText.ontouchstart`

***

### onwheel?

> `optional` **onwheel**: `null` \| `FederatedEventHandler`\<`FederatedWheelEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:135

Handler for 'wheel' event

#### Inherited from

`AbstractText.onwheel`

***

### parent

> **parent**: [`Container`](Container.md)

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:310

The display object container that contains this display object.

#### Inherited from

`AbstractText.parent`

***

### parentRenderLayer

> `readonly` **parentRenderLayer**: `IRenderLayer`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:322

The RenderLayer this container belongs to, if any.
If it belongs to a RenderLayer, it will be rendered from the RenderLayer's position in the scene.

#### Inherited from

`AbstractText.parentRenderLayer`

***

### relativeGroupTransform

> `readonly` **relativeGroupTransform**: `Matrix`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:339

The relative group transform is a transform relative to the render group it belongs too. It will include all parent
transforms and up to the render group (think of it as kind of like a stage - but the stage can be nested).
If this container is is self a render group matrix will be relative to its parent render group

#### Inherited from

`AbstractText.relativeGroupTransform`

***

### setMask()

> **setMask**: (`options`) => `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.d.ts:9

#### Parameters

##### options

`Partial`\<`MaskOptionsAndMask`\>

#### Returns

`void`

#### Inherited from

`AbstractText.setMask`

***

### sortableChildren

> **sortableChildren**: `boolean`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/sortMixin.d.ts:5

#### Inherited from

`AbstractText.sortableChildren`

***

### sortChildren()

> **sortChildren**: () => `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/sortMixin.d.ts:9

#### Returns

`void`

#### Inherited from

`AbstractText.sortChildren`

***

### sortDirty

> **sortDirty**: `boolean`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/sortMixin.d.ts:4

#### Inherited from

`AbstractText.sortDirty`

***

### tabIndex?

> `optional` **tabIndex**: `number`

Defined in: node\_modules/pixi.js/lib/accessibility/accessibilityTarget.d.ts:42

#### Default

```ts
0
```

#### Inherited from

`AbstractText.tabIndex`

***

### uid

> `readonly` **uid**: `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:289

unique id for this container

#### Inherited from

`AbstractText.uid`

***

### updateCacheTexture()

> **updateCacheTexture**: () => `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/cacheAsTextureMixin.d.ts:20

Updates the cached texture of this container. This will flag the container's cached texture
to be redrawn on the next render.

#### Returns

`void`

#### Memberof

scene.Container#

#### Inherited from

`AbstractText.updateCacheTexture`

***

### zIndex

> **zIndex**: `number`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/sortMixin.d.ts:3

#### Inherited from

`AbstractText.zIndex`

***

### prefixed

> `static` **prefixed**: `string` \| `boolean`

Defined in: node\_modules/eventemitter3/index.d.ts:9

## Accessors

### \_didChangeId

#### Get Signature

> **get** **\_didChangeId**(): `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:466

##### Returns

`number`

#### Inherited from

`AbstractText._didChangeId`

***

### alpha

#### Get Signature

> **get** **alpha**(): `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:616

The opacity of the object.

##### Returns

`number`

#### Set Signature

> **set** **alpha**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:614

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

`AbstractText.alpha`

***

### anchor

#### Get Signature

> **get** **anchor**(): `ObservablePoint`

Defined in: node\_modules/pixi.js/lib/scene/text/AbstractText.d.ts:99

The anchor sets the origin point of the text.
The default is `(0,0)`, this means the text's origin is the top left.

Setting the anchor to `(0.5,0.5)` means the text's origin is centered.

Setting the anchor to `(1,1)` would mean the text's origin point will be the bottom right corner.

If you pass only single parameter, it will set both x and y to the same value as shown in the example below.

##### Example

```ts
import { Text } from 'pixi.js';

const text = new Text('hello world');
text.anchor.set(0.5); // This will set the origin to center. (0.5) is same as (0.5, 0.5).
```

##### Returns

`ObservablePoint`

#### Set Signature

> **set** **anchor**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/text/AbstractText.d.ts:100

##### Parameters

###### value

`number` | `PointData`

##### Returns

`void`

#### Inherited from

`AbstractText.anchor`

***

### angle

#### Get Signature

> **get** **angle**(): `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:538

The angle of the object in degrees.
'rotation' and 'angle' have the same effect on a display object; rotation is in radians, angle is in degrees.

##### Returns

`number`

#### Set Signature

> **set** **angle**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:539

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

`AbstractText.angle`

***

### blendMode

#### Get Signature

> **get** **blendMode**(): `BLEND_MODES`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:630

The blend mode to be applied to the sprite. Apply a value of `'normal'` to reset the blend mode.

##### Default

```ts
'normal'
```

##### Returns

`BLEND_MODES`

#### Set Signature

> **set** **blendMode**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:625

##### Parameters

###### value

`BLEND_MODES`

##### Returns

`void`

#### Inherited from

`AbstractText.blendMode`

***

### bounds

#### Get Signature

> **get** **bounds**(): `Bounds`

Defined in: node\_modules/pixi.js/lib/scene/view/ViewContainer.d.ts:36

The local bounds of the view.

##### Returns

`Bounds`

#### Inherited from

`AbstractText.bounds`

***

### height

#### Get Signature

> **get** **height**(): `number`

Defined in: node\_modules/pixi.js/lib/scene/text/AbstractText.d.ts:131

The height of the sprite, setting this will actually modify the scale to achieve the value set.

##### Returns

`number`

#### Set Signature

> **set** **height**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/text/AbstractText.d.ts:132

The height of the Container, setting this will actually modify the scale to achieve the value set.

##### Memberof

scene.Container#

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

`AbstractText.height`

***

### isRenderable

#### Get Signature

> **get** **isRenderable**(): `boolean`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:642

Whether or not the object should be rendered.

##### Returns

`boolean`

#### Inherited from

`AbstractText.isRenderable`

***

### isRenderGroup

#### Get Signature

> **get** **isRenderGroup**(): `boolean`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:494

Returns true if this container is a render group.
This means that it will be rendered as a separate pass, with its own set of instructions

##### Returns

`boolean`

#### Set Signature

> **set** **isRenderGroup**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:489

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

`AbstractText.isRenderGroup`

***

### pivot

#### Get Signature

> **get** **pivot**(): `ObservablePoint`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:547

The center of rotation, scaling, and skewing for this display object in its local space. The `position`
is the projection of `pivot` in the parent's local space.

By default, the pivot is the origin (0, 0).

##### Since

4.0.0

##### Returns

`ObservablePoint`

#### Set Signature

> **set** **pivot**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:548

##### Parameters

###### value

`number` | `PointData`

##### Returns

`void`

#### Inherited from

`AbstractText.pivot`

***

### position

#### Get Signature

> **get** **position**(): `ObservablePoint`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:526

The coordinate of the object relative to the local coordinates of the parent.

##### Since

4.0.0

##### Returns

`ObservablePoint`

#### Set Signature

> **set** **position**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:527

##### Parameters

###### value

`PointData`

##### Returns

`void`

#### Inherited from

`AbstractText.position`

***

### renderable

#### Get Signature

> **get** **renderable**(): `boolean`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:639

Can this object be rendered, if false the object will not be drawn but the transform will still be updated.

##### Returns

`boolean`

#### Set Signature

> **set** **renderable**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:640

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

`AbstractText.renderable`

***

### resolution

#### Get Signature

> **get** **resolution**(): `number`

Defined in: node\_modules/pixi.js/lib/scene/text/AbstractText.d.ts:109

##### Returns

`number`

#### Set Signature

> **set** **resolution**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/text/AbstractText.d.ts:108

The resolution / device pixel ratio of the canvas.

##### Default

```ts
1
```

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

`AbstractText.resolution`

***

### rotation

#### Get Signature

> **get** **rotation**(): `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:532

The rotation of the object in radians.
'rotation' and 'angle' have the same effect on a display object; rotation is in radians, angle is in degrees.

##### Returns

`number`

#### Set Signature

> **set** **rotation**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:533

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

`AbstractText.rotation`

***

### roundPixels

#### Get Signature

> **get** **roundPixels**(): `boolean`

Defined in: node\_modules/pixi.js/lib/scene/view/ViewContainer.d.ts:43

Whether or not to round the x/y position of the sprite.

##### Returns

`boolean`

#### Set Signature

> **set** **roundPixels**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/view/ViewContainer.d.ts:44

Whether or not to round the x/y position of the object.

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

`AbstractText.roundPixels`

***

### scale

#### Get Signature

> **get** **scale**(): `ObservablePoint`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:561

The scale factors of this object along the local coordinate axes.

The default scale is (1, 1).

##### Since

4.0.0

##### Returns

`ObservablePoint`

#### Set Signature

> **set** **scale**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:562

##### Parameters

###### value

`number` | `PointData`

##### Returns

`void`

#### Inherited from

`AbstractText.scale`

***

### skew

#### Get Signature

> **get** **skew**(): `ObservablePoint`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:553

The skew factor for the object in radians.

##### Since

4.0.0

##### Returns

`ObservablePoint`

#### Set Signature

> **set** **skew**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:554

##### Parameters

###### value

`PointData`

##### Returns

`void`

#### Inherited from

`AbstractText.skew`

***

### style

#### Get Signature

> **get** **style**(): `TEXT_STYLE`

Defined in: node\_modules/pixi.js/lib/scene/text/AbstractText.d.ts:110

##### Returns

`TEXT_STYLE`

#### Set Signature

> **set** **style**(`style`): `void`

Defined in: node\_modules/pixi.js/lib/scene/text/AbstractText.d.ts:126

Set the style of the text.

Set up an event listener to listen for changes on the style object and mark the text as dirty.

If setting the `style` can also be partial AnyTextStyleOptions.

##### Parameters

###### style

`TEXT_STYLE` | `TEXT_STYLE_OPTIONS` | `Partial`\<`TEXT_STYLE`\>

##### Returns

`void`

#### Inherited from

`AbstractText.style`

***

### text

#### Get Signature

> **get** **text**(): `string`

Defined in: node\_modules/pixi.js/lib/scene/text/AbstractText.d.ts:103

##### Returns

`string`

#### Set Signature

> **set** **text**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/text/AbstractText.d.ts:102

Set the copy for the text object. To split a line you can use '\n'.

##### Parameters

###### value

`TextString`

##### Returns

`void`

#### Inherited from

`AbstractText.text`

***

### tint

#### Get Signature

> **get** **tint**(): `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:624

The tint applied to the sprite. This is a hex value.

A value of 0xFFFFFF will remove any tint effect.

##### Default

```ts
0xFFFFFF
```

##### Returns

`number`

#### Set Signature

> **set** **tint**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:617

##### Parameters

###### value

`ColorSource`

##### Returns

`void`

#### Inherited from

`AbstractText.tint`

***

### visible

#### Get Signature

> **get** **visible**(): `boolean`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:632

The visibility of the object. If false the object will not be drawn, and the transform will not be updated.

##### Returns

`boolean`

#### Set Signature

> **set** **visible**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:633

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

`AbstractText.visible`

***

### width

#### Get Signature

> **get** **width**(): `number`

Defined in: node\_modules/pixi.js/lib/scene/text/AbstractText.d.ts:128

The width of the sprite, setting this will actually modify the scale to achieve the value set.

##### Returns

`number`

#### Set Signature

> **set** **width**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/text/AbstractText.d.ts:129

The width of the Container, setting this will actually modify the scale to achieve the value set.

##### Memberof

scene.Container#

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

`AbstractText.width`

***

### worldTransform

#### Get Signature

> **get** **worldTransform**(): `Matrix`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:509

Current transform of the object based on world (parent) factors.

##### Returns

`Matrix`

#### Inherited from

`AbstractText.worldTransform`

***

### x

#### Get Signature

> **get** **x**(): `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:514

The position of the container on the x axis relative to the local coordinates of the parent.
An alias to position.x

##### Returns

`number`

#### Set Signature

> **set** **x**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:515

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

`AbstractText.x`

***

### y

#### Get Signature

> **get** **y**(): `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:520

The position of the container on the y axis relative to the local coordinates of the parent.
An alias to position.y

##### Returns

`number`

#### Set Signature

> **set** **y**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:521

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

`AbstractText.y`

## Methods

### \_getGlobalBoundsRecursive()

> **\_getGlobalBoundsRecursive**(`factorRenderLayers`, `bounds`, `currentLayer`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/getFastGlobalBoundsMixin.d.ts:30

Recursively calculates the global bounds for the container and its children.
This method is used internally by getFastGlobalBounds to traverse the scene graph.

#### Parameters

##### factorRenderLayers

`boolean`

A flag indicating whether to consider render layers in the calculation.

##### bounds

`Bounds`

The bounds object to update with the calculated values.

##### currentLayer

`IRenderLayer`

The current render layer being processed.

#### Returns

`void`

#### Memberof

scene.Container#

#### Inherited from

`AbstractText._getGlobalBoundsRecursive`

***

### \_getKey()

> **\_getKey**(): `string`

Defined in: node\_modules/pixi.js/lib/scene/text/AbstractText.d.ts:153

#### Returns

`string`

#### Inherited from

`AbstractText._getKey`

***

### \_markStructureAsChanged()

> **\_markStructureAsChanged**(): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.d.ts:25

#### Returns

`void`

#### Inherited from

`AbstractText._markStructureAsChanged`

***

### \_setHeight()

> **\_setHeight**(`height`, `localHeight`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/measureMixin.d.ts:18

#### Parameters

##### height

`number`

##### localHeight

`number`

#### Returns

`void`

#### Inherited from

`AbstractText._setHeight`

***

### \_setWidth()

> **\_setWidth**(`width`, `localWidth`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/measureMixin.d.ts:17

#### Parameters

##### width

`number`

##### localWidth

`number`

#### Returns

`void`

#### Inherited from

`AbstractText._setWidth`

***

### addChild()

> **addChild**\<`U`\>(...`children`): `U`\[`0`\]

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:480

Adds one or more children to the container.

Multiple items can be added like so: `myContainer.addChild(thingOne, thingTwo, thingThree)`

#### Type Parameters

##### U

`U` *extends* (`ContainerChild` \| `IRenderLayer`)[]

#### Parameters

##### children

...`U`

The Container(s) to add to the container

#### Returns

`U`\[`0`\]

- The first child that was added.

#### Inherited from

`AbstractText.addChild`

***

### addChildAt()

> **addChildAt**\<`U`\>(`child`, `index`): `U`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/childrenHelperMixin.d.ts:12

#### Type Parameters

##### U

`U` *extends* `ContainerChild` \| `IRenderLayer`

#### Parameters

##### child

`U`

##### index

`number`

#### Returns

`U`

#### Inherited from

`AbstractText.addChildAt`

***

### addEffect()

> **addEffect**(`effect`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.d.ts:26

#### Parameters

##### effect

`Effect`

#### Returns

`void`

#### Inherited from

`AbstractText.addEffect`

***

### addEventListener()

#### Call Signature

> **addEventListener**\<`K`\>(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:147

##### Type Parameters

###### K

`K` *extends* keyof FederatedEventMap \| keyof GlobalFederatedEventMap

##### Parameters

###### type

`K`

###### listener

(`e`) => `any`

###### options?

`AddListenerOptions`

##### Returns

`void`

##### Inherited from

`AbstractText.addEventListener`

#### Call Signature

> **addEventListener**(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:148

##### Parameters

###### type

`string`

###### listener

`EventListenerOrEventListenerObject`

###### options?

`AddListenerOptions`

##### Returns

`void`

##### Inherited from

`AbstractText.addEventListener`

***

### addListener()

> **addListener**\<`T`\>(`event`, `fn`, `context?`): `this`

Defined in: node\_modules/eventemitter3/index.d.ts:45

#### Type Parameters

##### T

`T` *extends* keyof ContainerEvents\<ContainerChild\> \| keyof AnyEvent

#### Parameters

##### event

`T`

##### fn

(...`args`) => `void`

##### context?

`any`

#### Returns

`this`

#### Inherited from

`AbstractText.addListener`

***

### collectRenderables()

> **collectRenderables**(`instructionSet`, `renderer`, `currentLayer`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/collectRenderablesMixin.d.ts:19

Collects all renderables from the container and its children, adding them to the instruction set.
This method decides whether to use a simple or advanced collection method based on the container's properties.

#### Parameters

##### instructionSet

`InstructionSet`

The set of instructions to which the renderables will be added.

##### renderer

`Renderer`

The renderer responsible for rendering the scene.

##### currentLayer

`IRenderLayer`

The current render layer being processed.

#### Returns

`void`

#### Memberof

scene.Container#

#### Inherited from

`AbstractText.collectRenderables`

***

### collectRenderablesSimple()

> **collectRenderablesSimple**(`instructionSet`, `renderer`, `currentLayer`): `void`

Defined in: node\_modules/pixi.js/lib/scene/view/ViewContainer.d.ts:56

Collects renderables using a simple method, suitable for containers marked as simple.
This method iterates over the container's children and adds their renderables to the instruction set.

#### Parameters

##### instructionSet

`InstructionSet`

The set of instructions to which the renderables will be added.

##### renderer

`Renderer`

The renderer responsible for rendering the scene.

##### currentLayer

`IRenderLayer`

The current render layer being processed.

#### Returns

`void`

#### Memberof

scene.Container#

#### Inherited from

`AbstractText.collectRenderablesSimple`

***

### collectRenderablesWithEffects()

> **collectRenderablesWithEffects**(`instructionSet`, `renderer`, `currentLayer`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/collectRenderablesMixin.d.ts:37

Collects renderables using an advanced method, suitable for containers with complex processing needs.
This method handles additional effects and transformations that may be applied to the renderables.

#### Parameters

##### instructionSet

`InstructionSet`

The set of instructions to which the renderables will be added.

##### renderer

`Renderer`

The renderer responsible for rendering the scene.

##### currentLayer

`IRenderLayer`

The current render layer being processed.

#### Returns

`void`

#### Memberof

scene.Container#

#### Inherited from

`AbstractText.collectRenderablesWithEffects`

***

### containsPoint()

> **containsPoint**(`point`): `boolean`

Defined in: node\_modules/pixi.js/lib/scene/text/AbstractText.d.ts:151

Checks if the text contains the given point.

#### Parameters

##### point

`PointData`

The point to check

#### Returns

`boolean`

#### Inherited from

`AbstractText.containsPoint`

***

### destroy()

> **destroy**(`options?`): `void`

Defined in: node\_modules/pixi.js/lib/scene/text/AbstractText.d.ts:162

Destroys this text renderable and optionally its style texture.

#### Parameters

##### options?

`DestroyOptions`

Options parameter. A boolean will act as if all options
 have been set to that value

#### Returns

`void`

#### Inherited from

`AbstractText.destroy`

***

### disableRenderGroup()

> **disableRenderGroup**(): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:502

This will disable the render group for this container.

#### Returns

`void`

#### Inherited from

`AbstractText.disableRenderGroup`

***

### dispatchEvent()

> **dispatchEvent**(`e`): `boolean`

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:151

#### Parameters

##### e

`FederatedEvent`

#### Returns

`boolean`

#### Inherited from

`AbstractText.dispatchEvent`

***

### emit()

> **emit**\<`T`\>(`event`, ...`args`): `boolean`

Defined in: node\_modules/eventemitter3/index.d.ts:32

Calls each of the listeners registered for a given event.

#### Type Parameters

##### T

`T` *extends* keyof ContainerEvents\<ContainerChild\> \| keyof AnyEvent

#### Parameters

##### event

`T`

##### args

...`ArgumentMap`\<`ContainerEvents`\<`ContainerChild`\> & `AnyEvent`\>\[`Extract`\<`T`, keyof ContainerEvents\<ContainerChild\> \| keyof AnyEvent\>\]

#### Returns

`boolean`

#### Inherited from

`AbstractText.emit`

***

### enableRenderGroup()

> **enableRenderGroup**(): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:500

Calling this enables a render group for this container.
This means it will be rendered as a separate set of instructions.
The transform of the container will also be handled on the GPU rather than the CPU.

#### Returns

`void`

#### Inherited from

`AbstractText.enableRenderGroup`

***

### eventNames()

> **eventNames**(): (keyof ContainerEvents\<ContainerChild\> \| keyof AnyEvent)[]

Defined in: node\_modules/eventemitter3/index.d.ts:15

Return an array listing the events for which the emitter has registered
listeners.

#### Returns

(keyof ContainerEvents\<ContainerChild\> \| keyof AnyEvent)[]

#### Inherited from

`AbstractText.eventNames`

***

### getBounds()

> **getBounds**(`skipUpdate?`, `bounds?`): `Bounds`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/measureMixin.d.ts:14

#### Parameters

##### skipUpdate?

`boolean`

##### bounds?

`Bounds`

#### Returns

`Bounds`

#### Inherited from

`AbstractText.getBounds`

***

### getChildAt()

> **getChildAt**\<`U`\>(`index`): `U`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/childrenHelperMixin.d.ts:9

#### Type Parameters

##### U

`U` *extends* `ContainerChild` \| `IRenderLayer`

#### Parameters

##### index

`number`

#### Returns

`U`

#### Inherited from

`AbstractText.getChildAt`

***

### getChildByLabel()

> **getChildByLabel**(`label`, `deep?`): `null` \| [`Container`](Container.md)\<`ContainerChild`\>

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/findMixin.d.ts:12

#### Parameters

##### label

`string` | `RegExp`

##### deep?

`boolean`

#### Returns

`null` \| [`Container`](Container.md)\<`ContainerChild`\>

#### Inherited from

`AbstractText.getChildByLabel`

***

### getChildByName()

> **getChildByName**(`label`, `deep?`): `null` \| [`Container`](Container.md)\<`ContainerChild`\>

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/findMixin.d.ts:11

#### Parameters

##### label

`string` | `RegExp`

##### deep?

`boolean`

#### Returns

`null` \| [`Container`](Container.md)\<`ContainerChild`\>

#### Inherited from

`AbstractText.getChildByName`

***

### getChildIndex()

> **getChildIndex**(`child`): `number`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/childrenHelperMixin.d.ts:11

#### Parameters

##### child

`ContainerChild` | `IRenderLayer`

#### Returns

`number`

#### Inherited from

`AbstractText.getChildIndex`

***

### getChildrenByLabel()

> **getChildrenByLabel**(`label`, `deep?`, `out?`): [`Container`](Container.md)\<`ContainerChild`\>[]

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/findMixin.d.ts:13

#### Parameters

##### label

`string` | `RegExp`

##### deep?

`boolean`

##### out?

[`Container`](Container.md)\<`ContainerChild`\>[]

#### Returns

[`Container`](Container.md)\<`ContainerChild`\>[]

#### Inherited from

`AbstractText.getChildrenByLabel`

***

### getFastGlobalBounds()

> **getFastGlobalBounds**(`factorRenderLayers?`, `bounds?`): `Bounds`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/getFastGlobalBoundsMixin.d.ts:21

Computes an approximate global bounding box for the container and its children.
This method is optimized for speed by using axis-aligned bounding boxes (AABBs),
and uses the last render results from when it updated the transforms. This function does not update them.
which may result in slightly larger bounds but never smaller than the actual bounds.

for accurate (but less performant) results use `container.getGlobalBounds`

#### Parameters

##### factorRenderLayers?

`boolean`

A flag indicating whether to consider render layers in the calculation.

##### bounds?

`Bounds`

The output bounds object to store the result. If not provided, a new one is created.

#### Returns

`Bounds`

The computed bounds.

#### Memberof

scene.Container#

#### Inherited from

`AbstractText.getFastGlobalBounds`

***

### getGlobalAlpha()

> **getGlobalAlpha**(`skipUpdate`): `number`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/getGlobalMixin.d.ts:5

#### Parameters

##### skipUpdate

`boolean`

#### Returns

`number`

#### Inherited from

`AbstractText.getGlobalAlpha`

***

### getGlobalPosition()

> **getGlobalPosition**(`point?`, `skipUpdate?`): `Point`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/toLocalGlobalMixin.d.ts:5

#### Parameters

##### point?

`Point`

##### skipUpdate?

`boolean`

#### Returns

`Point`

#### Inherited from

`AbstractText.getGlobalPosition`

***

### getGlobalTint()

> **getGlobalTint**(`skipUpdate?`): `number`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/getGlobalMixin.d.ts:7

#### Parameters

##### skipUpdate?

`boolean`

#### Returns

`number`

#### Inherited from

`AbstractText.getGlobalTint`

***

### getGlobalTransform()

> **getGlobalTransform**(`matrix`, `skipUpdate`): `Matrix`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/getGlobalMixin.d.ts:6

#### Parameters

##### matrix

`Matrix`

##### skipUpdate

`boolean`

#### Returns

`Matrix`

#### Inherited from

`AbstractText.getGlobalTransform`

***

### getLocalBounds()

> **getLocalBounds**(`bounds?`): `Bounds`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/measureMixin.d.ts:13

#### Parameters

##### bounds?

`Bounds`

#### Returns

`Bounds`

#### Inherited from

`AbstractText.getLocalBounds`

***

### getSize()

> **getSize**(`out?`): `Size`

Defined in: node\_modules/pixi.js/lib/scene/text/AbstractText.d.ts:139

Retrieves the size of the Text as a [Size]Size object.
This is faster than get the width and height separately.

#### Parameters

##### out?

`Size`

Optional object to store the size in.

#### Returns

`Size`

- The size of the Text.

#### Inherited from

`AbstractText.getSize`

***

### listenerCount()

> **listenerCount**(`event`): `number`

Defined in: node\_modules/eventemitter3/index.d.ts:27

Return the number of listeners listening to a given event.

#### Parameters

##### event

keyof ContainerEvents\<ContainerChild\> | keyof AnyEvent

#### Returns

`number`

#### Inherited from

`AbstractText.listenerCount`

***

### listeners()

> **listeners**\<`T`\>(`event`): (...`args`) => `void`[]

Defined in: node\_modules/eventemitter3/index.d.ts:20

Return the listeners registered for a given event.

#### Type Parameters

##### T

`T` *extends* keyof ContainerEvents\<ContainerChild\> \| keyof AnyEvent

#### Parameters

##### event

`T`

#### Returns

(...`args`) => `void`[]

#### Inherited from

`AbstractText.listeners`

***

### off()

> **off**\<`T`\>(`event`, `fn?`, `context?`, `once?`): `this`

Defined in: node\_modules/eventemitter3/index.d.ts:69

#### Type Parameters

##### T

`T` *extends* keyof ContainerEvents\<ContainerChild\> \| keyof AnyEvent

#### Parameters

##### event

`T`

##### fn?

(...`args`) => `void`

##### context?

`any`

##### once?

`boolean`

#### Returns

`this`

#### Inherited from

`AbstractText.off`

***

### on()

> **on**\<`T`\>(`event`, `fn`, `context?`): `this`

Defined in: node\_modules/eventemitter3/index.d.ts:40

Add a listener for a given event.

#### Type Parameters

##### T

`T` *extends* keyof ContainerEvents\<ContainerChild\> \| keyof AnyEvent

#### Parameters

##### event

`T`

##### fn

(...`args`) => `void`

##### context?

`any`

#### Returns

`this`

#### Inherited from

`AbstractText.on`

***

### once()

> **once**\<`T`\>(`event`, `fn`, `context?`): `this`

Defined in: node\_modules/eventemitter3/index.d.ts:54

Add a one-time listener for a given event.

#### Type Parameters

##### T

`T` *extends* keyof ContainerEvents\<ContainerChild\> \| keyof AnyEvent

#### Parameters

##### event

`T`

##### fn

(...`args`) => `void`

##### context?

`any`

#### Returns

`this`

#### Inherited from

`AbstractText.once`

***

### removeAllListeners()

> **removeAllListeners**(`event?`): `this`

Defined in: node\_modules/eventemitter3/index.d.ts:79

Remove all listeners, or those of the specified event.

#### Parameters

##### event?

keyof ContainerEvents\<ContainerChild\> | keyof AnyEvent

#### Returns

`this`

#### Inherited from

`AbstractText.removeAllListeners`

***

### removeChild()

> **removeChild**\<`U`\>(...`children`): `U`\[`0`\]

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:486

Removes one or more children from the container.

#### Type Parameters

##### U

`U` *extends* (`ContainerChild` \| `IRenderLayer`)[]

#### Parameters

##### children

...`U`

The Container(s) to remove

#### Returns

`U`\[`0`\]

The first child that was removed.

#### Inherited from

`AbstractText.removeChild`

***

### removeChildAt()

> **removeChildAt**\<`U`\>(`index`): `U`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/childrenHelperMixin.d.ts:8

#### Type Parameters

##### U

`U` *extends* `ContainerChild` \| `IRenderLayer`

#### Parameters

##### index

`number`

#### Returns

`U`

#### Inherited from

`AbstractText.removeChildAt`

***

### removeChildren()

> **removeChildren**(`beginIndex?`, `endIndex?`): `ContainerChild`[]

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/childrenHelperMixin.d.ts:7

#### Parameters

##### beginIndex?

`number`

##### endIndex?

`number`

#### Returns

`ContainerChild`[]

#### Inherited from

`AbstractText.removeChildren`

***

### removeEffect()

> **removeEffect**(`effect`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.d.ts:27

#### Parameters

##### effect

`Effect`

#### Returns

`void`

#### Inherited from

`AbstractText.removeEffect`

***

### removeEventListener()

#### Call Signature

> **removeEventListener**\<`K`\>(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:149

##### Type Parameters

###### K

`K` *extends* keyof FederatedEventMap \| keyof GlobalFederatedEventMap

##### Parameters

###### type

`K`

###### listener

(`e`) => `any`

###### options?

`RemoveListenerOptions`

##### Returns

`void`

##### Inherited from

`AbstractText.removeEventListener`

#### Call Signature

> **removeEventListener**(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:150

##### Parameters

###### type

`string`

###### listener

`EventListenerOrEventListenerObject`

###### options?

`RemoveListenerOptions`

##### Returns

`void`

##### Inherited from

`AbstractText.removeEventListener`

***

### removeFromParent()

> **removeFromParent**(): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/childrenHelperMixin.d.ts:14

#### Returns

`void`

#### Inherited from

`AbstractText.removeFromParent`

***

### removeListener()

> **removeListener**\<`T`\>(`event`, `fn?`, `context?`, `once?`): `this`

Defined in: node\_modules/eventemitter3/index.d.ts:63

Remove the listeners of a given event.

#### Type Parameters

##### T

`T` *extends* keyof ContainerEvents\<ContainerChild\> \| keyof AnyEvent

#### Parameters

##### event

`T`

##### fn?

(...`args`) => `void`

##### context?

`any`

##### once?

`boolean`

#### Returns

`this`

#### Inherited from

`AbstractText.removeListener`

***

### reparentChild()

> **reparentChild**\<`U`\>(...`child`): `U`\[`0`\]

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/childrenHelperMixin.d.ts:15

#### Type Parameters

##### U

`U` *extends* `ContainerChild`[]

#### Parameters

##### child

...`U`

#### Returns

`U`\[`0`\]

#### Inherited from

`AbstractText.reparentChild`

***

### reparentChildAt()

> **reparentChildAt**\<`U`\>(`child`, `index`): `U`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/childrenHelperMixin.d.ts:16

#### Type Parameters

##### U

`U` *extends* `ContainerChild`

#### Parameters

##### child

`U`

##### index

`number`

#### Returns

`U`

#### Inherited from

`AbstractText.reparentChildAt`

***

### setChildIndex()

> **setChildIndex**(`child`, `index`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/childrenHelperMixin.d.ts:10

#### Parameters

##### child

`ContainerChild` | `IRenderLayer`

##### index

`number`

#### Returns

`void`

#### Inherited from

`AbstractText.setChildIndex`

***

### setFromMatrix()

> **setFromMatrix**(`matrix`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:611

Updates the local transform using the given matrix.

#### Parameters

##### matrix

`Matrix`

The matrix to use for updating the transform.

#### Returns

`void`

#### Inherited from

`AbstractText.setFromMatrix`

***

### setSize()

> **setSize**(`value`, `height?`): `void`

Defined in: node\_modules/pixi.js/lib/scene/text/AbstractText.d.ts:146

Sets the size of the Text to the specified width and height.
This is faster than setting the width and height separately.

#### Parameters

##### value

This can be either a number or a [Size]Size object.

`number` | `Optional`\<`Size`, `"height"`\>

##### height?

`number`

The height to set. Defaults to the value of `width` if not provided.

#### Returns

`void`

#### Inherited from

`AbstractText.setSize`

***

### swapChildren()

> **swapChildren**\<`U`\>(`child`, `child2`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/childrenHelperMixin.d.ts:13

#### Type Parameters

##### U

`U` *extends* `ContainerChild` \| `IRenderLayer`

#### Parameters

##### child

`U`

##### child2

`U`

#### Returns

`void`

#### Inherited from

`AbstractText.swapChildren`

***

### toGlobal()

> **toGlobal**\<`P`\>(`position`, `point?`, `skipUpdate?`): `P`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/toLocalGlobalMixin.d.ts:6

#### Type Parameters

##### P

`P` *extends* `PointData` = `Point`

#### Parameters

##### position

`PointData`

##### point?

`P`

##### skipUpdate?

`boolean`

#### Returns

`P`

#### Inherited from

`AbstractText.toGlobal`

***

### toLocal()

> **toLocal**\<`P`\>(`position`, `from?`, `point?`, `skipUpdate?`): `P`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/toLocalGlobalMixin.d.ts:7

#### Type Parameters

##### P

`P` *extends* `PointData` = `Point`

#### Parameters

##### position

`PointData`

##### from?

[`Container`](Container.md)\<`ContainerChild`\>

##### point?

`P`

##### skipUpdate?

`boolean`

#### Returns

`P`

#### Inherited from

`AbstractText.toLocal`

***

### updateLocalTransform()

> **updateLocalTransform**(): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:613

Updates the local transform.

#### Returns

`void`

#### Inherited from

`AbstractText.updateLocalTransform`

***

### updateTransform()

> **updateTransform**(`opts`): `this`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:606

Updates the transform properties of the container (accepts partial values).

#### Parameters

##### opts

`Partial`\<`UpdateTransformOptions`\>

The options for updating the transform.

#### Returns

`this`

#### Inherited from

`AbstractText.updateTransform`

***

### ~~mixin()~~

> `static` **mixin**(`source`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:287

Mixes all enumerable properties and methods from a source object to Container.

#### Parameters

##### source

`Dict`\<`any`\>

The source of properties and methods to mix in.

#### Returns

`void`

#### Deprecated

since 8.8.0
