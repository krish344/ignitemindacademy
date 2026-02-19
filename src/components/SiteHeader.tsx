import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { site } from "@/lib/site";
import { InstagramIconFilled } from "@/components/ui/InstagramIcon";

const nav = [
  { href: "/naplan", label: "NAPLAN" },
  { href: "/test", label: "Practice Tests" },
  { href: "/pricing", label: "Pricing" },
  { href: "/resources", label: "Resources" },
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

          <nav className="hidden items-center gap-1 lg:gap-4 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-700 hover:text-orange-600 px-2 lg:px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors"
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
            <Button href="/book" variant="primary" className="hidden sm:inline-flex text-sm">
              Book Free Diagnostic
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
