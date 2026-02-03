import { useState, useCallback, useEffect, useRef } from 'react'
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'
import './App.css'
import worldMapData from './world-zh.json'
import worldTemplateCsvUrl from './world-template.csv?url'

interface RegionData {
  name: string
  value: number
}

interface RangeConfig {
  level5: number
  level4: number // 200-300
  level3: number // 100-200
  level2: number // 50-100
  level1: number // 30-50
  level0: number // 9-30 上界
  levelMinus1: number // 0万以下 上界(1)
  levelMinus2: number // 1-8 下界
  levelMinus3: number // 1-8 上界
  levelMinus4: number // 9-30 下界
  color5: string
  color4: string
  color3: string
  color2: string
  color1: string
  color0: string // 30-50颜色
  colorMinus1: string
  colorMinus2: string
  colorMinus3: string
}
const colorList1 = {
  color5: '#FEE2E2',
  color4: '#FFEDD5',
  color3: '#FEF9C3',
  color2: '#DCFCE7',
  colorMinus1: '#F0F6FF',
  colorMinus2: '#6FA3FF',
  colorMinus3: '#3F82FF',
  color0: '#005DE9',
  color1: '#2563EB',
}

const colorList2 = {
  color5: '#F3E8FF',
  color4: '#E0F2FE',
  color3: '#FFF3C4',
  color2: '#E6F4F1',
  color1: '#EEF2F7',
  color0: '#F1E7E3',
  colorMinus1: '#F3F4F6',
  colorMinus2: '#F1E7E3',
  colorMinus3: '#E5E7EB'
};

const colorList3 = {
  colorMinus1: '#F0F6FF',
  colorMinus2: '#6FA3FF',
  colorMinus3: '#3F82FF',
  color0: '#005DE9',
  color1: '#2563EB',
};

// 世界地图：常用简称/俗称 → world-zh.json 中的 properties.name（标准中文名）
const worldRegionNameMap: Record<string, string> = {
  沙特: '沙特阿拉伯',
  塔吉克: '塔吉克斯坦',
  印尼: '印度尼西亚',
  所罗门: '所罗门群岛',
  孟加拉: '孟加拉国',
  刚果: '刚果（金）', // 地图有刚果（布）/刚果（金），数据中“刚果”常指刚果（金）
}

const getStandardRegionName = (name: string): string => {
  const trimmed = name.trim()
  return worldRegionNameMap[trimmed] ?? trimmed
}

// 从地图 GeoJSON 获取所有国家名称（用于合并展示全量数据）
const getAllMapCountryNames = (): string[] => {
  const geo = worldMapData as { features?: { properties?: { name?: string } }[] }
  if (!geo?.features?.length) return []
  return geo.features.map(f => f.properties?.name ?? '').filter(Boolean)
}

// localStorage 键名（带 world-map 前缀，与中国地图的 map-visualization-* 区分）
const STORAGE_KEYS = {
  MAP_DATA: 'world-map-visualization-data',
  RANGE_CONFIG: 'world-map-visualization-config',
  SHOW_LABELS: 'world-map-visualization-show-labels'
}

// 默认配置
const defaultRangeConfig: RangeConfig = {
  level5: 300,
  level4: 200,
  level3: 100,
  level2: 50,
  level1: 30,
  level0: 30,      // 9-30万 上界
  levelMinus1: 1,  // 0万以下 上界
  levelMinus2: 1,  // 1-8万 下界
  levelMinus3: 8,  // 1-8万 上界
  levelMinus4: 9,  // 9-30万 下界
  color5: '#F97316',
  color4: '#EAB308',
  color3: '#22C55E',
  color2: '#0EA5A4',
  colorMinus1: '#F0F6FF',
  colorMinus2: '#6FA3FF',
  colorMinus3: '#3F82FF',
  color0: '#005DE9',
  color1: '#2563EB',
}

function App() {
  const [mapData, setMapData] = useState<RegionData[]>([])
  const [error, setError] = useState<string>('')
  const [mapLoaded, setMapLoaded] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [showConfig, setShowConfig] = useState<boolean>(false)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const [showLabels, setShowLabels] = useState<boolean>(false)
  const [rangeConfig, setRangeConfig] = useState<RangeConfig>(defaultRangeConfig)
  const chartRef = useRef<ReactECharts>(null)
  const chartWrapperRef = useRef<HTMLDivElement>(null)
  // 导出尺寸，默认 4K
  const [exportWidth, setExportWidth] = useState(3840)
  const [exportHeight, setExportHeight] = useState(2160)

  // 保存数据到 localStorage
  const saveMapDataToStorage = useCallback((data: RegionData[]) => {
    try {
      localStorage.setItem(STORAGE_KEYS.MAP_DATA, JSON.stringify(data))
    } catch (err) {
      console.error('保存数据到 localStorage 失败:', err)
    }
  }, [])

  // 保存配置到 localStorage
  const saveConfigToStorage = useCallback((config: RangeConfig) => {
    try {
      localStorage.setItem(STORAGE_KEYS.RANGE_CONFIG, JSON.stringify(config))
    } catch (err) {
      console.error('保存配置到 localStorage 失败:', err)
    }
  }, [])

  // 从 localStorage 加载数据
  useEffect(() => {
    try {
      // 加载地图数据
      const savedData = localStorage.getItem(STORAGE_KEYS.MAP_DATA)
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          setMapData(parsedData)
        }
      }

      // 加载配置（与默认合并，避免旧数据缺字段导致输入框空白）
      const savedConfig = localStorage.getItem(STORAGE_KEYS.RANGE_CONFIG)
      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig)
        setRangeConfig({ ...defaultRangeConfig, ...parsedConfig })
      }

      // 加载标签显示配置
      const savedShowLabels = localStorage.getItem(STORAGE_KEYS.SHOW_LABELS)
      if (savedShowLabels !== null) {
        setShowLabels(savedShowLabels === 'true')
      }
    } catch (err) {
      console.error('从 localStorage 加载数据失败:', err)
    }
  }, [])

  // 当 mapData 改变时保存到 localStorage
  useEffect(() => {
    if (mapData.length > 0) {
      saveMapDataToStorage(mapData)
    }
  }, [mapData, saveMapDataToStorage])

  // 当 rangeConfig 改变时保存到 localStorage
  useEffect(() => {
    saveConfigToStorage(rangeConfig)
  }, [rangeConfig, saveConfigToStorage])

  // 清空地图数据
  const clearMapData = useCallback(() => {
    if (window.confirm('确定要清空所有上传的数据吗？')) {
      setMapData([])
      localStorage.removeItem(STORAGE_KEYS.MAP_DATA)
    }
  }, [])

  // 下载世界地图模板（包含所有国家）
  const downloadWorldTemplate = useCallback(async () => {
    try {
      const response = await fetch(worldTemplateCsvUrl)
      if (!response.ok) {
        throw new Error('世界地图模板加载失败')
      }
      const csvContent = await response.text()
      const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', 'world-template.csv')
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('下载世界地图模板失败:', err)
      setError('下载世界地图模板失败，请稍后重试')
    }
  }, [])

  // 下载地图为 PNG：在指定尺寸下渲染后导出（默认 4K，可配置）
  const downloadMapPng = useCallback(async () => {
    const chart = chartRef.current?.getEchartsInstance()
    const wrapper = chartWrapperRef.current
    if (!chart || !wrapper) {
      setError('图表未就绪，请稍后再试')
      return
    }
    if (mapData.length === 0) {
      setError('请先上传数据后再下载')
      return
    }
    const w = Math.max(100, Math.min(8192, exportWidth))
    const h = Math.max(100, Math.min(8192, exportHeight))
    const oldWidth = wrapper.style.width
    const oldHeight = wrapper.style.height
    const oldPosition = wrapper.style.position
    const oldLeft = wrapper.style.left
    const oldZIndex = wrapper.style.zIndex
    try {
      // 临时移出视口并固定尺寸，确保按目标分辨率渲染
      wrapper.style.position = 'fixed'
      wrapper.style.left = '-9999px'
      wrapper.style.top = '0'
      wrapper.style.width = `${w}px`
      wrapper.style.height = `${h}px`
      wrapper.style.zIndex = '-1'
      chart.resize()
      await new Promise(resolve => setTimeout(resolve, 200))
      const url = chart.getDataURL({ type: 'png', pixelRatio: 1 })
      const link = document.createElement('a')
      link.setAttribute('href', url)
      link.setAttribute('download', `世界地图_${w}x${h}_${new Date().toISOString().slice(0, 10)}.png`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setError('')
    } catch (err) {
      console.error('下载地图 PNG 失败:', err)
      setError('下载失败，请稍后重试')
    } finally {
      wrapper.style.position = oldPosition
      wrapper.style.left = oldLeft
      wrapper.style.zIndex = oldZIndex
      wrapper.style.width = oldWidth
      wrapper.style.height = oldHeight
      chart.resize()
    }
  }, [mapData.length, exportWidth, exportHeight])

  // 重置配置为默认值
  const resetConfig = useCallback(() => {
    if (window.confirm('确定要重置颜色配置为默认值吗？')) {
      setRangeConfig(defaultRangeConfig)
      localStorage.removeItem(STORAGE_KEYS.RANGE_CONFIG)
    }
  }, [])

  // 全屏功能
  const toggleFullscreen = useCallback(() => {
    const mapContainer = document.querySelector('.map-container') as HTMLElement
    if (!mapContainer) return

    if (!isFullscreen) {
      // 进入全屏
      if (mapContainer.requestFullscreen) {
        mapContainer.requestFullscreen()
      } else if ('webkitRequestFullscreen' in mapContainer) {
        (mapContainer as HTMLElement & { webkitRequestFullscreen: () => void }).webkitRequestFullscreen()
      } else if ('mozRequestFullScreen' in mapContainer) {
        (mapContainer as HTMLElement & { mozRequestFullScreen: () => void }).mozRequestFullScreen()
      } else if ('msRequestFullscreen' in mapContainer) {
        (mapContainer as HTMLElement & { msRequestFullscreen: () => void }).msRequestFullscreen()
      }
    } else {
      // 退出全屏
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if ('webkitExitFullscreen' in document) {
        (document as Document & { webkitExitFullscreen: () => void }).webkitExitFullscreen()
      } else if ('mozCancelFullScreen' in document) {
        (document as Document & { mozCancelFullScreen: () => void }).mozCancelFullScreen()
      } else if ('msExitFullscreen' in document) {
        (document as Document & { msExitFullscreen: () => void }).msExitFullscreen()
      }
    }
  }, [isFullscreen])

  // 监听全屏状态变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as Document & { webkitFullscreenElement?: Element }).webkitFullscreenElement ||
        (document as Document & { mozFullScreenElement?: Element }).mozFullScreenElement ||
        (document as Document & { msFullscreenElement?: Element }).msFullscreenElement
      )
      setIsFullscreen(isCurrentlyFullscreen)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', handleFullscreenChange)
    document.addEventListener('msfullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
      document.removeEventListener('msfullscreenchange', handleFullscreenChange)
    }
  }, [])

  // 注册世界地图数据
  const registerMap = useCallback(() => {
    if (echarts.getMap('world')) {
      setMapLoaded(true)
      return
    }
    setLoading(true)
    setError('')
    try {
      echarts.registerMap('world', worldMapData as Parameters<typeof echarts.registerMap>[1])
      setMapLoaded(true)
    } catch (err) {
      console.error('地图注册失败:', err)
      const errorMessage = err instanceof Error ? err.message : '地图数据加载失败'
      setError(`${errorMessage}，请检查地图文件`)
      setMapLoaded(false)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    registerMap()
  }, [registerMap])

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setError('')
    const reader = new FileReader()

    reader.onload = async (e) => {
      try {
        const content = e.target?.result as string
        let data: RegionData[] = []

        if (file.name.endsWith('.json')) {
          // 解析 JSON 文件
          const jsonData = JSON.parse(content)
          if (Array.isArray(jsonData)) {
            data = jsonData.map(item => ({
              name: getStandardRegionName(item.name || item.region || item.province || item.国家 || item.country || ''),
              value: Number(item.value || item.count || 0)
            }))
          } else if (typeof jsonData === 'object') {
            // 如果是对象格式，转换为数组
            data = Object.entries(jsonData).map(([name, value]) => ({
              name: getStandardRegionName(name),
              value: Number(value)
            }))
          }
        } else if (file.name.endsWith('.csv')) {
          // 解析 CSV 文件
          const lines = content.split('\n').filter(line => line.trim())
          console.log(lines);
          const headers = lines[0].split(',').map(h => h.trim())
          const nameIndex = headers.findIndex(h =>
            h.toLowerCase().includes('name') ||
            h.toLowerCase().includes('region') ||
            h.toLowerCase().includes('province') ||
            h === '国家'
          )
          const valueIndex = headers.findIndex(h =>
            h.toLowerCase().includes('value') ||
            h.toLowerCase().includes('count') ||
            h.toLowerCase().includes('data')
          )

          if (nameIndex === -1 || valueIndex === -1) {
            throw new Error('CSV 文件必须包含 国家/name/region 和 value/count 列')
          }

          for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim())
            if (values[nameIndex] && values[valueIndex]) {
              data.push({
                name: getStandardRegionName(values[nameIndex]),
                value: Number(values[valueIndex]) || 0
              })
            }
          }
        } else {
          throw new Error('不支持的文件格式，请上传 JSON 或 CSV 文件')
        }

        if (data.length === 0) {
          throw new Error('未能解析出有效数据')
        }

        // 与地图全部国家合并：未在导入数据中的国家设为 0，列表展示所有国家
        const allNames = getAllMapCountryNames()
        const valueByCountry = new Map(data.map(d => [d.name, d.value]))
        const mergedData: RegionData[] = allNames.map(name => ({
          name,
          value: valueByCountry.get(name) ?? 0
        }))
        setMapData(mergedData)
        if (!echarts.getMap('world')) {
          registerMap()
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : '文件解析失败')
        setMapData([])
      }
    }

    reader.onerror = () => {
      setError('文件读取失败')
      setMapData([])
    }

    reader.readAsText(file)
  }, [registerMap])

  // ECharts 配置选项
  const getOption = () => {
    if (mapData.length === 0) {
      return {
        backgroundColor: '#ffffff',
        title: {
          text: '请上传区域数据文件',
          left: 'center',
          top: 'middle',
          textStyle: {
            color: '#999',
            fontSize: 20
          }
        }
      }
    }

    if (!mapLoaded && loading) {
      return {
        backgroundColor: '#ffffff',
        title: {
          text: '正在加载地图数据...',
          left: 'center',
          top: 'middle',
          textStyle: {
            color: '#999',
            fontSize: 20
          }
        }
      }
    }

    if (!mapLoaded) {
      return {
        backgroundColor: '#ffffff',
        title: {
          text: '地图数据加载失败，请刷新页面重试',
          left: 'center',
          top: 'middle',
          textStyle: {
            color: '#f44336',
            fontSize: 18
          }
        }
      }
    }

    // 合并默认配置，避免 localStorage 旧数据缺少字段导致图例显示 undefined
    const config: RangeConfig = { ...defaultRangeConfig, ...rangeConfig }

    const l2 = config.level2 ?? defaultRangeConfig.level2
    const l1 = config.level1 ?? defaultRangeConfig.level1
    const l0 = config.level0 ?? defaultRangeConfig.level0
    const lm1 = config.levelMinus1 ?? defaultRangeConfig.levelMinus1
    const lm2 = config.levelMinus2 ?? defaultRangeConfig.levelMinus2
    const lm3 = config.levelMinus3 ?? defaultRangeConfig.levelMinus3
    const lm4 = config.levelMinus4 ?? defaultRangeConfig.levelMinus4

    return {
      backgroundColor: '#ffffff',
      title: {
        text: '世界地图',
        left: 'center',
        top: '10',
        textStyle: {
          color: '#333',
          fontSize: 20
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: (params: { name: string; value?: number }) => {
          const value = params.value ?? 0
          return `${params.name}<br/>数值: ${typeof value === 'number' ? value.toFixed(2) : value}`
        }
      },
      visualMap: {
        type: 'piecewise',
        pieces: [

          { min: l1, max: l2, label: `${l1}-${l2}`, color: config.color1 ?? defaultRangeConfig.color1 },
          { min: l0, max: l1, label: `${l0}-${l1}`, color: config.color0 ?? defaultRangeConfig.color0 },
          { min: lm4, max: l0, label: `${lm4}-${l0}`, color: config.colorMinus3 ?? defaultRangeConfig.colorMinus3 },
          { min: lm2, max: lm3, label: `${lm2}-${lm3}`, color: config.colorMinus2 ?? defaultRangeConfig.colorMinus2 },
          { min: 0, max: 0, label: `${lm1}`, color: config.colorMinus1 ?? defaultRangeConfig.colorMinus1 }
        ],
        left: 'left',
        top: 'bottom',
        orient: 'vertical',
        itemWidth: 20,
        itemHeight: 14,
        textStyle: {
          color: '#333'
        }
      },
      series: [
        {
          name: '区域数据',
          type: 'map',
          map: 'world',
          roam: true,
          label: {
            show: showLabels,
            fontSize: 10,
            color: '#333',
            hideOverlap: true // 隐藏重叠的标签，避免文字叠在一起
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 11,
              fontWeight: 'bold'
            }
          },
          data: mapData
        }
      ]
    }
  }

  return (
    <div className="app-container">
      <h1>区域数据地图可视化</h1>

      <div className="upload-section">
        <div className="upload-area">
          <input
            type="file"
            id="file-upload"
            accept=".json,.csv"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          <div className="upload-buttons">
            <label htmlFor="file-upload" className="upload-button">
              选择文件上传 (JSON/CSV)
            </label>
            <button
              className="download-template-button"
              onClick={downloadWorldTemplate}
              title="下载世界地图国家模板（含全部国家）"
            >
              下载世界地图模板
            </button>
          </div>
          {mapData.length > 0 && (
            <div className="data-info">
              已加载 {mapData.length} 条区域数据
              <button
                className="clear-button"
                onClick={clearMapData}
                title="清空数据"
              >
                清空数据
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="map-label-selector">
          <label>
            <input
              type="checkbox"
              checked={showLabels}
              onChange={(e) => setShowLabels(e.target.checked)}
              className="label-checkbox"
            />
            显示区域名称
          </label>
        </div>

        <div className="config-section">
          <button
            className="config-toggle-button"
            onClick={() => setShowConfig(!showConfig)}
          >
            {showConfig ? '隐藏配置' : '显示颜色分段配置'}
          </button>

          {showConfig && (
            <div className="config-panel">
              <div className="config-header">
                <h3>颜色分段配置（数值直接对应）</h3>
                <button
                  className="reset-button"
                  onClick={resetConfig}
                  title="重置为默认配置"
                >
                  重置配置
                </button>
              </div>

              <div className="color-preset-selector">
                <label>预设颜色方案：</label>
                <button
                  className="preset-button"
                  onClick={() => setRangeConfig({ ...rangeConfig, ...colorList1 })}
                  title="应用颜色方案1"
                >
                  方案1
                </button>
                <button
                  className="preset-button"
                  onClick={() => setRangeConfig({ ...rangeConfig, ...colorList2 })}
                  title="应用颜色方案2"
                >
                  方案2
                </button>
                <button
                  className="preset-button"
                  onClick={() => setRangeConfig({ ...rangeConfig, ...colorList3 })}
                  title="应用颜色方案3"
                >
                  方案2
                </button>
              </div>

              <div className="config-grid">
                <div className="config-item-full">
                  <div className="config-row">
                    <label>30-50：</label>
                    <input
                      type="number"
                      value={rangeConfig.level1}
                      onChange={(e) => setRangeConfig({ ...rangeConfig, level1: Number(e.target.value) })}
                      className="config-input"
                      min="0"
                    />
                    <label className="color-label">颜色：</label>
                    <input
                      type="color"
                      value={rangeConfig.color1}
                      onChange={(e) => setRangeConfig({ ...rangeConfig, color1: e.target.value })}
                      className="color-input"
                    />
                  </div>
                </div>
                <div className="config-item-full">
                  <div className="config-row">
                    <label>9-30：</label>
                    <input
                      type="number"
                      value={rangeConfig.levelMinus4 ?? defaultRangeConfig.levelMinus4}
                      onChange={(e) => setRangeConfig({ ...rangeConfig, levelMinus4: Number(e.target.value) })}
                      className="config-input"
                      min="0"
                      title="下界"
                    />
                    <span className="config-sep">-</span>
                    <input
                      type="number"
                      value={rangeConfig.level0 ?? defaultRangeConfig.level0}
                      onChange={(e) => setRangeConfig({ ...rangeConfig, level0: Number(e.target.value) })}
                      className="config-input"
                      min="0"
                      title="上界"
                    />
                    <label className="color-label">颜色：</label>
                    <input
                      type="color"
                      value={rangeConfig.colorMinus3 ?? defaultRangeConfig.colorMinus3}
                      onChange={(e) => setRangeConfig({ ...rangeConfig, colorMinus3: e.target.value })}
                      className="color-input"
                    />
                  </div>
                </div>
                <div className="config-item-full">
                  <div className="config-row">
                    <label>1-8：</label>
                    <input
                      type="number"
                      value={rangeConfig.levelMinus2 ?? defaultRangeConfig.levelMinus2}
                      onChange={(e) => setRangeConfig({ ...rangeConfig, levelMinus2: Number(e.target.value) })}
                      className="config-input"
                      min="0"
                      title="下界"
                    />
                    <span className="config-sep">-</span>
                    <input
                      type="number"
                      value={rangeConfig.levelMinus3 ?? defaultRangeConfig.levelMinus3}
                      onChange={(e) => setRangeConfig({ ...rangeConfig, levelMinus3: Number(e.target.value) })}
                      className="config-input"
                      min="0"
                      title="上界"
                    />
                    <label className="color-label">颜色：</label>
                    <input
                      type="color"
                      value={rangeConfig.colorMinus2 ?? defaultRangeConfig.colorMinus2}
                      onChange={(e) => setRangeConfig({ ...rangeConfig, colorMinus2: e.target.value })}
                      className="color-input"
                    />
                  </div>
                </div>
                <div className="config-item-full">
                  <div className="config-row">
                    <label>0：</label>
                    <input
                      type="number"
                      value={rangeConfig.levelMinus1 ?? defaultRangeConfig.levelMinus1}
                      onChange={(e) => setRangeConfig({ ...rangeConfig, levelMinus1: Number(e.target.value) })}
                      className="config-input"
                      min="0"
                      title="上界"
                    />
                    <label className="color-label">颜色：</label>
                    <input
                      type="color"
                      value={rangeConfig.colorMinus1 ?? defaultRangeConfig.colorMinus1}
                      onChange={(e) => setRangeConfig({ ...rangeConfig, colorMinus1: e.target.value })}
                      className="color-input"
                    />
                  </div>
                </div>
              </div>
              <div className="config-note">
                <p>提示：分段为 0以下、1-8、9-30、30-50… 配置数值与数据直接对应</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="map-container">
        <div className="map-header">
          <button
            className="fullscreen-button"
            onClick={toggleFullscreen}
            title={isFullscreen ? '退出全屏' : '全屏显示'}
          >
            {isFullscreen ? '退出全屏' : '全屏'}
          </button>
          <div className="export-size-config">
            <span className="export-size-label">导出尺寸：</span>
            <button
              type="button"
              className="preset-button export-preset"
              onClick={() => { setExportWidth(1920); setExportHeight(1080) }}
              title="1080p"
            >
              1080p
            </button>
            <button
              type="button"
              className="preset-button export-preset"
              onClick={() => { setExportWidth(3840); setExportHeight(2160) }}
              title="4K"
            >
              4K
            </button>
            <label className="export-size-input-label">
              <input
                type="number"
                min={100}
                max={8192}
                value={exportWidth}
                onChange={(e) => setExportWidth(Number(e.target.value) || 3840)}
                className="config-input export-size-input"
              />
              ×
            </label>
            <input
              type="number"
              min={100}
              max={8192}
              value={exportHeight}
              onChange={(e) => setExportHeight(Number(e.target.value) || 2160)}
              className="config-input export-size-input"
            />
          </div>
          <button
            className="download-template-button"
            onClick={downloadMapPng}
            title={`下载地图 PNG（${exportWidth}×${exportHeight}）`}
          >
            下载地图 PNG
          </button>
        </div>
        <div className="echarts-wrapper" ref={chartWrapperRef}>
          <ReactECharts
            ref={chartRef}
            option={getOption()}
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
        </div>
      </div>

      {mapData.length > 0 && (
        <div className="data-table">
          <h3>数据预览</h3>
          <table>
            <thead>
              <tr>
                <th>区域名称</th>
                <th>数值</th>
              </tr>
            </thead>
            <tbody>
              {mapData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>
                    <input
                      type="number"
                      value={item.value}
                      onChange={(e) => {
                        const newValue = Number(e.target.value)
                        const newData = [...mapData]
                        newData[index] = { ...newData[index], value: newValue }
                        setMapData(newData)
                      }}
                      className="table-input"
                      step="3"
                      min="0"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default App
