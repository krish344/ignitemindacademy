import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { site } from "@/lib/site";
import { InstagramIconFilled } from "@/components/ui/InstagramIcon";

const nav = [
  { href: "/naplan", label: "NAPLAN" },
  { href: "/test", label: "Practice Test" },
  { href: "/kit", label: "📥 Free Kit", isPromo: true },
  { href: "/pricing", label: "Pricing" },
  { href: "/resources", label: "Resources" },
  { href: "/quiz", label: "Maths Quiz" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10">
              <Image
                src="/logo.png"
                alt={site.name}
                fill
                className="object-contain"
              />
            </div>
            <span className="hidden sm:block text-xl font-bold text-gray-900">{site.name}</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium ${
                  item.isPromo
                    ? "text-orange-600 hover:text-orange-700 bg-orange-50 px-3 py-1 rounded-full"
                    : "text-slate-700 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white shadow-sm hover:shadow-md transition-shadow"
              aria-label="Follow us on Instagram"
            >
              <InstagramIconFilled className="w-5 h-5" />
            </a>
            <Button href="#contact" variant="secondary" className="hidden sm:inline-flex">
              {site.primaryCtas.diagnostic}
            </Button>
            <Button href={`tel:${site.phoneE164}`} variant="primary">
              {site.primaryCtas.call}
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
