# 使用 Node.js 作为构建环境
FROM node:18-alpine AS build

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 使用 Nginx 作为生产环境
FROM nginx:stable-alpine

# 复制构建产物到 Nginx 目录
COPY --from=build /app/build /usr/share/nginx/html

# 复制 Nginx 配置文件
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"] 