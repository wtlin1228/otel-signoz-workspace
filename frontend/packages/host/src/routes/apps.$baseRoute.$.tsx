import { createFileRoute } from '@tanstack/react-router';

// the routes under /apps/$baseRoute/ is handled by app's router
export const Route = createFileRoute('/apps/$baseRoute/$')({});
