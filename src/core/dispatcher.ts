export enum GraphicleEventType {
  NODE_CLICK = "nodeClick",
  NODE_CONTEXTMENU = "nodeContextMenu",
  NODE_POINTERDOWN = "nodePointerDown",
  NODE_MOUSEDOWN = "nodeMouseDown",
}

type Listener<T = any> = (payload: T, event?: MouseEvent) => void;

export default class EventDispatcher {
  private listeners: Map<GraphicleEventType, Listener[]> = new Map();

  constructor() {}

  on<T>(
    eventType: GraphicleEventType,
    callback: (payload: T, event?: MouseEvent) => void
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
  emit<T>(eventType: GraphicleEventType, payload: T, event?: MouseEvent) {
    const eventListeners = this.listeners.get(eventType) || [];
    for (const listener of eventListeners) {
      listener(payload, event);
    }
  }
}
