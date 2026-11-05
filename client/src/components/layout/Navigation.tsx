import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { decorations, navigation, profile } from "@/data/portfolio.mock";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const ids = navigation.map((n) => n.href.slice(1));
    const onScroll = () => {
      const probe = window.scrollY + 120;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= probe) current = id;
      }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = ids[ids.length - 1];
      setActive("#" + current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className="rt-nav">
      <nav className="rt-wrap rt-nav-inner" aria-label="Primary">
        <ul className="rt-nav-links">
          {navigation.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="rt-nav-link" aria-current={active === item.href} onClick={(e) => go(e, item.href)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <span className="rt-since">
          <img src={decorations.gamepad} alt="" width={24} height={17} aria-hidden="true" />
          {profile.sinceLabel}
        </span>

        <button type="button" className="rt-menu-btn" aria-expanded={open} aria-controls="rt-mobile-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((v) => !v)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div id="rt-mobile-nav" className="rt-mobile-panel">
          <ul>
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="rt-nav-link" aria-current={active === item.href} onClick={(e) => go(e, item.href)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
