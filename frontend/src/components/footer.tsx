
import { Logo } from "@/components/logo";
import { SocialLinks } from "@/components/social-links";

const sections = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Documentation", href: "#" },
      { name: "API", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy", href: "#" },
      { name: "Terms", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t bg-background py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-6 text-foreground hover:opacity-80 transition-opacity">
              <Logo />
            </a>
            <p className="max-w-xs text-muted-foreground mb-8 font-sans leading-relaxed">
              The ultimate full-stack boilerplate for modern web applications. Build faster, deploy smarter with a premium developer experience.
            </p>
            <SocialLinks />
          </div>
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold mb-4 uppercase text-xs tracking-wider text-muted-foreground font-sans">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors font-sans text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground font-sans">
          <p>© {new Date().getFullYear()} Shakil Ahmed Billal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
