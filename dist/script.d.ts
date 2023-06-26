declare class Global {
    static data: {};
    static interval: number;
    static datahash: string;
    static localStorage: LocalForage;
    constructor();
    static md5: (e: any) => any;
    static watchGlobalData(logging?: boolean): void;
    static log(...params: any[]): void;
    static alert(msg: any): void;
    static success(msg: any): void;
    static error(msg: any): void;
    static confirm(msg?: string, callback?: (n: any) => void, confirmtext?: string, canceltxt?: string): void;
    static isset(v: any, strict?: boolean): boolean;
    static saveData(key: any, value: any, callback?: () => void): void;
    static loadData(key: any, callback: any): void;
    static stringify(obj: any): string;
    static parse(json: any): {};
    static toString(str?: string): string;
    static toInt(n: any): number;
    static toFloat(n: any): number;
    static postData(args?: {
        url: string;
        success: (ret: any) => void;
        error: (error: any) => void;
        callback: (data: any) => void;
    }): false | undefined;
    static loading(message?: string): void;
    static hideLoading(): void;
}
export default Global;
