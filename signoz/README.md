# signoz

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
