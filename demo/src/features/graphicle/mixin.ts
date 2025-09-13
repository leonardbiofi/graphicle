import { ObservableStyle } from "./observableStyle";
type Constructor<T = {}, Args extends any[] = any[]> = new (...args: Args) => T;

export function ReactiveStyleMixin<
  TBase extends Constructor<any, any[]>,
  TStyle extends object
>(
  Base: TBase,
  styleStore: ObservableStyle<TStyle>
): new (...args: ConstructorParameters<TBase>) => InstanceType<TBase> & {
  styleStore: ObservableStyle<TStyle>;
} {
  return class extends Base {
    public readonly styleStore;
    private unsubscribe: () => void;

    constructor(...args: any[]) {
      super(...args);
      this.styleStore = styleStore;
      this.unsubscribe = this.styleStore.subscribe(() => {
        if (typeof (this as any).render === "function") {
          (this as any).render();
        }
      });

      if (typeof (this as any).render === "function") {
        (this as any).render();
      }
      this.initGraphics();
      this.render();
    }

    destroy(options?: any) {
      this.unsubscribe?.();
      super.destroy?.(options);
    }
  };
}
