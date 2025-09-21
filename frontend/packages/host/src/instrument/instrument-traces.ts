import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { UserInteractionInstrumentation } from '@opentelemetry/instrumentation-user-interaction';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';

import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';

const exporter = new OTLPTraceExporter({
  url: 'http://localhost:4318/v1/traces',
});

const webTracerProvider = new WebTracerProvider({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: 'frontend',
    [ATTR_SERVICE_VERSION]: '0.0.1',
  }),
  spanProcessors: [new BatchSpanProcessor(exporter)],
});

webTracerProvider.register();

registerInstrumentations({
  instrumentations: [
    new FetchInstrumentation({
      // Selects which backend servers are allowed to receive trace headers for linking traces across services.
      // Using /.*/ acts as a wildcard. For safer usage in production, replace with specific domains:
      // e.g. propagateTraceHeaderCorsUrls: [/api\.example\.com/, /my-backend\.internal/]
      propagateTraceHeaderCorsUrls: /.*/,
    }),
    new UserInteractionInstrumentation({
      eventNames: ['click', 'input', 'submit'],
    }),
    new XMLHttpRequestInstrumentation({
      propagateTraceHeaderCorsUrls: /.*/,
    }),
  ],
});
