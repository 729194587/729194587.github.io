# 钱星宇 · Personal Homepage

面向 GitHub Pages 的 Astro 静态个人主页。部署地址：<https://729194587.github.io/>。

## 本地开发

推荐 Node.js 24 LTS 和 npm（最低 Node.js 22.12）。在仓库根目录执行：

```sh
npm ci
npm run dev
```

开发地址以终端输出为准，默认 `http://localhost:4321`。

```sh
npm run build
npm run preview
```

构建产物为 `dist/`；preview 用于预览生产构建。将 `package-lock.json` 纳入版本控制，保证本地与 CI 安装一致。

## 目录结构与内容维护

```text
src/
  data/
    profile.ts             # 个人信息、导航、教育与技术方向
    projects.ts            # 带类型的项目数组
  components/
    ProjectCard.astro      # 项目呈现
  layouts/
    BaseLayout.astro       # HTML 外壳、SEO 与全局样式
  pages/
    index.astro            # 单页五个内容区块
  styles/
    global.css             # 桌面与移动端轻量样式
public/                    # favicon、robots.txt
.github/workflows/deploy.yml
astro.config.mjs
```

内容与视图分离，新增项目只需编辑 `src/data/projects.ts`。Technical Skills 当前仅展示已确认的关注方向，不表示语言、框架熟练程度或成果。硕士结束日期标为预计。

使用 Astro 静态输出和原生 CSS，无客户端 JavaScript、UI 框架、外部字体或运行时后端。五个区块保留在一个页面内，只抽取共享页面外壳和项目卡片，避免过度抽象。未来有实际内容时可添加 `src/pages/experience.astro`、`src/pages/notes/index.astro` 并复用布局；V1 不生成空白页面。

## GitHub Pages 部署

1. 将根目录中的源码（包括隐藏目录 `.github` 和锁文件）提交并推送到 `729194587/729194587.github.io` 仓库的 `main` 分支。
2. 在仓库 **Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions**。
3. 推送 `main` 后工作流自动执行 `npm ci`、构建、上传 `dist/` 并部署；也可以在 Actions 手动运行工作流。面向 `main` 的 PR 只检查构建，不部署。
4. 在 Actions 查看执行结果；成功后访问 <https://729194587.github.io/>。

这是用户主页仓库，`astro.config.mjs` 配置站点根域名，无需配置仓库名 `base`。无需另建 `gh-pages` 分支、提交 `dist/` 或配置部署密钥；工作流使用 GitHub 自动提供的令牌。如默认分支不是 `main`，请同步修改工作流触发器和部署条件。

当前工作目录如果尚未关联 Git 仓库，需先关联正确的远程仓库再提交；若远程已有历史，请先拉取并合并，不要强制覆盖远程内容。仅本地构建成功并不代表已部署。

参考：[Astro GitHub Pages 部署文档](https://docs.astro.build/en/guides/deploy/github/)。

## 验收与后续确认

- 使用语义化 header、nav、main、section、article、footer，提供跳转正文链接、可见键盘焦点、中文语言声明与标题层级。
- 配置 title、description、canonical、Open Graph、favicon 与 robots.txt。
- 导航使用原生锚点；外部链接在当前标签打开；联系方式仅包含邮箱与 GitHub。
- 以 320px、390px 和桌面宽度检查换行、溢出与导航；使用 Tab 检查焦点和链接。
- 后续可根据实际预览确认视觉与文案；具体技术栈需本人补充后再添加。
