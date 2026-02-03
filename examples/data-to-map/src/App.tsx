import { useState, useCallback, useEffect } from 'react'
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'
import './App.css'
import chinaMapData from './full-map.json'
import worldMapData from './world.json'
import templateCsvUrl from './zd-p1.csv?url'

interface RegionData {
  name: string
  value: number
}

interface RangeConfig {
  level5: number // 300以上
  level4: number // 200-300
  level3: number // 100-200
  level2: number // 50-100
  level1: number // 30-50
  level0: number // 1-30
  levelMinus1: number // 1以下
  color5: string // 300以上颜色
  color4: string // 200-300颜色
  color3: string // 100-200颜色
  color2: string // 50-100颜色
  color1: string // 30-50颜色
  color0: string // 1-30颜色
  colorMinus1: string // 1以下颜色
}
const colorList1 = {
  color5: '#FEE2E2', // 300以上颜色
  color4: '#FFEDD5', // 200-300颜色
  color3: '#FEF9C3', // 100-200颜色
  color2: '#DCFCE7', // 50-100颜色
  color1: '#CCFBF1', // 30-50颜色
  color0: '#DBEAFE', // 1-30颜色
  colorMinus1: '#E0F2FE' // 1以下颜色
}

const colorList2 = {
  color5: '#F3E8FF', // 300以上｜至尊（淡紫）
  color4: '#E0F2FE', // 200-300｜钻石（冰蓝）
  color3: '#FFF3C4', // 100-200｜黄金（香槟金）
  color2: '#E6F4F1', // 50-100｜铂金（浅青）
  color1: '#EEF2F7', // 30-50｜白银（银灰）
  color0: '#F1E7E3', // 1-30｜青铜（浅棕）
  colorMinus1: '#F3F4F6' // 1以下｜普通（浅灰）
};

const colorList3 = {
  colorMinus1: '#F0F6FF', // 1以下｜极浅蓝（最低）
  color0: '#E2EDFF',      // 1-30
  color1: '#C7DBFF',      // 30-50
  color2: '#9EC2FF',      // 50-100
  color3: '#6FA3FF',      // 100-200
  color4: '#3F82FF',      // 200-300
  color5: '#005DE9',      // 300以上｜最高等级（基准蓝）
};

// 区域名称映射表：将常见名称映射到地图 GeoJSON 中的标准名称
// 阿里云 DataV 中国地图使用的标准名称格式
const regionNameMap: Record<string, string> = {
  // 直辖市
  '北京': '北京市',
  '上海': '上海市',
  '天津': '天津市',
  '重庆': '重庆市',

  // 省份（需要添加"省"后缀）
  '广东': '广东省',
  '河南': '河南省',
  '山东': '山东省',
  '江苏': '江苏省',
  '云南': '云南省',
  '黑龙江': '黑龙江省',
  '江西': '江西省',
  '山西': '山西省',
  '陕西': '陕西省',
  '浙江': '浙江省',
  '贵州': '贵州省',
  '河北': '河北省',
  '福建': '福建省',
  '安徽': '安徽省',
  '湖北': '湖北省',
  '四川': '四川省',
  '吉林': '吉林省',
  '青海': '青海省',
  '辽宁': '辽宁省',
  '甘肃': '甘肃省',
  '湖南': '湖南省',

  // 自治区
  '内蒙古': '内蒙古自治区',
  '新疆': '新疆维吾尔自治区',
  '西藏': '西藏自治区',
  '宁夏': '宁夏回族自治区',
  '广西': '广西壮族自治区',

  // 特别行政区
  '香港': '香港特别行政区',
  '澳门': '澳门特别行政区',

  // 城市（如果是省级地图，城市应该映射到所属省份）
  '深圳': '广东省', // 深圳属于广东省
}

// 获取地图数据中使用的标准名称
const getStandardRegionName = (name: string): string => {
  // 去除首尾空格
  const trimmedName = name.trim()

  // 如果已经在映射表中，直接返回
  if (regionNameMap[trimmedName]) {
    return regionNameMap[trimmedName]
  }

  // 如果名称已经包含"省"、"市"、"自治区"等，直接返回
  if (trimmedName.includes('省') || trimmedName.includes('市') ||
      trimmedName.includes('自治区') || trimmedName.includes('特别行政区')) {
    return trimmedName
  }

  // 尝试添加"省"后缀（排除直辖市和自治区）
  const specialRegions: Record<string, string> = {
    '北京': '北京市',
    '上海': '上海市',
    '天津': '天津市',
    '重庆': '重庆市',
    '内蒙古': '内蒙古自治区',
    '新疆': '新疆维吾尔自治区',
    '西藏': '西藏自治区',
    '宁夏': '宁夏回族自治区',
    '广西': '广西壮族自治区',
    '香港': '香港特别行政区',
    '澳门': '澳门特别行政区'
  }

  if (specialRegions[trimmedName]) {
    return specialRegions[trimmedName]
  }

  // 默认添加"省"后缀
  return `${trimmedName}省`
}

// localStorage 键名
const STORAGE_KEYS = {
  MAP_DATA: 'map-visualization-data',
  RANGE_CONFIG: 'map-visualization-config',
  MAP_TYPE: 'map-visualization-type',
  SHOW_LABELS: 'map-visualization-show-labels'
}

// 默认配置
const defaultRangeConfig: RangeConfig = {
  level5: 300,
  level4: 200,
  level3: 100,
  level2: 50,
  level1: 30,
  level0: 1,
  levelMinus1: 0,
  color5: '#F97316',
  color4: '#EAB308',
  color3: '#22C55E',
  color2: '#0EA5A4',
  color1: '#2563EB',
  color0: '#63E6BE',
  colorMinus1: '#eee',
}

function App() {
  const [mapData, setMapData] = useState<RegionData[]>([])
  const [error, setError] = useState<string>('')
  const [mapType, setMapType] = useState<string>('china')
  const [mapLoaded, setMapLoaded] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [showConfig, setShowConfig] = useState<boolean>(false)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const [showLabels, setShowLabels] = useState<boolean>(true)
  const [rangeConfig, setRangeConfig] = useState<RangeConfig>(defaultRangeConfig)

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

  // 保存地图类型到 localStorage
  const saveMapTypeToStorage = useCallback((type: string) => {
    try {
      localStorage.setItem(STORAGE_KEYS.MAP_TYPE, type)
    } catch (err) {
      console.error('保存地图类型到 localStorage 失败:', err)
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

      // 加载配置
      const savedConfig = localStorage.getItem(STORAGE_KEYS.RANGE_CONFIG)
      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig)
        setRangeConfig(parsedConfig)
      }

      // 加载地图类型
      const savedMapType = localStorage.getItem(STORAGE_KEYS.MAP_TYPE)
      if (savedMapType) {
        setMapType(savedMapType)
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

  // 当 mapType 改变时保存到 localStorage
  useEffect(() => {
    saveMapTypeToStorage(mapType)
  }, [mapType, saveMapTypeToStorage])

  // 清空地图数据
  const clearMapData = useCallback(() => {
    if (window.confirm('确定要清空所有上传的数据吗？')) {
      setMapData([])
      localStorage.removeItem(STORAGE_KEYS.MAP_DATA)
    }
  }, [])

  // 下载模板文件
  const downloadTemplate = useCallback(async () => {
    try {
      const response = await fetch(templateCsvUrl)
      if (!response.ok) {
        throw new Error('模板文件加载失败')
      }
      const csvContent = await response.text()
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', 'zd-p1.csv')
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('下载模板失败:', err)
      setError('下载模板失败，请稍后重试')
    }
  }, [])

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

  // 注册地图数据
  const registerMap = useCallback(async (mapName: string) => {
    // 如果已经注册过，直接返回
    if (echarts.getMap(mapName)) {
      setMapLoaded(true)
      return
    }

    setLoading(true)
    setError('')
    try {
      if (mapName === 'china') {
        // 使用本地中国地图文件
        echarts.registerMap(mapName, chinaMapData as Parameters<typeof echarts.registerMap>[1])
        setMapLoaded(true)
      } else if (mapName === 'world') {
        // 使用本地世界地图文件
        echarts.registerMap(mapName, worldMapData as Parameters<typeof echarts.registerMap>[1])
        setMapLoaded(true)
      } else {
        throw new Error('不支持的地图类型')
      }
    } catch (err) {
      console.error('地图注册失败:', err)
      const errorMessage = err instanceof Error ? err.message : '地图数据加载失败'
      setError(`${errorMessage}，请检查地图文件`)
      setMapLoaded(false)
    } finally {
      setLoading(false)
    }
  }, [])

  // 组件挂载时注册默认地图
  useEffect(() => {
    registerMap(mapType)
  }, [mapType, registerMap])

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
              name: getStandardRegionName(item.name || item.region || item.province || ''),
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
            h.toLowerCase().includes('province')
          )
          const valueIndex = headers.findIndex(h =>
            h.toLowerCase().includes('value') ||
            h.toLowerCase().includes('count') ||
            h.toLowerCase().includes('data')
          )

          if (nameIndex === -1 || valueIndex === -1) {
            throw new Error('CSV 文件必须包含 name/region 和 value/count 列')
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

        console.log(data, '====');

        if (data.length === 0) {
          throw new Error('未能解析出有效数据')
        }

        // 数据已经在上面的处理中应用了名称转换
        setMapData(data)
        // 确保地图已注册
        if (!echarts.getMap(mapType)) {
          await registerMap(mapType)
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
  }, [registerMap, mapType])

  // ECharts 配置选项
  const getOption = () => {
    if (mapData.length === 0) {
      return {
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

    return {
      title: {
        text: '各区域数据地图展示',
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
          const value = (params.value || 0) / 10000
          return `${params.name}<br/>数值: ${value.toFixed(2)}万`
        }
      },
      visualMap: {
        type: 'piecewise',
        pieces: [
          { min: rangeConfig.level5 * 10000, label: `${rangeConfig.level5}万以上`, color: rangeConfig.color5 },
          { min: rangeConfig.level4 * 10000, max: rangeConfig.level5 * 10000, label: `${rangeConfig.level4}-${rangeConfig.level5}万`, color: rangeConfig.color4 },
          { min: rangeConfig.level3 * 10000, max: rangeConfig.level4 * 10000, label: `${rangeConfig.level3}-${rangeConfig.level4}万`, color: rangeConfig.color3 },
          { min: rangeConfig.level2 * 10000, max: rangeConfig.level3 * 10000, label: `${rangeConfig.level2}-${rangeConfig.level3}万`, color: rangeConfig.color2 },
          { min: rangeConfig.level1 * 10000, max: rangeConfig.level2 * 10000, label: `${rangeConfig.level1}-${rangeConfig.level2}万`, color: rangeConfig.color1 },
          { min: rangeConfig.level0 * 10000, max: rangeConfig.level1 * 10000, label: `${rangeConfig.level0}-${rangeConfig.level1}万`, color: rangeConfig.color0 },
          { min: 0, max: rangeConfig.level0 * 10000, label: `${rangeConfig.level0}万以下`, color: rangeConfig.colorMinus1 }
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
          map: mapType,
          roam: true,
          label: {
            show: showLabels,
            fontSize: 12,
            color: '#333'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
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
              onClick={downloadTemplate}
              title="下载CSV模板文件"
            >
              下载模板
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
          <div className="name-format-hint">
            <p>提示：区域名称会自动转换为地图标准格式（如"北京"→"北京市"，"广东"→"广东省"）</p>
            <p>支持格式：省份名（如"广东"）、完整名称（如"广东省"）、直辖市（如"北京"、"上海"）</p>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="map-type-selector">
          <label>地图类型：</label>
          <select
            value={mapType}
            onChange={(e) => {
              setMapType(e.target.value)
              setMapLoaded(false)
            }}
            className="select-input"
            disabled={loading}
          >
            <option value="china">中国地图</option>

          </select>
          {loading && <span className="loading-text">加载中...</span>}
        </div>

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
                <h3>颜色分段配置（单位：万）</h3>
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
                    <label>300以上：</label>
                    <input
                      type="number"
                      value={rangeConfig.level5}
                      onChange={(e) => setRangeConfig({ ...rangeConfig, level5: Number(e.target.value) })}
                      className="config-input"
                      min="0"
                    />
                    <label className="color-label">颜色：</label>
                    <input
                      type="color"
                      value={rangeConfig.color5}
                      onChange={(e) => setRangeConfig({ ...rangeConfig, color5: e.target.value })}
                      className="color-input"
                    />
                  </div>
                </div>
                <div className="config-item-full">
                  <div className="config-row">
                    <label>200-300：</label>
                    <input
                      type="number"
                      value={rangeConfig.level4}
                      onChange={(e) => setRangeConfig({ ...rangeConfig, level4: Number(e.target.value) })}
                      className="config-input"
                      min="0"
                    />
                    <label className="color-label">颜色：</label>
                    <input
                      type="color"
                      value={rangeConfig.color4}
                      onChange={(e) => setRangeConfig({ ...rangeConfig, color4: e.target.value })}
                      className="color-input"
                    />
                  </div>
                </div>
                <div className="config-item-full">
                  <div className="config-row">
                    <label>100-200：</label>
                    <input
                      type="number"
                      value={rangeConfig.level3}
                      onChange={(e) => setRangeConfig({ ...rangeConfig, level3: Number(e.target.value) })}
                      className="config-input"
                      min="0"
                    />
                    <label className="color-label">颜色：</label>
                    <input
                      type="color"
                      value={rangeConfig.color3}
                      onChange={(e) => setRangeConfig({ ...rangeConfig, color3: e.target.value })}
                      className="color-input"
                    />
                  </div>
                </div>
                <div className="config-item-full">
                  <div className="config-row">
                    <label>50-100：</label>
                    <input
                      type="number"
                      value={rangeConfig.level2}
                      onChange={(e) => setRangeConfig({ ...rangeConfig, level2: Number(e.target.value) })}
                      className="config-input"
                      min="0"
                    />
                    <label className="color-label">颜色：</label>
                    <input
                      type="color"
                      value={rangeConfig.color2}
                      onChange={(e) => setRangeConfig({ ...rangeConfig, color2: e.target.value })}
                      className="color-input"
                    />
                  </div>
                </div>
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
                    <label>1-30：</label>
                    <input
                      type="number"
                      value={rangeConfig.level0}
                      onChange={(e) => setRangeConfig({ ...rangeConfig, level0: Number(e.target.value) })}
                      className="config-input"
                      min="0"
                    />
                    <label className="color-label">颜色：</label>
                    <input
                      type="color"
                      value={rangeConfig.color0}
                      onChange={(e) => setRangeConfig({ ...rangeConfig, color0: e.target.value })}
                      className="color-input"
                    />
                  </div>
                </div>
                <div className="config-item-full">
                  <div className="config-row">
                    <label>1以下：</label>
                    <input
                      type="number"
                      value={rangeConfig.levelMinus1}
                      onChange={(e) => setRangeConfig({ ...rangeConfig, levelMinus1: Number(e.target.value) })}
                      className="config-input"
                      min="0"
                    />
                    <label className="color-label">颜色：</label>
                    <input
                      type="color"
                      value={rangeConfig.colorMinus1}
                      onChange={(e) => setRangeConfig({ ...rangeConfig, colorMinus1: e.target.value })}
                      className="color-input"
                    />
                  </div>
                </div>
              </div>
              <div className="config-note">
                <p>提示：数值范围应该从大到小排列（300 &gt; 200 &gt; 100 &gt; 50 &gt; 30 &gt; 1 &gt; 0）</p>
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
        </div>
        <div className="echarts-wrapper">
          <ReactECharts
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
                      value={item.value / 10000}
                      onChange={(e) => {
                        const newValue = Number(e.target.value) * 10000
                        const newData = [...mapData]
                        newData[index] = { ...newData[index], value: newValue }
                        setMapData(newData)
                      }}
                      className="table-input"
                      step="0.01"
                      min="0"
                    />
                    <span className="unit-text">万</span>
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
