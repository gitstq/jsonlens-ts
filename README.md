# 🔍 JSONLens-TS

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-5.3+-blue.svg" alt="TypeScript 5.3+">
  <img src="https://img.shields.io/badge/Node.js-16+-green.svg" alt="Node.js 16+">
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="MIT License">
  <img src="https://img.shields.io/badge/Platform-Linux%20%7C%20macOS%20%7C%20Windows-lightgrey.svg" alt="Platform">
</p>

<p align="center">
  <b>A Modern TypeScript CLI Tool for JSON Visualization, Analysis & Transformation</b><br>
  <b>现代化 TypeScript JSON 可视化、分析与转换 CLI 工具</b><br>
  <b>現代化 TypeScript JSON 視覺化、分析與轉換 CLI 工具</b>
</p>

---

## 🌐 Language / 语言 / 語言

- [English](#english)
- [简体中文](#simplified-chinese)
- [繁體中文](#traditional-chinese)

---

<a name="english"></a>
## 🇺🇸 English

### 🎉 Introduction

**JSONLens-TS** is a powerful, modern CLI tool built with TypeScript for developers who work with JSON data daily. Inspired by the popularity of JSON visualization tools like JSON Crack, JSONLens-TS brings the power of JSON analysis directly to your terminal — no browser required.

Whether you're debugging API responses, analyzing configuration files, comparing data versions, or transforming nested structures, JSONLens-TS provides a comprehensive set of features to make your workflow faster and more efficient.

**Key Differentiators:**
- 🚀 **Terminal-native**: Works entirely in your terminal, no browser or GUI needed
- 🎨 **Beautiful output**: Colorized tree views with intuitive icons
- 🔧 **TypeScript-first**: Fully typed, extensible architecture
- 📦 **Zero-config**: Install and use immediately
- 🧪 **Well-tested**: Comprehensive unit test coverage

### ✨ Core Features

| Feature | Command | Description |
|---------|---------|-------------|
| 🌲 **Tree View** | `jsonlens tree` | Display JSON as an interactive tree structure with colorized output |
| 📊 **Statistics** | `jsonlens stats` | Show detailed statistics including key count, depth, type distribution |
| 📋 **Flatten** | `jsonlens flatten` | Convert nested JSON to dot-notation key-value pairs |
| 🔀 **Diff** | `jsonlens diff` | Compare two JSON files and highlight differences |
| 🔍 **Filter** | `jsonlens filter` | Filter JSON by key pattern, value pattern, or data type |
| ✅ **Validate** | `jsonlens validate` | Validate JSON syntax with detailed error messages |
| 🎮 **Interactive** | `jsonlens interactive` | Read JSON from stdin for quick analysis |

### 🚀 Quick Start

#### Requirements
- **Node.js** >= 16.0.0
- **npm** >= 8.0.0

#### Installation

```bash
# Install globally via npm
npm install -g jsonlens-ts

# Or use directly with npx
npx jsonlens-ts --help
```

#### Local Development

```bash
# Clone the repository
git clone https://github.com/gitstq/jsonlens-ts.git
cd jsonlens-ts

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Link for local testing
npm link
```

#### Usage Examples

```bash
# Display JSON as a tree
jsonlens tree data.json

# Show statistics
jsonlens stats data.json

# Flatten nested JSON
jsonlens flatten data.json -o flat.txt

# Compare two JSON files
jsonlens diff old.json new.json

# Filter by key pattern
jsonlens filter data.json --key "user"

# Filter by value pattern
jsonlens filter data.json --value "active"

# Filter by type
jsonlens filter data.json --type string,number

# Validate JSON syntax
jsonlens validate data.json

# Interactive mode (read from stdin)
echo '{"name":"test"}' | jsonlens interactive
```

### 📖 Detailed Usage Guide

#### Tree Command Options

```bash
jsonlens tree <file> [options]

Options:
  -d, --max-depth <number>   Maximum depth to display (default: 10)
  -c, --no-color            Disable colorized output
  --compact                 Compact mode (truncate long strings)
  --no-array-index          Hide array indices
```

#### Stats Command Options

```bash
jsonlens stats <file> [options]

Options:
  -c, --no-color            Disable colorized output
```

Output includes:
- Total key count
- Maximum nesting depth
- Total size in bytes
- Object and array counts
- Type distribution with visual bar chart

#### Diff Command

```bash
jsonlens diff <file1> <file2> [options]

Options:
  -c, --no-color            Disable colorized output
```

Shows:
- Added keys (green)
- Removed keys (red)
- Modified values with old/new comparison (yellow)

#### Filter Command Options

```bash
jsonlens filter <file> [options]

Options:
  -k, --key <pattern>       Filter by key pattern (regex)
  -v, --value <pattern>     Filter by value pattern (regex)
  -t, --type <types>        Filter by type(s): object,array,string,number,boolean,null
  -o, --output <file>       Output file path
```

### 💡 Design Philosophy & Roadmap

**Design Principles:**
1. **Terminal-first**: Everything should work beautifully in a terminal
2. **Zero configuration**: Sensible defaults that work out of the box
3. **Composable**: Commands can be chained with Unix pipes
4. **Type-safe**: Full TypeScript coverage for reliability

**Future Roadmap:**
- [ ] JSON Schema validation support
- [ ] CSV/JSON bidirectional conversion
- [ ] Query language (JMESPath-like)
- [ ] Watch mode for file changes
- [ ] Plugin system for custom formatters
- [ ] Web-based visualization export

### 📦 Build & Deploy

```bash
# Build for production
npm run build

# Run linter
npm run lint

# Run tests with coverage
npm test -- --coverage

# Pack for distribution
npm pack
```

### 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feat/amazing-feature`
5. Open a Pull Request

**Commit Convention:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation update
- `refactor:` Code refactoring
- `test:` Test updates
- `chore:` Build/tooling changes

### 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<a name="simplified-chinese"></a>
## 🇨🇳 简体中文

### 🎉 项目介绍

**JSONLens-TS** 是一款基于 TypeScript 构建的现代化 CLI 工具，专为日常需要处理 JSON 数据的开发者设计。受 JSON Crack 等热门 JSON 可视化工具的启发，JSONLens-TS 将 JSON 分析能力直接带到您的终端 —— 无需浏览器。

无论您是在调试 API 响应、分析配置文件、比较数据版本，还是转换嵌套结构，JSONLens-TS 都提供了一套完整的功能，让您的工作流更快更高效。

**核心差异化亮点：**
- 🚀 **终端原生**：完全在终端运行，无需浏览器或 GUI
- 🎨 **精美输出**：彩色树状视图，搭配直观图标
- 🔧 **TypeScript 优先**：全类型化、可扩展的架构
- 📦 **零配置**：安装即用
- 🧪 **充分测试**：全面的单元测试覆盖

### ✨ 核心特性

| 特性 | 命令 | 说明 |
|---------|---------|---------|
| 🌲 **树状视图** | `jsonlens tree` | 以交互式树状结构展示 JSON，支持彩色输出 |
| 📊 **统计分析** | `jsonlens stats` | 显示详细统计，包括键数量、深度、类型分布 |
| 📋 **扁平化** | `jsonlens flatten` | 将嵌套 JSON 转换为点号表示法的键值对 |
| 🔀 **差异对比** | `jsonlens diff` | 比较两个 JSON 文件并高亮差异 |
| 🔍 **数据过滤** | `jsonlens filter` | 按键名、值或数据类型过滤 JSON |
| ✅ **语法验证** | `jsonlens validate` | 验证 JSON 语法并显示详细错误信息 |
| 🎮 **交互模式** | `jsonlens interactive` | 从标准输入读取 JSON 进行快速分析 |

### 🚀 快速开始

#### 环境要求
- **Node.js** >= 16.0.0
- **npm** >= 8.0.0

#### 安装

```bash
# 通过 npm 全局安装
npm install -g jsonlens-ts

# 或使用 npx 直接运行
npx jsonlens-ts --help
```

#### 本地开发

```bash
# 克隆仓库
git clone https://github.com/gitstq/jsonlens-ts.git
cd jsonlens-ts

# 安装依赖
npm install

# 构建项目
npm run build

# 运行测试
npm test

# 本地链接测试
npm link
```

#### 使用示例

```bash
# 以树状结构展示 JSON
jsonlens tree data.json

# 显示统计信息
jsonlens stats data.json

# 扁平化嵌套 JSON
jsonlens flatten data.json -o flat.txt

# 比较两个 JSON 文件
jsonlens diff old.json new.json

# 按键名过滤
jsonlens filter data.json --key "user"

# 按值过滤
jsonlens filter data.json --value "active"

# 按类型过滤
jsonlens filter data.json --type string,number

# 验证 JSON 语法
jsonlens validate data.json

# 交互模式（从标准输入读取）
echo '{"name":"test"}' | jsonlens interactive
```

### 📖 详细使用指南

#### Tree 命令选项

```bash
jsonlens tree <file> [options]

选项:
  -d, --max-depth <number>   最大显示深度 (默认: 10)
  -c, --no-color            禁用彩色输出
  --compact                 紧凑模式（截断长字符串）
  --no-array-index          隐藏数组索引
```

#### Stats 命令选项

```bash
jsonlens stats <file> [options]

选项:
  -c, --no-color            禁用彩色输出
```

输出内容包括：
- 总键数量
- 最大嵌套深度
- 总大小（字节）
- 对象和数组数量
- 类型分布及可视化条形图

#### Diff 命令

```bash
jsonlens diff <file1> <file2> [options]

选项:
  -c, --no-color            禁用彩色输出
```

显示内容：
- 新增的键（绿色）
- 删除的键（红色）
- 修改的值及新旧对比（黄色）

#### Filter 命令选项

```bash
jsonlens filter <file> [options]

选项:
  -k, --key <pattern>       按键名过滤（正则表达式）
  -v, --value <pattern>     按值过滤（正则表达式）
  -t, --type <types>        按类型过滤：object,array,string,number,boolean,null
  -o, --output <file>       输出文件路径
```

### 💡 设计思路与迭代规划

**设计原则：**
1. **终端优先**：所有功能都应在终端中完美运行
2. **零配置**：开箱即用的合理默认值
3. **可组合**：命令可通过 Unix 管道链式组合
4. **类型安全**：完整的 TypeScript 覆盖确保可靠性

**后续迭代计划：**
- [ ] JSON Schema 验证支持
- [ ] CSV/JSON 双向转换
- [ ] 查询语言（类 JMESPath）
- [ ] 文件变更监听模式
- [ ] 自定义格式化器插件系统
- [ ] 网页可视化导出

### 📦 打包与部署

```bash
# 生产构建
npm run build

# 运行代码检查
npm run lint

# 运行测试（含覆盖率）
npm test -- --coverage

# 打包分发
npm pack
```

### 🤝 贡献指南

欢迎贡献！请遵循以下规范：

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feat/amazing-feature`
3. 提交更改：`git commit -m 'feat: add amazing feature'`
4. 推送分支：`git push origin feat/amazing-feature`
5. 发起 Pull Request

**提交规范：**
- `feat:` 新功能
- `fix:` 修复问题
- `docs:` 文档更新
- `refactor:` 代码重构
- `test:` 测试更新
- `chore:` 构建/工具变更

### 📄 开源协议

本项目采用 [MIT 协议](LICENSE) 开源。

---

<a name="traditional-chinese"></a>
## 繁體中文

### 項目介紹

**JSONLens-TS** 是一款基於 TypeScript 構建的現代化 CLI 工具，專為日常需要處理 JSON 數據的開發者設計。受 JSON Crack 等熱門 JSON 可視化工具的啟發，JSONLens-TS 將 JSON 分析能力直接帶到您的終端機 —— 無需瀏覽器。

無論您是在調試 API 響應、分析配置文件、比較數據版本，還是轉換嵌套結構，JSONLens-TS 都提供了一套完整的功能，讓您的工作流更快更高效。

**核心差異化亮點：**
- **終端原生**：完全在終端機運行，無需瀏覽器或 GUI
- **精美輸出**：彩色樹狀視圖，搭配直觀圖標
- **TypeScript 優先**：全類型化、可擴展的架構
- **零配置**：安裝即用
- **充分測試**：全面的單元測試覆蓋

### 核心特性

| 特性 | 命令 | 說明 |
|---------|---------|---------|
| **樹狀視圖** | `jsonlens tree` | 以交互式樹狀結構展示 JSON，支持彩色輸出 |
| **統計分析** | `jsonlens stats` | 顯示詳細統計，包括鍵數量、深度、類型分佈 |
| **扁平化** | `jsonlens flatten` | 將嵌套 JSON 轉換為點號表示法的鍵值對 |
| **差異對比** | `jsonlens diff` | 比較兩個 JSON 文件並高亮差異 |
| **數據過濾** | `jsonlens filter` | 按鍵名、值或數據類型過濾 JSON |
| **語法驗證** | `jsonlens validate` | 驗證 JSON 語法並顯示詳細錯誤信息 |
| **交互模式** | `jsonlens interactive` | 從標準輸入讀取 JSON 進行快速分析 |

### 快速開始

#### 環境要求
- **Node.js** >= 16.0.0
- **npm** >= 8.0.0

#### 安裝

```bash
# 通過 npm 全局安裝
npm install -g jsonlens-ts

# 或使用 npx 直接運行
npx jsonlens-ts --help
```

#### 本地開發

```bash
# 克隆倉庫
git clone https://github.com/gitstq/jsonlens-ts.git
cd jsonlens-ts

# 安裝依賴
npm install

# 構建項目
npm run build

# 運行測試
npm test

# 本地鏈接測試
npm link
```

#### 使用示例

```bash
# 以樹狀結構展示 JSON
jsonlens tree data.json

# 顯示統計信息
jsonlens stats data.json

# 扁平化嵌套 JSON
jsonlens flatten data.json -o flat.txt

# 比較兩個 JSON 文件
jsonlens diff old.json new.json

# 按鍵名過濾
jsonlens filter data.json --key "user"

# 按值過濾
jsonlens filter data.json --value "active"

# 按類型過濾
jsonlens filter data.json --type string,number

# 驗證 JSON 語法
jsonlens validate data.json

# 交互模式（從標準輸入讀取）
echo '{"name":"test"}' | jsonlens interactive
```

### 詳細使用指南

#### Tree 命令選項

```bash
jsonlens tree <file> [options]

選項:
  -d, --max-depth <number>   最大顯示深度 (默認: 10)
  -c, --no-color            禁用彩色輸出
  --compact                 緊湊模式（截斷長字符串）
  --no-array-index          隱藏數組索引
```

#### Stats 命令選項

```bash
jsonlens stats <file> [options]

選項:
  -c, --no-color            禁用彩色輸出
```

輸出內容包括：
- 總鍵數量
- 最大嵌套深度
- 總大小（字節）
- 對象和數組數量
- 類型分佈及可視化條形圖

#### Diff 命令

```bash
jsonlens diff <file1> <file2> [options]

選項:
  -c, --no-color            禁用彩色輸出
```

顯示內容：
- 新增的鍵（綠色）
- 刪除的鍵（紅色）
- 修改的值及新舊對比（黃色）

#### Filter 命令選項

```bash
jsonlens filter <file> [options]

選項:
  -k, --key <pattern>       按鍵名過濾（正則表達式）
  -v, --value <pattern>     按值過濾（正則表達式）
  -t, --type <types>        按類型過濾：object,array,string,number,boolean,null
  -o, --output <file>       輸出文件路徑
```

### 設計思路與迭代規劃

**設計原則：**
1. **終端優先**：所有功能都應在終端機中完美運行
2. **零配置**：開箱即用的合理默認值
3. **可組合**：命令可通過 Unix 管道鏈式組合
4. **類型安全**：完整的 TypeScript 覆蓋確保可靠性

**後續迭代計劃：**
- [ ] JSON Schema 驗證支持
- [ ] CSV/JSON 雙向轉換
- [ ] 查詢語言（類 JMESPath）
- [ ] 文件變更監聽模式
- [ ] 自定義格式化器插件系統
- [ ] 網頁可視化導出

### 打包與部署

```bash
# 生產構建
npm run build

# 運行代碼檢查
npm run lint

# 運行測試（含覆蓋率）
npm test -- --coverage

# 打包分發
npm pack
```

### 貢獻指南

歡迎貢獻！請遵循以下規範：

1. Fork 本倉庫
2. 創建特性分支：`git checkout -b feat/amazing-feature`
3. 提交更改：`git commit -m 'feat: add amazing feature'`
4. 推送分支：`git push origin feat/amazing-feature`
5. 發起 Pull Request

**提交規範：**
- `feat:` 新功能
- `fix:` 修復問題
- `docs:` 文檔更新
- `refactor:` 代碼重構
- `test:` 測試更新
- `chore:` 構建/工具變更

### 開源協議

本項目採用 [MIT 協議](LICENSE) 開源。

---

<p align="center">
  <b>Made with ❤️ by GLM-5.1</b>
</p>