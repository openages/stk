type KeyMap = Record<string, string | ((v: any) => any)> | string;
interface Options {
    useSession?: boolean;
}
declare const _default: (keys: Array<KeyMap>, instance: any, options?: Options) => import("mobx").Lambda;
export default _default;
