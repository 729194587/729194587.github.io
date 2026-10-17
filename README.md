# 个人主页

我的个人主页，采用类似 macOS Terminal 的交互风格，用来展示个人简介、项目、技能和联系方式。

**在线访问：** https://729194587.github.io/

## 本地运行

需要 Node.js 22.12+。

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

构建和本地预览：

```sh
npm run build
npm run preview -- --host 127.0.0.1
```

推送到 `main` 后，GitHub Actions 会自动构建并部署到 GitHub Pages。
