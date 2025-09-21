# micro-frontend workspace

## Default Port

| Package       | Port |
| ------------- | ---- |
| host          | 3000 |
| app-qiankun-1 | 3001 |
| app-qiankun-2 | 3002 |
| app-mf-1      | 4001 |
| app-mf-2      | 4002 |

## Quick Start

1. install
   - `pnpm i`
1. build
   - `pnpm build:libs`
   - `pnpm build:apps`
   - `pnpm build:host`
1. preview
   - `pnpm preview:apps`
   - `pnpm preview:host`

## OTEL collector config

### Enable CORS

Before run `docker compose up -d`, update the config first:

`docker/otel-collector-config.yaml`

```diff
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
+       cors:
+         allowed_origins:
+           - http://localhost:3000
+         allowed_headers:
+           - "*"
```
