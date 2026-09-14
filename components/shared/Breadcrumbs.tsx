import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbJsonLd } from '@/lib/seo/structured-data';

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd(items)} />
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[13px] text-ink-soft">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <span key={item.href} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight size={12} className="text-sand" />}
              {isLast ? (
                <span className="font-medium text-ink" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-pine">
                  {item.label}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}