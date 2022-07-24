declare module 'koa-swig' {
    function render(value: rerender.DefaultSettings): any
    namespace rerender {
        interface DefaultSettings {
            autoescape: boolean;
            root: string;
            cache: string | boolean;
            ext: string;
            writeBody: boolean;
            memory?: string | boolean;
        }
    }
    export default render;
}