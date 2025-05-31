export enum GraphicleEventType {
  NODE_CLICK = "nodeClick",
  NODE_CONTEXTMENU = "nodeContextMenu",
  NODE_POINTERDOWN = "nodePointerDown",
  NODE_POINTERUP = "nodePointerUp",
  NODE_MOUSEDOWN = "nodeMouseDown",
  NODE_DRAG = "nodeDrag",
  NODE_DRAGSTART = "nodeDragStart",
  NODE_DRAGEND = "nodeDragEnd",
  APP_POINTERUP = "appPointerUp",
  VIEWPORT_CLICK = "viewportClick",
}

type Listener<T = any, E = any> = (payload: T, event?: E) => void;

export default class EventDispatcher {
  private listeners: Map<GraphicleEventType, Listener[]> = new Map();

  constructor() {}

  on<T, E>(
    eventType: GraphicleEventType,
    callback: (payload: T, event?: E) => void
  ) {
    const newListener: Listener<T> = callback;

    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }

    this.listeners.get(eventType)!.push(newListener);

    // Sort listeners by priority (lowest = highest priority)
    // this.listeners.get(eventType)!.sort((a, b) => a.priority - b.priority);
  }
  off(eventType: GraphicleEventType, listener: Listener) {
    const eventListeners = this.listeners.get(eventType) || [];
    this.listeners.set(
      eventType,
      eventListeners.filter((l) => l !== listener)
    );
  }
  emit<T, E>(eventType: GraphicleEventType, payload: T, event?: E) {
    // console.debug("EVENT EMITTED:", { eventType, payload, event });
    const eventListeners = this.listeners.get(eventType) || [];
    for (const listener of eventListeners) {
      listener(payload, event);
    }
  }
}
