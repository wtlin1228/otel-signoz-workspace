import {
  LoggerProvider,
  SimpleLogRecordProcessor,
} from '@opentelemetry/sdk-logs';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { logs } from '@opentelemetry/api-logs';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { CustomAttributesProcessor } from './CustomAttributesProcessor';

import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';

const loggerProvider = new LoggerProvider({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: 'frontend',
    [ATTR_SERVICE_VERSION]: '0.0.1',
  }),
  processors: [
    new CustomAttributesProcessor(),
    new SimpleLogRecordProcessor(
      new OTLPLogExporter({ url: 'http://localhost:4318/v1/logs' })
    ),
  ],
});

logs.setGlobalLoggerProvider(loggerProvider);
