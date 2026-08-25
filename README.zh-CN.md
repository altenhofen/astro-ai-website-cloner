<div align="center">

# AI Website Cloner Template 中文版

### 一条命令，克隆任意网站

只需给你的 AI 编程代理一个 URL，它就会将该网站重新构建成一个简洁的 Astro 网站。

基于 [JCodesMore 的 AI Website Cloner](https://github.com/JCodesMore/ai-website-cloner-template)。

</div>

## 前置要求

- Git
- [Node.js](https://nodejs.org/) 24 或更高版本
- Node.js 自带的 npm
- 遵循 `AGENTS.md` 的编辑器或 AI 编程代理

## 如何开始

1. 使用此模板创建自己的仓库，或 fork 此仓库。
2. 克隆你的仓库并进入项目目录：

   ```bash
   git clone https://github.com/<owner>/<repository>.git
   cd <repository>
   ```

   如果项目已经在本地打开，可以跳过这一步。

3. 安装锁定版本的依赖：

   ```bash
   npm ci
   ```

4. 在编辑器中打开项目。使用 VS Code 时运行：

   ```bash
   code .
   ```

5. 阅读 `AGENTS.md`。它是仓库唯一的指令文件。
6. 开始克隆前阅读 `docs/research/CLONE_WORKFLOW.md`。

## 在本地运行网站

启动 Astro 开发服务器：

```bash
npm run dev
```

打开 Astro 输出的 URL，通常是 [http://localhost:4321](http://localhost:4321)。修改 `src/`、`public/` 或项目配置后，开发服务器会自动刷新。使用 `Ctrl+C` 停止服务器。

常用命令：

```bash
npm run dev        # 启动开发服务器
npm run build      # 将静态网站构建到 dist/
npm run preview    # 在本地预览最近一次 dist/ 构建
npm run lint       # 检查 Astro 和 Vanilla JavaScript 文件
npm run typecheck  # 运行 astro check
npm run check      # 运行 lint、typecheck 和 build
```

代码或文档发生改动后运行 `npm run check`。`npm run preview` 预览的是最近一次完成的构建；需要查看新改动时，先运行 `npm run build`。

### 可选 Docker 流程

```bash
docker compose up dev --build   # 在端口 3001 启动开发服务器
docker compose up app --build   # 在端口 3000 启动生产预览
```

使用 `docker compose down` 停止容器。

## 克隆目标网站

1. 如果需要边做边查看结果，先启动开发服务器。
2. 阅读 `AGENTS.md` 和 `docs/research/CLONE_WORKFLOW.md`。
3. 向 AI 编程代理提供一个或多个目标 URL。
4. 在桌面、平板和移动端宽度检查原始网站。
5. 将提取的研究资料保存到 `docs/research/`，将截图保存到 `docs/design-references/`。
6. 将克隆路由保存到 `src/pages/`，可复用 Astro 组件保存到 `src/components/`，下载的资源保存到 `public/`。
7. 使用语义化 HTML、Tailwind CSS 和浏览器原生 Vanilla JavaScript。不要为了小交互添加框架岛。
8. 运行 `npm run check`，然后用 `npm run preview` 对构建后的网站进行最终冒烟测试。


## 项目标准

`AGENTS.md` 是仓库唯一的指令文件。保持工作流与编辑器无关，并遵循 `docs/research/` 下的研究文档。

**请不要提交关于 AI 代理行为的 Issue。此仓库是供你自行使用的模板，AI 代理的表现可能因目标网站和代理而异。**
