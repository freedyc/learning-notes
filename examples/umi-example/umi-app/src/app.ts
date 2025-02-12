// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
import duckSvg from './duck.svg';
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '北漂小青年' };
}

export const layout = () => {
  return {
    logo: duckSvg,
    menu: {
      locale: false,
    },
  };
};
