# Copy Line Link

[![VS Code](https://img.shields.io/badge/VS%20Code-1.85%2B-blue?logo=visualstudiocode)](https://code.visualstudio.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

> 右键一键复制 `vscode://file` 协议链接，快速跳转到文件指定行 / 行列。

## ✨ 功能

在编辑器中右键，提供两个菜单项：

| 菜单 | 复制内容示例 |
|------|-------------|
| **复制行链接** | `vscode://file/E%3A/project/src/utils/auth.js:7` |
| **复制行列链接** | `vscode://file/E%3A/project/src/utils/auth.js:7:1` |

粘贴链接到浏览器地址栏或聊天工具中，点击即可在 VS Code 中打开对应文件并定位到指定行列。

## 📥 安装

### 方式一：VSIX 安装

从 [Releases](https://github.com/UCPr251/copy-line-link/releases) 下载 `.vsix` 文件，然后在 VS Code 中：

1. `Ctrl+Shift+P` → **Extensions: Install from VSIX...**
2. 选择下载的 `.vsix` 文件

### 方式二：源码构建

```bash
git clone https://github.com/UCPr251/copy-line-link.git
cd copy-line-link
pnpm install
pnpm build
```

生成的 `copy-line-link-*.vsix` 按方式一安装即可。

## 🚀 开发

```bash
# 安装依赖
pnpm install
# 编译
pnpm compile
# 类型检查
pnpm check
# 构建 VSIX
pnpm build
```

按 `F5` 启动扩展开发宿主进行调试。

## 📄 License

MIT
