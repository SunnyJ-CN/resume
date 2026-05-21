# 姬向阳的网页简历

这个仓库用于部署 GitHub Pages 网页简历，技术栈为 Vite + React + TypeScript。

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## 内容维护

简历主体内容在 `src/data/resume.ts` 中维护。工作年限、当前公司年限通过起始日期自动计算，不需要每年手动修改。

如果仓库名不是 `resume`，需要同步修改 `vite.config.ts` 中的 `base`。
