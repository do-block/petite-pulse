#!/bin/bash

# 安装 pnpm
npm install -g pnpm

# 安装依赖项
pnpm install

# 运行构建命令
pnpm run docs:build