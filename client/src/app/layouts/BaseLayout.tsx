import { Layout } from '@/shared/ui';
import { LayoutHeader } from '@/widgets/header-layout';

/**
 * ✅ FSD Best practice
 *
 * (1) Devide layout in two modules: dumb layout grid (shared)
 * and smart layout with widgets (this file)
 *
 * (2) Avoid cross-import using slot (render prop) pattern
 * Pass widgets as props to layout
 */
export const BaseLayout = <Layout headerSlot={<LayoutHeader />} />;
