# [台灣縣市氣象資訊](http://13.213.240.133:8001/)

### 這是一個氣象網站，提供即時及當週天氣資訊，輕鬆掌握天氣概況

### 目錄

- [主要功能](#主要功能)
- [系統架構](#系統架構)
- [使用技術](#使用技術)
- [團隊分工](#團隊分工)

---

### 主要功能

- 依照使用者所在位置，即時呈現當地天氣資訊
- 點擊溫度圖示，依各地氣溫高低呈現不同色塊
- 點擊地圖各縣市，切換至指定區域的天氣資訊

![ScreenRecording2024-07-19at12 31 44AM-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/c9ec496d-011e-4ac1-a4a4-747d7c24b89a)

---

### 系統架構

- 透過 Git Flow 方式開發，確保各版本控制
- 採用前後端分離方式開發
  - 前端使用 HTML、CSS、JavaScript
  - 後端使用 Python FastAPI ，並採用 MVC 模式設計
- 專案部署於 AWS EC2

---

### 使用技術

- 串接中央氣象署開放資料平臺之資料擷取 API
- 串接 Discord API，結合 Discord Webhook 自動發佈訊息到 Discord Channel
- 串接 Google Geolocation API，定位使用者位置顯示對應天氣資訊

---

### 團隊分工

#### 組長：楊松蒲

- Host 專案，掌握進度
- 開啟 GitHub Repository，建立基礎專案程式
- 根據分工結果，調整專案檔案結構
- 將網站部署於 AWS EC2

#### 前端：陳安琪、游語軒、趙姿晴

- 與後端溝通 API 回傳的資料格式
- 渲染台灣即時氣象資訊內容及資料視覺化
- 搜尋設計框、數據以圖表呈現
- 串接 Google Geolocation API，取得使用者位置
#### 後端：楊松蒲、許珮萱

- 與前端協調 API 回傳的資料格式
- 串接中央氣象署 API，取得所需資料並彙整提供予前端
- 使用 FastAPI 框架建構網站後端
- 實作 Cache 概念

---

### 前端-陳安琪

- 搜尋框設計
  - 建立下拉選單及搜尋框兩種方式查找該縣市氣象數據
  - 建立 mapping 處理搜尋名稱對應到統一名稱，減少 API 串接查詢錯誤問題，如 `{台北: 臺北市, 臺北: 臺北市}`
- 數據串接與處理
  - 使用 fetch API 串接後端指定數據位置，如`/weather/week/${location}`
  - 解析並轉換數據格式，建立所需物件以及前端渲染顯示格式，如 `日期+時間段：7/17(晚)`
- 數據圖表渲染
  - 使用 API 串接後端指定數據位置，如`/weather/week/${location}`
  - 使用 Chart.js JavaScript Library 生成雨量直條圖(Bar Chart)及早晚溫度曲線圖(Line Chart)

### 前端-游語軒

- 互動式地圖實現
  - 建立兩種方式查詢縣市氣象數據
  - 實現地圖動畫效果
- 數據獲取與展示
  - 使用 Fetch API 串接後端指定數據
    - 例如：`/weather/humidity`（濕度數據）
    - 例如：`/weather/temperature`（溫度數據）
- 數據可視化
  - 建立數據與顏色的映射機制
    - 如：`{ value: 70, color: [40, 133, 0] }`
  - 根據映射結果進行地圖渲染
- 用戶體驗優化
  - 實現滾動動畫效果
- 團隊協作
  - 參與前端工作分配

### 前端-趙姿晴

- API、數據串接處理與渲染
  - 串接 Google Geolocation API，確認使用者定位以顯示對應資訊
  - 串接後端 API，傳送指定資料至後端、解析與轉換數據格式
  - 天氣資訊渲染，如當日天氣 list、對應背景圖等

### 後端-許珮萱

- ReadMe 編寫
- API建置
    - 建置`/weather/threeDays/{location}`
    - 建置`/weather/humidity`
    - 優化`/trigger/discord`
- 應用 Cache 概念

### 後端-楊松蒲

- 後端主架構程式碼
- API 建置
  - 建置`/weather/week/{location}`
  - 建置`/weather/temperature`
  - 建置`/weather/{location}`
  - 建置`/trigger/discord`
- 應用 Cache 概念
- 將網頁上線至 EC2
