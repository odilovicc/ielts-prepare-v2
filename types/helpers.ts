
export interface IAnyObject {
    [key: string]: any
}
export interface IAsidebarLinks {
    to?: string,
    icon?: string,
    tooltip: string
    materialIcon?: string,
    functionality?: () => void
}
export enum IDeviceType {
    DESKTOP = 'desktop',
    MOBILE = 'mobile',
    TABLET = 'tablet'
}

export interface ITodoBody {
    title?: string,
    description?: string,
    data?: string | number
    done?: boolean
}

export interface IAppDialog {
    open: () => void;
    close: () => void;
    clear: () => void;
}