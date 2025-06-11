[**@graphicle/js**](../../../../README.md)

***

[@graphicle/js](../../../../globals.md) / [Pixi](../README.md) / Container

# Class: Container\<C\>

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:88

Container is a general-purpose display object that holds children. It also adds built-in support for advanced
rendering features like masking and filtering.

It is the base class of all display objects that act as a container for other objects, including Graphics
and Sprite.

<details id="transforms">

<summary>Transforms</summary>

The [transform]scene.Container#transform of a display object describes the projection from its
local coordinate space to its parent's local coordinate space. The following properties are derived
from the transform:

<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>[pivot]scene.Container#pivot</td>
      <td>
        Invariant under rotation, scaling, and skewing. The projection of into the parent's space of the pivot
        is equal to position, regardless of the other three transformations. In other words, It is the center of
        rotation, scaling, and skewing.
      </td>
    </tr>
    <tr>
      <td>[position]scene.Container#position</td>
      <td>
        Translation. This is the position of the [pivot]scene.Container#pivot in the parent's local
        space. The default value of the pivot is the origin (0,0). If the top-left corner of your display object
        is (0,0) in its local space, then the position will be its top-left corner in the parent's local space.
      </td>
    </tr>
    <tr>
      <td>[scale]scene.Container#scale</td>
      <td>
        Scaling. This will stretch (or compress) the display object's projection. The scale factors are along the
        local coordinate axes. In other words, the display object is scaled before rotated or skewed. The center
        of scaling is the [pivot]scene.Container#pivot.
      </td>
    </tr>
    <tr>
      <td>[rotation]scene.Container#rotation</td>
      <td>
         Rotation. This will rotate the display object's projection by this angle (in radians).
      </td>
    </tr>
    <tr>
      <td>[skew]scene.Container#skew</td>
      <td>
        <p>Skewing. This can be used to deform a rectangular display object into a parallelogram.</p>
        <p>
        In PixiJS, skew has a slightly different behaviour than the conventional meaning. It can be
        thought of the net rotation applied to the coordinate axes (separately). For example, if "skew.x" is
        ⍺ and "skew.y" is β, then the line x = 0 will be rotated by ⍺ (y = -x*cot⍺) and the line y = 0 will be
        rotated by β (y = x*tanβ). A line y = x*tanϴ (i.e. a line at angle ϴ to the x-axis in local-space) will
        be rotated by an angle between ⍺ and β.
        </p>
        <p>
        It can be observed that if skew is applied equally to both axes, then it will be equivalent to applying
        a rotation. Indeed, if "skew.x" = -ϴ and "skew.y" = ϴ, it will produce an equivalent of "rotation" = ϴ.
        </p>
        <p>
        Another quite interesting observation is that "skew.x", "skew.y", rotation are commutative operations. Indeed,
        because rotation is essentially a careful combination of the two.
        </p>
      </td>
    </tr>
    <tr>
      <td>[angle]scene.Container#angle</td>
      <td>Rotation. This is an alias for [rotation]scene.Container#rotation, but in degrees.</td>
    </tr>
    <tr>
      <td>[x]scene.Container#x</td>
      <td>Translation. This is an alias for position.x!</td>
    </tr>
    <tr>
      <td>[y]scene.Container#y</td>
      <td>Translation. This is an alias for position.y!</td>
    </tr>
    <tr>
      <td>[width]scene.Container#width</td>
      <td>
        Implemented in [Container]scene.Container. Scaling. The width property calculates scale.x by dividing
        the "requested" width by the local bounding box width. It is indirectly an abstraction over scale.x, and there
        is no concept of user-defined width.
      </td>
    </tr>
    <tr>
      <td>[height]scene.Container#height</td>
      <td>
        Implemented in [Container]scene.Container. Scaling. The height property calculates scale.y by dividing
        the "requested" height by the local bounding box height. It is indirectly an abstraction over scale.y, and there
        is no concept of user-defined height.
      </td>
    </tr>
  </tbody>
</table>
</details>

<details id="alpha">
<summary>Alpha</summary>

This alpha sets a display object's **relative opacity** w.r.t its parent. For example, if the alpha of a display
object is 0.5 and its parent's alpha is 0.5, then it will be rendered with 25% opacity (assuming alpha is not
applied on any ancestor further up the chain).
</details>

<details id="visible">
<summary>Renderable vs Visible</summary>

The `renderable` and `visible` properties can be used to prevent a display object from being rendered to the
screen. However, there is a subtle difference between the two. When using `renderable`, the transforms  of the display
object (and its children subtree) will continue to be calculated. When using `visible`, the transforms will not
be calculated.
```ts
import { BlurFilter, Container, Graphics, Sprite } from 'pixi.js';

const container = new Container();
const sprite = Sprite.from('https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png');

sprite.width = 512;
sprite.height = 512;

// Adds a sprite as a child to this container. As a result, the sprite will be rendered whenever the container
// is rendered.
container.addChild(sprite);

// Blurs whatever is rendered by the container
container.filters = [new BlurFilter()];

// Only the contents within a circle at the center should be rendered onto the screen.
container.mask = new Graphics()
    .beginFill(0xffffff)
    .drawCircle(sprite.width / 2, sprite.height / 2, Math.min(sprite.width, sprite.height) / 2)
    .endFill();
```

</details>

<details id="renderGroup">
<summary>RenderGroup</summary>

In PixiJS v8, containers can be set to operate in 'render group mode',
transforming them into entities akin to a stage in traditional rendering paradigms.
A render group is a root renderable entity, similar to a container,
but it's rendered in a separate pass with its own unique set of rendering instructions.
This approach enhances rendering efficiency and organization, particularly in complex scenes.

You can enable render group mode on any container using container.enableRenderGroup()
or by initializing a new container with the render group property set to true (new Container({isRenderGroup: true})).
 The method you choose depends on your specific use case and setup requirements.

An important aspect of PixiJS’s rendering process is the automatic treatment of rendered scenes as render groups.
This conversion streamlines the rendering process, but understanding when and how this happens is crucial
to fully leverage its benefits.

One of the key advantages of using render groups is the performance efficiency in moving them. Since transformations
 are applied at the GPU level, moving a render group, even one with complex and numerous children,
doesn't require recalculating the rendering instructions or performing transformations on each child.
This makes operations like panning a large game world incredibly efficient.

However, it's crucial to note that render groups do not batch together.
This means that turning every container into a render group could actually slow things down,
as each render group is processed separately. It's best to use render groups judiciously, at a broader level,
rather than on a per-child basis.
This approach ensures you get the performance benefits without overburdening the rendering process.

RenderGroups maintain their own set of rendering instructions,
ensuring that changes or updates within a render group don't affect the rendering
instructions of its parent or other render groups.
 This isolation ensures more stable and predictable rendering behavior.

Additionally, renderGroups can be nested, allowing for powerful options in organizing different aspects of your scene.
This feature is particularly beneficial for separating complex game graphics from UI elements,
enabling intricate and efficient scene management in complex applications.

This means that Containers have 3 levels of matrix to be mindful of:

1. localTransform, this is the transform of the container based on its own properties
2. groupTransform, this it the transform of the container relative to the renderGroup it belongs too
3. worldTransform, this is the transform of the container relative to the Scene being rendered
</details>

## Memberof

scene

## Extends

- `Container`\<`C`\>.`EventEmitter`\<`ContainerEvents`\<`C`\> & `AnyEvent`\>

## Extended by

- [`BaseNode`](../../../../classes/BaseNode.md)

## Type Parameters

### C

`C` *extends* `ContainerChild`

## Constructors

### Constructor

> **new Container**\<`C`\>(`options?`): `Container`\<`C`\>

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:472

#### Parameters

##### options?

`ContainerOptions`\<`C`\>

#### Returns

`Container`\<`C`\>

#### Inherited from

`PixiMixins.Container<C>.constructor`

## Properties

### \_accessibleActive?

> `optional` **\_accessibleActive**: `boolean`

Defined in: node\_modules/pixi.js/lib/accessibility/accessibilityTarget.d.ts:70

#### Inherited from

`PixiMixins.Container._accessibleActive`

***

### \_accessibleDiv?

> `optional` **\_accessibleDiv**: `null` \| `AccessibleHTMLElement`

Defined in: node\_modules/pixi.js/lib/accessibility/accessibilityTarget.d.ts:71

#### Inherited from

`PixiMixins.Container._accessibleDiv`

***

### \_filterEffect?

> `optional` **\_filterEffect**: `FilterEffect`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.d.ts:22

#### Inherited from

`PixiMixins.Container._filterEffect`

***

### \_internalEventMode

> **\_internalEventMode**: `EventMode`

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:144

#### Inherited from

`PixiMixins.Container._internalEventMode`

***

### \_localBoundsCacheData

> **\_localBoundsCacheData**: `LocalBoundsCacheData`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/measureMixin.d.ts:15

#### Inherited from

`PixiMixins.Container._localBoundsCacheData`

***

### \_localBoundsCacheId

> **\_localBoundsCacheId**: `number`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/measureMixin.d.ts:16

#### Inherited from

`PixiMixins.Container._localBoundsCacheId`

***

### \_maskEffect?

> `optional` **\_maskEffect**: `MaskEffect`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.d.ts:20

#### Inherited from

`PixiMixins.Container._maskEffect`

***

### \_maskOptions?

> `optional` **\_maskOptions**: `MaskOptions`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.d.ts:21

#### Inherited from

`PixiMixins.Container._maskOptions`

***

### \_onRender

> **\_onRender**: `null` \| (`renderer`) => `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/onRenderMixin.d.ts:7

#### Inherited from

`PixiMixins.Container._onRender`

***

### \_renderId?

> `optional` **\_renderId**: `number`

Defined in: node\_modules/pixi.js/lib/accessibility/accessibilityTarget.d.ts:72

#### Inherited from

`PixiMixins.Container._renderId`

***

### \_zIndex

> **\_zIndex**: `number`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/sortMixin.d.ts:8

#### Inherited from

`PixiMixins.Container._zIndex`

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

`PixiMixins.Container.accessible`

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

`PixiMixins.Container.accessibleChildren`

***

### accessibleHint?

> `optional` **accessibleHint**: `null` \| `string`

Defined in: node\_modules/pixi.js/lib/accessibility/accessibilityTarget.d.ts:38

Sets the aria-label attribute of the shadow div

#### Inherited from

`PixiMixins.Container.accessibleHint`

***

### accessiblePointerEvents?

> `optional` **accessiblePointerEvents**: `PointerEvents`

Defined in: node\_modules/pixi.js/lib/accessibility/accessibilityTarget.d.ts:57

#### Inherited from

`PixiMixins.Container.accessiblePointerEvents`

***

### accessibleText?

> `optional` **accessibleText**: `null` \| `string`

Defined in: node\_modules/pixi.js/lib/accessibility/accessibilityTarget.d.ts:56

Sets the text content of the shadow div

#### Inherited from

`PixiMixins.Container.accessibleText`

***

### accessibleTitle?

> `optional` **accessibleTitle**: `null` \| `string`

Defined in: node\_modules/pixi.js/lib/accessibility/accessibilityTarget.d.ts:36

Sets the title attribute of the shadow div
If accessibleTitle AND accessibleHint has not been this will default to 'container [tabIndex]'

#### Member

#### Inherited from

`PixiMixins.Container.accessibleTitle`

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

`PixiMixins.Container.accessibleType`

***

### allowChildren

> **allowChildren**: `boolean`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/childrenHelperMixin.d.ts:4

#### Inherited from

`PixiMixins.Container.allowChildren`

***

### boundsArea

> **boundsArea**: `Rectangle`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:446

An optional bounds area for this container. Setting this rectangle will stop the renderer
from recursively measuring the bounds of each children and instead use this single boundArea.
This is great for optimisation! If for example you have a 1000 spinning particles and you know they all sit
within a specific bounds, then setting it will mean the renderer will not need to measure the
1000 children to find the bounds. Instead it will just use the bounds you set.

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

`PixiMixins.Container.cacheAsBitmap`

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

`PixiMixins.Container.cacheAsTexture`

***

### children

> `readonly` **children**: `C`[]

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:308

The array of children of this container.

#### Inherited from

`PixiMixins.Container.children`

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

`PixiMixins.Container.cullable`

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

`PixiMixins.Container.cullableChildren`

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

`PixiMixins.Container.cullArea`

***

### cursor?

> `optional` **cursor**: `string`

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:61

The cursor preferred when the mouse pointer is hovering over.

#### Inherited from

`PixiMixins.Container.cursor`

***

### depthOfChildModified()

> **depthOfChildModified**: () => `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/sortMixin.d.ts:10

#### Returns

`void`

#### Inherited from

`PixiMixins.Container.depthOfChildModified`

***

### destroyed

> **destroyed**: `boolean`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:350

If the object has been destroyed via destroy(). If true, it should not be used.

***

### effects?

> `optional` **effects**: `Effect`[]

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.d.ts:24

#### Inherited from

`PixiMixins.Container.effects`

***

### eventMode?

> `optional` **eventMode**: `EventMode`

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:63

The mode of interaction for this object

#### Inherited from

`PixiMixins.Container.eventMode`

***

### filterArea?

> `optional` **filterArea**: `Rectangle`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.d.ts:23

#### Inherited from

`PixiMixins.Container.filterArea`

***

### filters

> **filters**: `Filter` \| `Filter`[]

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.d.ts:10

#### Inherited from

`PixiMixins.Container.filters`

***

### groupAlpha

> **groupAlpha**: `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:411

***

### groupColor

> **groupColor**: `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:412

***

### groupColorAlpha

> **groupColorAlpha**: `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:413

***

### groupTransform

> `readonly` **groupTransform**: `Matrix`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:347

The group transform is a transform relative to the render group it belongs too.
If this container is render group then this will be an identity matrix. other wise it
will be the same as the relativeGroupTransform.
Use this value when actually rendering things to the screen

***

### hitArea?

> `optional` **hitArea**: `null` \| `IHitArea`

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:69

The hit-area specifies the area for which pointer events should be captured by this event target.

#### Inherited from

`PixiMixins.Container.hitArea`

***

### interactive?

> `optional` **interactive**: `boolean`

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:65

Whether this event target should fire UI events.

#### Inherited from

`PixiMixins.Container.interactive`

***

### interactiveChildren?

> `optional` **interactiveChildren**: `boolean`

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:67

Whether this event target has any children that need UI events. This can be used optimize event propagation.

#### Inherited from

`PixiMixins.Container.interactiveChildren`

***

### isCachedAsTexture

> `readonly` **isCachedAsTexture**: `boolean`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/cacheAsTextureMixin.d.ts:33

Whether this container is currently cached as a texture.

#### Memberof

scene.Container#

#### Inherited from

`PixiMixins.Container.isCachedAsTexture`

***

### isInteractive()

> **isInteractive**: () => `boolean`

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:146

Returns true if the Container has interactive 'static' or 'dynamic'

#### Returns

`boolean`

#### Inherited from

`PixiMixins.Container.isInteractive`

***

### label

> **label**: `string`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/findMixin.d.ts:3

#### Inherited from

`PixiMixins.Container.label`

***

### layerParentId

> **layerParentId**: `string`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:459

***

### localAlpha

> **localAlpha**: `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:410

***

### localColor

> **localColor**: `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:409

***

### localTransform

> `readonly` **localTransform**: `Matrix`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:332

Current transform of the object based on local factors: position, scale, other stuff.

***

### mask

> **mask**: `Mask`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.d.ts:8

#### Inherited from

`PixiMixins.Container.mask`

***

### ~~name~~

> **name**: `string`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/findMixin.d.ts:10

#### Deprecated

since 8.0.0

#### See

Container#label

#### Inherited from

`PixiMixins.Container.name`

***

### onclick?

> `optional` **onclick**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:71

Handler for 'click' event

#### Inherited from

`PixiMixins.Container.onclick`

***

### onglobalmousemove?

> `optional` **onglobalmousemove**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:81

Handler for 'globalmousemove' event

#### Inherited from

`PixiMixins.Container.onglobalmousemove`

***

### onglobalpointermove?

> `optional` **onglobalpointermove**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:101

Handler for 'globalpointermove' event

#### Inherited from

`PixiMixins.Container.onglobalpointermove`

***

### onglobaltouchmove?

> `optional` **onglobaltouchmove**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:131

Handler for 'globaltouchmove' event

#### Inherited from

`PixiMixins.Container.onglobaltouchmove`

***

### onmousedown?

> `optional` **onmousedown**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:73

Handler for 'mousedown' event

#### Inherited from

`PixiMixins.Container.onmousedown`

***

### onmouseenter?

> `optional` **onmouseenter**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:75

Handler for 'mouseenter' event

#### Inherited from

`PixiMixins.Container.onmouseenter`

***

### onmouseleave?

> `optional` **onmouseleave**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:77

Handler for 'mouseleave' event

#### Inherited from

`PixiMixins.Container.onmouseleave`

***

### onmousemove?

> `optional` **onmousemove**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:79

Handler for 'mousemove' event

#### Inherited from

`PixiMixins.Container.onmousemove`

***

### onmouseout?

> `optional` **onmouseout**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:83

Handler for 'mouseout' event

#### Inherited from

`PixiMixins.Container.onmouseout`

***

### onmouseover?

> `optional` **onmouseover**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:85

Handler for 'mouseover' event

#### Inherited from

`PixiMixins.Container.onmouseover`

***

### onmouseup?

> `optional` **onmouseup**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:87

Handler for 'mouseup' event

#### Inherited from

`PixiMixins.Container.onmouseup`

***

### onmouseupoutside?

> `optional` **onmouseupoutside**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:89

Handler for 'mouseupoutside' event

#### Inherited from

`PixiMixins.Container.onmouseupoutside`

***

### onpointercancel?

> `optional` **onpointercancel**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:91

Handler for 'pointercancel' event

#### Inherited from

`PixiMixins.Container.onpointercancel`

***

### onpointerdown?

> `optional` **onpointerdown**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:93

Handler for 'pointerdown' event

#### Inherited from

`PixiMixins.Container.onpointerdown`

***

### onpointerenter?

> `optional` **onpointerenter**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:95

Handler for 'pointerenter' event

#### Inherited from

`PixiMixins.Container.onpointerenter`

***

### onpointerleave?

> `optional` **onpointerleave**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:97

Handler for 'pointerleave' event

#### Inherited from

`PixiMixins.Container.onpointerleave`

***

### onpointermove?

> `optional` **onpointermove**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:99

Handler for 'pointermove' event

#### Inherited from

`PixiMixins.Container.onpointermove`

***

### onpointerout?

> `optional` **onpointerout**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:103

Handler for 'pointerout' event

#### Inherited from

`PixiMixins.Container.onpointerout`

***

### onpointerover?

> `optional` **onpointerover**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:105

Handler for 'pointerover' event

#### Inherited from

`PixiMixins.Container.onpointerover`

***

### onpointertap?

> `optional` **onpointertap**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:107

Handler for 'pointertap' event

#### Inherited from

`PixiMixins.Container.onpointertap`

***

### onpointerup?

> `optional` **onpointerup**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:109

Handler for 'pointerup' event

#### Inherited from

`PixiMixins.Container.onpointerup`

***

### onpointerupoutside?

> `optional` **onpointerupoutside**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:111

Handler for 'pointerupoutside' event

#### Inherited from

`PixiMixins.Container.onpointerupoutside`

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

`PixiMixins.Container.onRender`

***

### onrightclick?

> `optional` **onrightclick**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:113

Handler for 'rightclick' event

#### Inherited from

`PixiMixins.Container.onrightclick`

***

### onrightdown?

> `optional` **onrightdown**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:115

Handler for 'rightdown' event

#### Inherited from

`PixiMixins.Container.onrightdown`

***

### onrightup?

> `optional` **onrightup**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:117

Handler for 'rightup' event

#### Inherited from

`PixiMixins.Container.onrightup`

***

### onrightupoutside?

> `optional` **onrightupoutside**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:119

Handler for 'rightupoutside' event

#### Inherited from

`PixiMixins.Container.onrightupoutside`

***

### ontap?

> `optional` **ontap**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:121

Handler for 'tap' event

#### Inherited from

`PixiMixins.Container.ontap`

***

### ontouchcancel?

> `optional` **ontouchcancel**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:123

Handler for 'touchcancel' event

#### Inherited from

`PixiMixins.Container.ontouchcancel`

***

### ontouchend?

> `optional` **ontouchend**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:125

Handler for 'touchend' event

#### Inherited from

`PixiMixins.Container.ontouchend`

***

### ontouchendoutside?

> `optional` **ontouchendoutside**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:127

Handler for 'touchendoutside' event

#### Inherited from

`PixiMixins.Container.ontouchendoutside`

***

### ontouchmove?

> `optional` **ontouchmove**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:129

Handler for 'touchmove' event

#### Inherited from

`PixiMixins.Container.ontouchmove`

***

### ontouchstart?

> `optional` **ontouchstart**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:133

Handler for 'touchstart' event

#### Inherited from

`PixiMixins.Container.ontouchstart`

***

### onwheel?

> `optional` **onwheel**: `null` \| `FederatedEventHandler`\<`FederatedWheelEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:135

Handler for 'wheel' event

#### Inherited from

`PixiMixins.Container.onwheel`

***

### parent

> **parent**: `Container`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:310

The display object container that contains this display object.

#### Inherited from

`PixiMixins.Container.parent`

***

### parentRenderLayer

> `readonly` **parentRenderLayer**: `IRenderLayer`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:322

The RenderLayer this container belongs to, if any.
If it belongs to a RenderLayer, it will be rendered from the RenderLayer's position in the scene.

***

### relativeGroupTransform

> `readonly` **relativeGroupTransform**: `Matrix`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:339

The relative group transform is a transform relative to the render group it belongs too. It will include all parent
transforms and up to the render group (think of it as kind of like a stage - but the stage can be nested).
If this container is is self a render group matrix will be relative to its parent render group

***

### renderPipeId

> `readonly` **renderPipeId**: `string`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:438

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

`PixiMixins.Container.setMask`

***

### sortableChildren

> **sortableChildren**: `boolean`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/sortMixin.d.ts:5

#### Inherited from

`PixiMixins.Container.sortableChildren`

***

### sortChildren()

> **sortChildren**: () => `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/sortMixin.d.ts:9

#### Returns

`void`

#### Inherited from

`PixiMixins.Container.sortChildren`

***

### sortDirty

> **sortDirty**: `boolean`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/sortMixin.d.ts:4

#### Inherited from

`PixiMixins.Container.sortDirty`

***

### tabIndex?

> `optional` **tabIndex**: `number`

Defined in: node\_modules/pixi.js/lib/accessibility/accessibilityTarget.d.ts:42

#### Default

```ts
0
```

#### Inherited from

`PixiMixins.Container.tabIndex`

***

### uid

> `readonly` **uid**: `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:289

unique id for this container

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

`PixiMixins.Container.updateCacheTexture`

***

### zIndex

> **zIndex**: `number`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/sortMixin.d.ts:3

#### Inherited from

`PixiMixins.Container.zIndex`

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

***

### height

#### Get Signature

> **get** **height**(): `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:573

The height of the Container, setting this will actually modify the scale to achieve the value set.

##### Memberof

scene.Container#

##### Returns

`number`

#### Set Signature

> **set** **height**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:574

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

`PixiMixins.Container.height`

***

### isRenderable

#### Get Signature

> **get** **isRenderable**(): `boolean`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:642

Whether or not the object should be rendered.

##### Returns

`boolean`

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

***

### width

#### Get Signature

> **get** **width**(): `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:567

The width of the Container, setting this will actually modify the scale to achieve the value set.

##### Memberof

scene.Container#

##### Returns

`number`

#### Set Signature

> **set** **width**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:568

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

`PixiMixins.Container.width`

***

### worldTransform

#### Get Signature

> **get** **worldTransform**(): `Matrix`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:509

Current transform of the object based on world (parent) factors.

##### Returns

`Matrix`

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

`PixiMixins.Container._getGlobalBoundsRecursive`

***

### \_markStructureAsChanged()

> **\_markStructureAsChanged**(): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.d.ts:25

#### Returns

`void`

#### Inherited from

`PixiMixins.Container._markStructureAsChanged`

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

`PixiMixins.Container._setHeight`

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

`PixiMixins.Container._setWidth`

***

### addChild()

> **addChild**\<`U`\>(...`children`): `U`\[`0`\]

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:480

Adds one or more children to the container.

Multiple items can be added like so: `myContainer.addChild(thingOne, thingTwo, thingThree)`

#### Type Parameters

##### U

`U` *extends* (`C` \| `IRenderLayer`)[]

#### Parameters

##### children

...`U`

The Container(s) to add to the container

#### Returns

`U`\[`0`\]

- The first child that was added.

#### Inherited from

`PixiMixins.Container.addChild`

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

`PixiMixins.Container.addChildAt`

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

`PixiMixins.Container.addEffect`

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

`PixiMixins.Container.addEventListener`

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

`PixiMixins.Container.addEventListener`

***

### addListener()

> **addListener**\<`T`\>(`event`, `fn`, `context?`): `this`

Defined in: node\_modules/eventemitter3/index.d.ts:45

#### Type Parameters

##### T

`T` *extends* keyof AnyEvent \| keyof ContainerEvents\<C\>

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

`EventEmitter.addListener`

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

`PixiMixins.Container.collectRenderables`

***

### collectRenderablesSimple()

> **collectRenderablesSimple**(`instructionSet`, `renderer`, `currentLayer`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/collectRenderablesMixin.d.ts:28

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

`PixiMixins.Container.collectRenderablesSimple`

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

`PixiMixins.Container.collectRenderablesWithEffects`

***

### destroy()

> **destroy**(`options?`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:657

Removes all internal references and listeners as well as removes children from the display list.
Do not use a Container after calling `destroy`.

#### Parameters

##### options?

`DestroyOptions`

Options parameter. A boolean will act as if all options
 have been set to that value

#### Returns

`void`

***

### disableRenderGroup()

> **disableRenderGroup**(): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:502

This will disable the render group for this container.

#### Returns

`void`

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

`PixiMixins.Container.dispatchEvent`

***

### emit()

> **emit**\<`T`\>(`event`, ...`args`): `boolean`

Defined in: node\_modules/eventemitter3/index.d.ts:32

Calls each of the listeners registered for a given event.

#### Type Parameters

##### T

`T` *extends* keyof AnyEvent \| keyof ContainerEvents\<C\>

#### Parameters

##### event

`T`

##### args

...`ArgumentMap`\<`ContainerEvents`\<`C`\> & `AnyEvent`\>\[`Extract`\<`T`, keyof AnyEvent \| keyof ContainerEvents\<C\>\>\]

#### Returns

`boolean`

#### Inherited from

`EventEmitter.emit`

***

### enableRenderGroup()

> **enableRenderGroup**(): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:500

Calling this enables a render group for this container.
This means it will be rendered as a separate set of instructions.
The transform of the container will also be handled on the GPU rather than the CPU.

#### Returns

`void`

***

### eventNames()

> **eventNames**(): (keyof AnyEvent \| keyof ContainerEvents\<C\>)[]

Defined in: node\_modules/eventemitter3/index.d.ts:15

Return an array listing the events for which the emitter has registered
listeners.

#### Returns

(keyof AnyEvent \| keyof ContainerEvents\<C\>)[]

#### Inherited from

`EventEmitter.eventNames`

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

`PixiMixins.Container.getBounds`

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

`PixiMixins.Container.getChildAt`

***

### getChildByLabel()

> **getChildByLabel**(`label`, `deep?`): `null` \| `Container`\<`ContainerChild`\>

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/findMixin.d.ts:12

#### Parameters

##### label

`string` | `RegExp`

##### deep?

`boolean`

#### Returns

`null` \| `Container`\<`ContainerChild`\>

#### Inherited from

`PixiMixins.Container.getChildByLabel`

***

### getChildByName()

> **getChildByName**(`label`, `deep?`): `null` \| `Container`\<`ContainerChild`\>

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/findMixin.d.ts:11

#### Parameters

##### label

`string` | `RegExp`

##### deep?

`boolean`

#### Returns

`null` \| `Container`\<`ContainerChild`\>

#### Inherited from

`PixiMixins.Container.getChildByName`

***

### getChildIndex()

> **getChildIndex**(`child`): `number`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/childrenHelperMixin.d.ts:11

#### Parameters

##### child

`C` | `IRenderLayer`

#### Returns

`number`

#### Inherited from

`PixiMixins.Container.getChildIndex`

***

### getChildrenByLabel()

> **getChildrenByLabel**(`label`, `deep?`, `out?`): `Container`\<`ContainerChild`\>[]

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/findMixin.d.ts:13

#### Parameters

##### label

`string` | `RegExp`

##### deep?

`boolean`

##### out?

`Container`\<`ContainerChild`\>[]

#### Returns

`Container`\<`ContainerChild`\>[]

#### Inherited from

`PixiMixins.Container.getChildrenByLabel`

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

`PixiMixins.Container.getFastGlobalBounds`

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

`PixiMixins.Container.getGlobalAlpha`

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

`PixiMixins.Container.getGlobalPosition`

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

`PixiMixins.Container.getGlobalTint`

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

`PixiMixins.Container.getGlobalTransform`

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

`PixiMixins.Container.getLocalBounds`

***

### getSize()

> **getSize**(`out?`): `Size`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:582

Retrieves the size of the container as a [Size]Size object.
This is faster than get the width and height separately.

#### Parameters

##### out?

`Size`

Optional object to store the size in.

#### Returns

`Size`

- The size of the container.

#### Memberof

scene.Container#

#### Inherited from

`PixiMixins.Container.getSize`

***

### listenerCount()

> **listenerCount**(`event`): `number`

Defined in: node\_modules/eventemitter3/index.d.ts:27

Return the number of listeners listening to a given event.

#### Parameters

##### event

keyof AnyEvent | keyof ContainerEvents\<C\>

#### Returns

`number`

#### Inherited from

`EventEmitter.listenerCount`

***

### listeners()

> **listeners**\<`T`\>(`event`): (...`args`) => `void`[]

Defined in: node\_modules/eventemitter3/index.d.ts:20

Return the listeners registered for a given event.

#### Type Parameters

##### T

`T` *extends* keyof AnyEvent \| keyof ContainerEvents\<C\>

#### Parameters

##### event

`T`

#### Returns

(...`args`) => `void`[]

#### Inherited from

`EventEmitter.listeners`

***

### off()

> **off**\<`T`\>(`event`, `fn?`, `context?`, `once?`): `this`

Defined in: node\_modules/eventemitter3/index.d.ts:69

#### Type Parameters

##### T

`T` *extends* keyof AnyEvent \| keyof ContainerEvents\<C\>

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

`EventEmitter.off`

***

### on()

> **on**\<`T`\>(`event`, `fn`, `context?`): `this`

Defined in: node\_modules/eventemitter3/index.d.ts:40

Add a listener for a given event.

#### Type Parameters

##### T

`T` *extends* keyof AnyEvent \| keyof ContainerEvents\<C\>

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

`EventEmitter.on`

***

### once()

> **once**\<`T`\>(`event`, `fn`, `context?`): `this`

Defined in: node\_modules/eventemitter3/index.d.ts:54

Add a one-time listener for a given event.

#### Type Parameters

##### T

`T` *extends* keyof AnyEvent \| keyof ContainerEvents\<C\>

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

`EventEmitter.once`

***

### removeAllListeners()

> **removeAllListeners**(`event?`): `this`

Defined in: node\_modules/eventemitter3/index.d.ts:79

Remove all listeners, or those of the specified event.

#### Parameters

##### event?

keyof AnyEvent | keyof ContainerEvents\<C\>

#### Returns

`this`

#### Inherited from

`EventEmitter.removeAllListeners`

***

### removeChild()

> **removeChild**\<`U`\>(...`children`): `U`\[`0`\]

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:486

Removes one or more children from the container.

#### Type Parameters

##### U

`U` *extends* (`C` \| `IRenderLayer`)[]

#### Parameters

##### children

...`U`

The Container(s) to remove

#### Returns

`U`\[`0`\]

The first child that was removed.

#### Inherited from

`PixiMixins.Container.removeChild`

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

`PixiMixins.Container.removeChildAt`

***

### removeChildren()

> **removeChildren**(`beginIndex?`, `endIndex?`): `C`[]

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/childrenHelperMixin.d.ts:7

#### Parameters

##### beginIndex?

`number`

##### endIndex?

`number`

#### Returns

`C`[]

#### Inherited from

`PixiMixins.Container.removeChildren`

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

`PixiMixins.Container.removeEffect`

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

`PixiMixins.Container.removeEventListener`

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

`PixiMixins.Container.removeEventListener`

***

### removeFromParent()

> **removeFromParent**(): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/childrenHelperMixin.d.ts:14

#### Returns

`void`

#### Inherited from

`PixiMixins.Container.removeFromParent`

***

### removeListener()

> **removeListener**\<`T`\>(`event`, `fn?`, `context?`, `once?`): `this`

Defined in: node\_modules/eventemitter3/index.d.ts:63

Remove the listeners of a given event.

#### Type Parameters

##### T

`T` *extends* keyof AnyEvent \| keyof ContainerEvents\<C\>

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

`EventEmitter.removeListener`

***

### reparentChild()

> **reparentChild**\<`U`\>(...`child`): `U`\[`0`\]

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/childrenHelperMixin.d.ts:15

#### Type Parameters

##### U

`U` *extends* `C`[]

#### Parameters

##### child

...`U`

#### Returns

`U`\[`0`\]

#### Inherited from

`PixiMixins.Container.reparentChild`

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

`PixiMixins.Container.reparentChildAt`

***

### setChildIndex()

> **setChildIndex**(`child`, `index`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/childrenHelperMixin.d.ts:10

#### Parameters

##### child

`C` | `IRenderLayer`

##### index

`number`

#### Returns

`void`

#### Inherited from

`PixiMixins.Container.setChildIndex`

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

***

### setSize()

> **setSize**(`value`, `height?`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:590

Sets the size of the container to the specified width and height.
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

#### Memberof

scene.Container#

#### Inherited from

`PixiMixins.Container.setSize`

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

`PixiMixins.Container.swapChildren`

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

`PixiMixins.Container.toGlobal`

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

`Container`\<`ContainerChild`\>

##### point?

`P`

##### skipUpdate?

`boolean`

#### Returns

`P`

#### Inherited from

`PixiMixins.Container.toLocal`

***

### updateLocalTransform()

> **updateLocalTransform**(): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:613

Updates the local transform.

#### Returns

`void`

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
