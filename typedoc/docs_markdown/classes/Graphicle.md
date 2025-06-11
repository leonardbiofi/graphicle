[**@graphicle/js**](../README.md)

***

[@graphicle/js](../globals.md) / Graphicle

# Class: Graphicle

Defined in: src/core/graphicle.ts:32

## Constructors

### Constructor

> **new Graphicle**(`initialState?`, `options?`): `Graphicle`

Defined in: src/core/graphicle.ts:42

#### Parameters

##### initialState?

###### edges

[`Edge`](../type-aliases/Edge.md)[]

###### nodes

[`Node`](../type-aliases/Node.md)[]

##### options?

`GraphicleOptions` & [`ConfigCustomNodeAndEdge`](../type-aliases/ConfigCustomNodeAndEdge.md) & `EventHandlersOptions`

#### Returns

`Graphicle`

## Properties

### \_context

> `protected` **\_context**: `null` \| `GraphicleContext`

Defined in: src/core/graphicle.ts:39

***

### eventDispatcher

> `protected` **eventDispatcher**: `EventDispatcher`

Defined in: src/core/graphicle.ts:37

***

### eventHandlers

> `protected` **eventHandlers**: `EventHandlers`

Defined in: src/core/graphicle.ts:38

***

### options

> **options**: `GraphicleOptions` & [`ConfigCustomNodeAndEdge`](../type-aliases/ConfigCustomNodeAndEdge.md) & `EventHandlersOptions`

Defined in: src/core/graphicle.ts:41

***

### renderer

> `protected` **renderer**: `null` \| `GraphicleRenderer`

Defined in: src/core/graphicle.ts:36

***

### store

> **store**: `GraphicleStore`

Defined in: src/core/graphicle.ts:40

## Accessors

### app

#### Get Signature

> **get** **app**(): `null` \| [`Application`](../@graphicle/namespaces/Pixi/classes/Application.md)\<`Renderer`\>

Defined in: src/core/graphicle.ts:163

Getters

##### Returns

`null` \| [`Application`](../@graphicle/namespaces/Pixi/classes/Application.md)\<`Renderer`\>

***

### context

#### Get Signature

> **get** **context**(): `GraphicleContext`

Defined in: src/core/graphicle.ts:166

##### Returns

`GraphicleContext`

## Methods

### injectContext()

> **injectContext**(): `void`

Defined in: src/core/graphicle.ts:140

#### Returns

`void`

***

### mount()

> **mount**(`wrapper`): `Promise`\<`Graphicle`\>

Defined in: src/core/graphicle.ts:58

#### Parameters

##### wrapper

`HTMLElement`

#### Returns

`Promise`\<`Graphicle`\>

***

### registerEvents()

> **registerEvents**(): `void`

Defined in: src/core/graphicle.ts:129

#### Returns

`void`
